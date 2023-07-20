import { Page, expect } from '@playwright/test';
import { Summary } from './summary';

export const ThankYou = ({ page }: { page: Page }) => ({
  summary: Summary({ page, container: page.locator('aside') }),

  shouldBeOpened: () => expect(page).toHaveURL(/thank_you$/g),
});
