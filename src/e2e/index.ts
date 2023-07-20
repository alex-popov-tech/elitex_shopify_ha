import { BrowserContext, Page } from '@playwright/test';
import { Password } from './pages/password';
import { Product } from './pages/product';
import { Checkout } from './pages/checkout/index';

export const App = ({ page }: { context: BrowserContext; page: Page }) => ({
  password: Password({ page }),
  product: Product({ page }),
  checkout: Checkout({ page }),
});
