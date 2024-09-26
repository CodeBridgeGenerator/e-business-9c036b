const { Queue, Worker } = require("bullmq");
const connection = require("../services/redis/config");

// Create and export the job queue
const jobQueue = new Queue("jobUserChangeForgotPassword", { connection });

// Create and export the worker
const createChangeForgotPasswordQueWorker = (app) => {
  let user;
  const worker = new Worker(
    "jobUserChangeForgotPassword",
    async (job) => {
      const { data } = job;

      if (data.userEmail) {
        const userData = await app
          .service("users")
          .find({ query: { email: data.userEmail } });
        user = userData.data[0];
        if (user && user.status === true) {
          await app
            .service("userChangePassword")
            .patch(data._id, { status: true });
        } else if (user && user.status === false) {
          throw Error(`User email ${data.userEmail} not registered.`);
        } else throw Error(`User email ${data.userEmail} not found.`);
      } else throw Error(`User email ${data.userEmail} empty.`);
    },
    { connection },
  );

  // Event listeners for worker
  worker.on("completed", async (job) => {
    console.log(`Job forgot password ${job.id} completed successfully`);
    if (job.data) {
      try {
        const clientUrl = `${job.data.server}reset/${job.data._id}`;
        const _mail = {
          name: "on_change_forgot_password",
          type: "jobUserChangeForgotPassword",
          from: "info@cloudbasha.com",
          recipients: [job.data.userEmail],
          data: {
            ...job.data,
            name: user.name,
            email: user.email,
            clientUrl,
          },
          status: true,
          subject: "change password processing",
          templateId: "onChangeForgotPassword",
        };
        await app.service("mailQues").create(_mail);
      } catch (error) {
        console.error(error);
        throw Error(error);
      }
    } else {
      console.log(`Job success but ${job.data} data not found`);
    }
  });

  worker.on("failed", async (job, err) => {
    console.error(`Job ${job.id} failed with error ${err.message}`);
    if (job.data) {
      const _mail = {
        name: "on_change_forgot_password_failed",
        type: "jobUserChangeForgotPassword",
        from: "info@cloudbasha.com",
        recipients: [job.data.userEmail, "info@cloudbasha.com"],
        data: { ...job.data },
        status: false,
        subject: "change password processing",
        templateId: "onChangeForgotPasswordFailed",
        errors: err.message,
      };
      await app.service("mailQues").create(_mail);
    } else {
      console.log(`Job error and ${job.data} data not found`);
    }
  });

  const userChangePasswordService = app.service("userChangePassword");
  userChangePasswordService.hooks({
    after: {
      create: async (context) => {
        const { result } = context;
        await jobQueue.add("jobUserChangeForgotPassword", result);
        return context;
      },
      patch: async (context) => {
        const { result } = context;
        if (!result.status && result.sendEmailCounter <= 3)
          await jobQueue.add("jobUserChangeForgotPassword", result);
        return context;
      },
    },
  });
};

module.exports = { createChangeForgotPasswordQueWorker };
