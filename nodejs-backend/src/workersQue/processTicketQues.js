const { Queue, Worker } = require('bullmq');
const connection = require('../services/redis/config');

// Create and export the job queue
const jobQueue = new Queue('ticketQues', { connection });

// Create and export the worker
const createErrorsJobWorker = (app) => {
  const worker = new Worker(
    'ticketQues',
    async (id, job) => {
      const { data } = job;
      // Add your job processing logic
      console.log(id, data);
    },
    { connection },
  );

  // Event listeners for worker
  worker.on('completed', (job) => {
    console.log(`Job ${job.id} completed successfully`);
    if (job.data) {
      try {
        app.service('ticketQues').patch(job.data._id, {
          end: new Date(),
          status: true,
          jobId: job.id,
        });
      } catch (error) {
        console.error(error);
        throw Error(error);
      }
    } else {
      console.log(`Job success but ${job.data} data not found`);
    }
  });

  worker.on('failed', async (job, err) => {
    console.error(`Job ${job.id} failed with error ${err.message}`);
    if (job.data) {
      await app.service('ticketQues').patch(job.data._id, {
        end: new Date(),
        jobId: job.id,
        error: err.message,
      });
      const _mail = {
        name: 'on_ticket_job_que_worker',
        type: 'tickets',
        from: 'info@cloudbasha.com',
        recipients: [job.data.email],
        data: {
          id: job.id,
          data: `<pre><code>${JSON.stringify(job.data, null, 4)}</code></pre>`,
        },
        status: false,
        subject: 'ticket processing failed',
        templateId: 'onError',
      };
      app.service('mailQues').create(_mail);
    } else {
      console.log(`Job error and ${job.data} data not found`);
    }
  });

  const ticketQueService = app.service('ticketQues');
  ticketQueService.hooks({
    after: {
      create: async (context) => {
        const { result } = context;
        await jobQueue.add('ticketQues', result);
        return context;
      },
    },
  });
};

module.exports = { createErrorsJobWorker };
