import { Page } from '@playwright/test';
import { Summary } from './summary';

export const Payment = ({ page }: { page: Page }) => ({
  summary: Summary({ page, container: page.locator('aside') }),

  payNow: () => page.getByText('Pay now').first().click(),

  checkTerms: () => page.locator('#vaulting_and_subscription_agreement').click(),

  set: async (args: {
    card: {
      number?: string;
      name?: string;
      expiry?: string;
      code?: string;
    };
  }) => {
    if (args.card.number) {
      await page.frameLocator('#number iframe').locator('#number').type(args.card.number, { delay: 100 });
    }
    if (args.card.name) {
      await page.frameLocator('#name iframe').locator('#name').type(args.card.name, { delay: 100 });
    }
    if (args.card.expiry) {
      await page.frameLocator('#expiry iframe').locator('#expiry').type(args.card.expiry, { delay: 100 });
    }
    if (args.card.code) {
      await page
        .frameLocator('#verification_value iframe')
        .locator('#verification_value')
        .type(args.card.code, { delay: 100 });
    }
  },
});
