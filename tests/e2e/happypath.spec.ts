import { faker } from '@faker-js/faker';
import { test } from './base';

test.describe.configure({ mode: 'parallel' });

test.beforeEach(async ({ app: { password, product } }) => {
  await password.navigate();
  await password.set({ password: 'qwerty' });
  await password.sumbit();
  await product.navigate('test-product-cherry');
});

test('Happy Path', async ({ app: { product, checkout } }) => {
  await product.set({ quantity: 2, subscription: { type: 'Subscribe & Save', frequency: 'Monthly' } });
  await product.buyNow();

  await checkout.information.set({
    contact: { email: faker.internet.email() },
    shipping: {
      lastName: faker.person.lastName(),
      address: '20 Cooper Square',
      city: 'New York',
      state: 'New York',
      zipcode: '10011',
    },
  });
  await checkout.information.continue();

  await checkout.shipping.summary.shouldHave({
    products: [{ title: 'test-product-cherry', quantity: 2, subscription: 'Every month', price: '4.14' }],
    shipping: '2.00',
    subtotal: '4.14',
    total: '4.14',
  });
  await checkout.shipping.continue();

  await checkout.payment.set({
    card: {
      number: '4242424242424242',
      name: 'test',
      expiry: '01/27',
      code: '666',
    },
  });
  await checkout.payment.checkTerms();
  await checkout.payment.payNow();

  await checkout.thankyou.shouldBeOpened();
});
