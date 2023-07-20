import { Page, expect } from '@playwright/test';

export const Product = ({ page }: { page: Page }) => ({
  navigate: (id: string) => page.goto(`products/${id}`),

  shouldBe: (title: string) => expect(page.locator('.product__title').first()).toHaveText(title),

  set: async (
    args: { quantity?: number } & {
      subscription?: { type: 'One time purchase' } | { type: 'Subscribe & Save'; frequency?: 'Monthly' | 'Weekly' };
    }
  ) => {
    if (args.quantity !== undefined) {
      await page.locator('[name="quantity"]').first().fill(`${args.quantity}`);
    }
    if (args.subscription) {
      await page.locator(`.smartrr-selling-plan-group-name:has-text("${args.subscription.type}")`).first().click();
      if (args.subscription.type === 'Subscribe & Save') {
        await page
          .locator('.smartrr-deliver-frequency')
          .first()
          .locator('xpath=./following-sibling::*')
          .selectOption(args.subscription.frequency);
      }
    }
  },

  addToCart: () => page.locator('[name="add"]').first().click(),
  buyNow: () => page.getByText('Buy it now').first().click(),
});
