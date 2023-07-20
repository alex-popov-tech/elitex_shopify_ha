import { Page } from '@playwright/test';
import { Summary } from './summary';

export const Information = ({ page }: { page: Page }) => ({
  summary: Summary({ page, container: page.locator('aside') }),

  continue: () => page.getByText('Continue to shipping').first().click(),

  set: async ({
    contact,
    shipping,
  }: {
    contact?: { email?: string };
    shipping?: { lastName?: string; address?: string; city?: string; state?: string; zipcode?: string };
  }) => {
    if (contact?.email) {
      await page.locator('#email').fill(contact.email);
    }
    if (shipping?.lastName) {
      await page.locator('[name="lastName"]').first().fill(shipping.lastName);
    }
    if (shipping?.state) {
      await page.locator('select[name="zone"]').first().selectOption(shipping.state);
    }
    if (shipping?.zipcode) {
      await page.locator('[name="postalCode"]').first().fill(shipping.zipcode);
    }
    if (shipping?.city) {
      await page.locator('[name="city"]').first().fill(shipping.city);
    }
    if (shipping?.address) {
      await page.locator('[name="address1"]').first().fill(shipping.address);
    }
  },
});
