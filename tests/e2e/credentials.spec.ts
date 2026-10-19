import { test, expect } from '../fixtures/test';
for (const scenario of [
  { id: 'session-101', label: 'Office Card', raw: 'DEMO0001A123' },
  { id: 'session-102', label: '****8F21', raw: 'ABC123458F21' },
  { id: 'session-103', label: 'Visitor Card (revoked)', raw: 'DEMO0002B456' },
  { id: 'session-108', label: '****D012 (revoked)', raw: 'DEMO0004D012' },
]) {
  test(`${scenario.id} renders safe credential label @privacy @smoke`, async ({
    sessionPage,
  }) => {
    await sessionPage.open(scenario.id);
    await expect(sessionPage.credential).toHaveText(scenario.label);
    await sessionPage.expectNoIdentifier(scenario.raw);
  });
}
for (const id of ['session-104', 'session-105']) {
  test(`${id} omits credential field @privacy`, async ({
    sessionPage,
    page,
  }) => {
    await sessionPage.open(id);
    await expect(sessionPage.credential).toHaveCount(0);
    await expect(page.getByText('Credential', { exact: true })).toHaveCount(0);
  });
}
test('incomplete record shows safe fallback values @resilience', async ({
  sessionPage,
  page,
}) => {
  await sessionPage.open('session-106');
  await expect(
    page.getByText('Unknown station', { exact: true }),
  ).toBeVisible();
  await expect(sessionPage.credential).toHaveText('Unavailable');
});
test('blank alias and unknown status remain safe @resilience', async ({
  sessionPage,
}) => {
  await sessionPage.open('session-107');
  await expect(sessionPage.credential).toHaveText('****C789 (status unknown)');
  await sessionPage.expectNoIdentifier('DEMO0003C789');
});
