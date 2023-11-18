import { GetProductList } from '@/domain/models';
import { faker } from '@faker-js/faker';

export const mockProductList: GetProductList.Response = {
  products: Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    name: faker.commerce.productName(),
    brand: faker.company.name(),
    description: faker.lorem.sentence(),
    photo: faker.image.url(),
    price: faker.commerce.price(),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString()
  })),
  count: 20
};
