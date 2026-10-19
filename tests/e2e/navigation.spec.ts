import { test, expect } from '../fixtures/test';
test('list → details → list @smoke', async ({ page, sessionPage }) => {
  await page.goto('/');
  await expect(page.getByRole('table')).toBeVisible();
  await expect(page.getByRole('columnheader')).toHaveText([
    'Session',
    'Station',
    'Started (UTC)',
    'Access method',
    'Status',
  ]);
  await expect(
    page.getByRole('row').filter({ hasText: 'session-101' }),
  ).toContainText('Completed');
  await page.getByRole('link', { name: 'session-102', exact: true }).click();
  await expect(sessionPage.credential).toHaveText('****8F21');
  await page.getByRole('link', { name: 'Back to sessions' }).click();
  await expect(
    page.getByRole('heading', { name: 'Charging sessions', exact: true }),
  ).toBeVisible();
  await expect(page.getByRole('table')).toBeVisible();
});
test('unknown session renders a recoverable error @resilience', async ({
  page,
}) => {
  await page.goto('/?session=missing');
  await expect(page.getByRole('alert')).toContainText('Session not found');
  await page.getByRole('link', { name: 'Back to sessions' }).click();
  await expect(page.getByRole('table')).toBeVisible();
});
test('server failure renders an error without crashing @resilience', async ({
  page,
}) => {
  await page.route('**/api/sessions', (route) =>
    route.fulfill({ status: 503, contentType: 'application/json', body: '{}' }),
  );
  await page.goto('/');
  await expect(page.getByRole('alert')).toContainText(
    'Unable to load sessions',
  );
});
