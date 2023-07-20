import { Page } from '@playwright/test';
import { Information } from './information';
import { Shipping } from './shipping';
import { Payment } from './payment';
import { ThankYou } from './thankyou';

export const Checkout = ({ page }: { page: Page }) => ({
  information: Information({ page }),
  shipping: Shipping({ page }),
  payment: Payment({ page }),
  thankyou: ThankYou({ page }),
});
