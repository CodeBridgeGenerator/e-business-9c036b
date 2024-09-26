import { faker } from "@faker-js/faker";
export default (user, count) => {
  let data = [];
  for (let i = 0; i < count; i++) {
    const fake = {
      userEmail: faker.datatype.number(""),
      server: faker.datatype.number(""),
      environment: faker.datatype.number(""),
      code: faker.datatype.number(""),
      status: faker.datatype.number(""),
      sendEmailCounter: faker.datatype.number(""),

      updatedBy: user._id,
      createdBy: user._id,
    };
    data = [...data, fake];
  }
  return data;
};
