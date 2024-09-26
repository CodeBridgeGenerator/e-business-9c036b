const fs = require("fs");
const fileFolder = "./src/resources";
const camelCase = require("./utils/camelCase");
const codeGen = require("./utils/codegen");

// Your setup function
module.exports = async (app) => {
  await initializeSuperUser(app);
  await insertRefData(app);
  console.log("Setup completed.");
};

const initializeSuperUser = async (app) => {
  const userEmail = ["hadie1993@gmail.com"];
  const getUserEmail = await app.service("userInvites").find({
    query: {
      emailToInvite: { $in: userEmail },
    },
  });

  if (getUserEmail.data.length === 0) {
    await app.service("userInvites").create(
      userEmail.map((user) => {
        return {
          emailToInvite: user,
          status: false,
          sendMailCounter: 0,
          code: codeGen(),
        };
      }),
    );
    console.debug("users created ");
  }
};

const insertRefData = async (app) => {
  let files = fs.readdirSync(fileFolder);
  files = files.filter(
    (file) => !["config.json", "standard.json"].includes(file),
  );
  files = files.sort((a, b) => b.localeCompare(a));
  const promises = [];
  const services = [];

  files.forEach((file) => {
    const names = file.split(".");
    const service = camelCase(names[1]);
    const existing = app.service(service).find({});
    promises.push(existing);
    services.push(service);
  });

  const allData = await Promise.all(promises);
  services.forEach(async (service, i) => {
    await insertData(app, allData[i].data, files[i], service);
  });
};

const insertData = async (app, existing, file, service) => {
  const dataNew = require(`./resources/${file}`);
  const existingNames = existing.map((t) => t.name);
  const inserts = [];
  if (dataNew.length === 0) return;
  dataNew.forEach((n) => {
    if (!existingNames.includes(n.name)) {
      const temp = n;
      delete temp._id;
      delete temp.__v;
      delete temp.createdAt;
      delete temp.updatedAt;
      inserts.push(temp);
    }
  });
  if (inserts.length > 0) await app.service(service).create(inserts);
};
