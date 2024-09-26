import { faker } from "@faker-js/faker";
export default (user, count, userGuideIDIds) => {
  let data = [];
  for (let i = 0; i < count; i++) {
    const fake = {
      userGuideID: userGuideIDIds[i % userGuideIDIds.length],
      Steps: faker.lorem.sentence(""),
      Description: faker.lorem.sentence(""),

      updatedBy: user._id,
      createdBy: user._id,
    };
    data = [...data, fake];
  }
  return data;
};
