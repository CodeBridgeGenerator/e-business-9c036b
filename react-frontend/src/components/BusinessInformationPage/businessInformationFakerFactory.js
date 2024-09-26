
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
organizationName: faker.lorem.sentence(1),
numberOfEmployees: faker.lorem.sentence(1),
fullTimeTrainers: faker.lorem.sentence(1),
partTimeTrainers: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
