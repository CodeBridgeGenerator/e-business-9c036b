const { Queue, Worker } = require('bullmq');
const connection = require('../services/redis/config');
const sendMailService = require('../services/nodeMailer/sendMailService');

// Create and export the job queue
const mailQues = new Queue('mailQues', { connection });

const createMailQueWorker = (app) => {
  const superAdmin = 'kana.sabaratnam@gmail.com';
  const worker = new Worker(
    'mailQues',
    async (job) => {
      const { data } = job;
      // Add your job processing logic here
      const template = await app
        .service('templates')
        .find({ query: { name: data.templateId } });

      if (!template.data.length === 0)
        throw Error(`Template ${data.templateId} not found, please create.`);

      const templateContent = template.data[0];
      const subject = templateContent.subject;
      let body = templateContent.body;
      let contentHTML = body;
      if (data.data) {
        Object.entries(data.data).forEach((k) => {
          contentHTML = contentHTML.replace(`{{${k[0]}}}`, k[1]);
        });
      }
      app
        .service('mailQues')
        .patch(job.data._id, { jobId: job.id, content: contentHTML });
      try {
        await sendMailService(
          data.name,
          data.from,
          data.recipients,
          subject,
          body,
          contentHTML,
          [],
        );
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    { connection },
  );

  // Event listeners for worker
  worker.on('completed', (job) => {
    console.log(`Mail ${job.id} completed successfully`);
    if (job.data) {
      app
        .service('mailQues')
        .patch(job.data._id, { jobId: job.id, end: new Date(), status: true });
    }
  });

  worker.on('failed', async (job, err) => {
    console.error(`Mail ${job.id} failed with error ${err.message}`);
    if (job.data) {
      app.service('mailQues').patch(job.data._id, {
        jobId: job.id,
        end: new Date(),
        errors: err.message,
        status: false,
      });
      job.data['errors'] = err.message;
      job.data['project'] = process.env.PROJECT_NAME;
      job.data['env'] = process.env.ENV;

      await sendMailService(
        job.data.name,
        job.data.from,
        ['kana@cloudbasha.com', superAdmin],
        `Field to send email - ${err.message}`,
        err.message,
        `<pre><code>${JSON.stringify(job.data, null, 4)}</code></pre>`,
        [],
      );
    }
  });

  const mailQuesService = app.service('mailQues');
  mailQuesService.hooks({
    after: {
      create: async (context) => {
        const { result } = context;
        if (result.recipients.length > 0)
          await mailQues.add('mailQues', result);
        return context;
      },
    },
  });
};

module.exports = { createMailQueWorker };
