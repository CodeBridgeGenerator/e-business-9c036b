const { Queue, Worker } = require('bullmq');
const connection = require('../services/redis/config');
const jobQueue = new Queue('createUserProfile', { connection });

// Create and export the worker
const createUserProfile = (app) => {
  const superAdmin = 'kana.sabaratnam@gmail.com';
  const worker = new Worker(
    'createUserProfile',
    async (job) => {
      const { data } = job;
      const _profile = {
        name: data.name,
        userId: data._id,
      };
      let userData = await app.service('userLogin').find({
        query: {
          loginEmail: data.email,
        },
      });

      if (userData.data.length === 0) {
        userData = await app.service('userInvites').find({
          query: {
            emailToInvite: data.email,
          },
        });
        if (userData.data.length === 0) {
          // no user found is improbable
        } else {
          // superAdmin
          if (superAdmin === data.email) {
            _profile['role'] = '66b9c8b1dc0d1ef9ac30a8a7';
            _profile['position'] = '66e678d947480b243fc573fd';
          } else if (userData.data[0].position) {
            // custom role and position
            _profile['role'] = userData.data[0].role;
            _profile['position'] = userData.data[0].position;
          } else {
            // admin
            _profile['role'] = '66b9c8b1dc0d1ef9ac30a89e';
            _profile['position'] = '66e678d947480b243fc573fc';
          }
        }
      } else {
        //external external
        _profile['role'] = '66b9c8b1dc0d1ef9ac30a8a1';
        _profile['position'] = '66e678d947480b243fc573fb';
      }

      await app.service('profiles').create(_profile);
    },
    { connection },
  );

  // Event listeners for worker
  worker.on('completed', (job) => {
    console.log(`Job createUserProfile ${job.id} completed successfully`);
    if (job.data) {
      const _mail = {
        name: 'on_new_user_welcome_email',
        type: 'firstimelogin',
        from: 'info@cloudbasha.com',
        recipients: [job.data.email],
        data: { id: job.id },
        status: true,
        subject: 'login processing success',
        templateId: 'onWelcomeEmail',
      };
      app.service('mailQues').create(_mail);
    } else {
      console.log(`Job error and ${job.data} data not found`);
    }
  });

  worker.on('failed', async (job, err) => {
    console.error(
      `Job createUserProfile ${job.id} failed with error ${err.message}`,
    );
    if (job.data) {
      const _mail = {
        name: 'on_send_welcome_email',
        type: 'userInvitationOnCreateOnLoginQues',
        from: 'info@cloudbasha.com',
        recipients: ['support@cloudbasha.com'],
        status: false,
        subject: 'login processing failed',
        templateId: 'onError',
      };
      app.service('mailQues').create(_mail);
    } else {
      console.log(`Job error and ${job.data} data not found`);
    }
  });

  const userService = app.service('users');
  userService.hooks({
    after: {
      create: async (context) => {
        const { result } = context;
        await jobQueue.add('createUserProfile', result);
        return context;
      },
    },
  });
};

module.exports = { createUserProfile };
