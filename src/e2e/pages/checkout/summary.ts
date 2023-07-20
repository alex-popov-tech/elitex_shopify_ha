import { Locator, Page, expect } from '@playwright/test';

export const Summary = ({ container }: { container: Locator; page: Page }) => ({
  shouldHave: async (args: {
    products?: { title: string; quantity: number; subscription: 'Every month'; price: string }[];
    subtotal?: string;
    shipping?: string;
    total?: string;
    recurringSubtotal?: string;
  }) => {
    if (args.subtotal) {
      await expect(container.locator('[role="row"]:has-text("Subtotal")').first()).toContainText(args.subtotal);
    }
    if (args.shipping) {
      await expect(container.locator('[role="row"]:has-text("Shipping")').first()).toContainText(args.shipping);
    }
    if (args.total) {
      await expect(container.locator('[role="row"]:has-text("Total")').first()).toContainText(args.total);
    }
    if (args.recurringSubtotal) {
      await expect(container.locator('[role="row"]:has-text("Recurring subtotal")').first()).toContainText(
        args.recurringSubtotal
      );
    }
    if (args.products?.length) {
      const list = container.locator('[role="table"][aria-labelledby*="ResourceList"] > div');
      for (let i = 0; i < args.products.length; i += 1) {
        const product = args.products[i];
        const container = list.nth(i + 1); // first item is empty one for some reason
        await expect(container.locator('[role="cell"]').nth(0).first()).toContainText(`${product.quantity}`);
        await expect(container.locator('[role="cell"]').nth(1).first()).toContainText(product.title);
        await expect(container.locator('[role="cell"]').nth(1).first()).toContainText(product.subscription);
        await expect(container.locator('[role="cell"]').nth(3)).toContainText(product.price);
      }
    }
  },
});
