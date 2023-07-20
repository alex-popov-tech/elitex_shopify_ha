import { Page } from '@playwright/test';

export const Password = ({ page }: { page: Page }) => ({
  navigate: () => page.goto('/password'),
  set: async (args: { password: string }) => {
    await page.locator('#password').first().fill(args.password);
  },
  sumbit: () => page.locator('button[type="submit"]').first().click(),
});
