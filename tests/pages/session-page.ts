import { expect, type Page } from '@playwright/test';
export class SessionPage {
  constructor(readonly page: Page) {}
  get credential() {
    return this.page.getByTestId('credential');
  }
  async open(id: string) {
    await this.page.goto(`/?session=${encodeURIComponent(id)}`);
    await expect(
      this.page.getByRole('heading', { name: id, exact: true }),
    ).toBeVisible();
  }
  async expectNoIdentifier(id: string) {
    // HTML also covers hidden elements and attribute values, not only visible text.
    await expect
      .poll(() => this.page.locator('html').evaluate((el) => el.outerHTML))
      .not.toContain(id);
  }
}
