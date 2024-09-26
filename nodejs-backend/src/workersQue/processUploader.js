const { Queue, Worker } = require("bullmq");
const connection = require("../services/redis/config");
const config = require("../resources/config.json");
const _ = require("lodash");

// Create and export the job queue
const jobQueue = new Queue("uploaderQue", { connection });
const adminUser = process.env.MAIL_USERNAME;

// Create and export the worker
const createUploader = (app) => {
  const worker = new Worker(
    "uploaderQue",
    async (job) => {
      try {
        const { data } = job;
        const serviceName = data.serviceName;
        const service = _.find(config.services, { serviceName: serviceName });
        const fieldReferencePromises = service.schemaList
          .filter((field) => {
            // console.log("field",field.reference.refServiceName);
            return typeof field.reference.refServiceName !== "undefined";
          })
          .map((field) => {
            return {
              ref: field.reference.refServiceName,
            };
          })
          .map(async (promise) => await app.service(promise.ref).find({}));
        // console.log("fieldReferencePromises", fieldReferencePromises);
        const promises = await Promise.all(fieldReferencePromises);
        // console.log("promises", promises);
        const fieldReference = service.schemaList
          .filter(
            (field) => typeof field.reference.refServiceName !== "undefined",
          )
          .map((field, i) => {
            return {
              ref: field.reference.refServiceName,
              fieldName: field.fieldName,
              label: field.label,
              identifierFieldName:
                field.reference.identifierFieldName.join(","),
              data: promises[i].data,
            };
          });

        if (Array.isArray(data.results)) {
          data.results.forEach((create) => {
            // console.log(create);
            const newObj = {};
            create.forEach((row) => {
              // console.log("row", typeof row);
              Object.keys(row).forEach((key) => {
                const refData = _.find(fieldReference, { fieldName: key });
                // console.log("key", key);
                if (refData?.data.length > 0) {
                  const keyVal = {};
                  keyVal[refData.identifierFieldName] = row[key];
                  const value = _.find(refData.data, keyVal);
                  // console.log("value", value);
                  if (value) newObj[key] = value._id.toString();
                  else newObj[key] = row[key];
                } else newObj[key] = row[key];
              });
            });
            console.log("newCreate", newObj);
            // app.service(serviceName).create(create);
          });
        }
      } catch (error) {
        throw error;
      }
    },
    { connection },
  );

  // Event listeners for worker
  worker.on("completed", (job) => {
    console.log(`Loader ${job.id} completed successfully`);
    try {
      const _mail = {
        name: "data loader successful",
        type: "uploader",
        from: adminUser,
        recipients: [job.data.user.email],
        data: { name: job.data.user.name, serviceName: job.data.serviceName },
        status: true,
        subject: "uploader job processing",
        templateId: "onUploaderSuccess",
      };
      // app.service("mailQues").create(_mail);
    } catch (error) {
      console.error(error);
      throw Error(error);
    }
  });

  worker.on("failed", (job, err) => {
    console.error(`Job ${job.id} failed with error ${err.message}`);
    const _mail = {
      name: "data loader failed job",
      type: "uploader",
      from: adminUser,
      recipients: [job.data.user.email, adminUser],
      data: { name: job.data.user.name, serviceName: job.data.serviceName },
      status: false,
      subject: "uploader job processing",
      templateId: "onUploaderFailed",
    };
    // app.service("mailQues").create(_mail);
  });

  const uploaderQueService = app.service("uploader");
  uploaderQueService.hooks({
    after: {
      create: async (context) => {
        const { result } = context;
        await jobQueue.add("uploaderQue", result);
        return context;
      },
    },
  });
};

module.exports = { createUploader };
