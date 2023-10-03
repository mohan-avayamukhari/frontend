import { faker } from '@faker-js/faker';

export function createRandomUser() {
  return {
    id: faker.number.int(),
    name: faker.person.firstName(),
    age: faker.number.int(40),
    phone: faker.phone.number()
  };
}

const USERS = faker.helpers.multiple(createRandomUser, {
  count: 30,
});

export const data = (() => [...USERS])
