import { test as base, expect } from '@playwright/test';
import { SessionPage } from '../pages/session-page';
export const test = base.extend<{ sessionPage: SessionPage }>({
  sessionPage: async ({ page }, use) => {
    await use(new SessionPage(page));
  },
});
export { expect };
