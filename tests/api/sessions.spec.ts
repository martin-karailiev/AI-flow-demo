import { test, expect } from '@playwright/test';
test('list exposes a stable, synthetic session contract @smoke @api', async ({
  request,
}) => {
  const response = await request.get('/api/sessions');
  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('application/json');
  expect(response.headers()['cache-control']).toBe('no-store');
  const { data } = await response.json();
  expect(data.length).toBeGreaterThanOrEqual(6);
  expect(new Set(data.map((s: { id: string }) => s.id)).size).toBe(data.length);
  for (const session of data) {
    expect(session).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        startedAt: expect.any(String),
        accessMethod: expect.stringMatching(/^(RFID|MOBILE_APP|AUTO)$/),
      }),
    );
    expect(Number.isNaN(Date.parse(session.startedAt))).toBe(false);
    const detail = await request.get(`/api/sessions/${session.id}`);
    expect(detail.status()).toBe(200);
    expect((await detail.json()).data).toEqual(session);
  }
});
test('RFID association preserves alias, identifier and revoked status @api', async ({
  request,
}) => {
  const expected = [
    [
      'session-101',
      { id: 'DEMO0001A123', alias: 'Office Card', status: 'ACTIVE' },
    ],
    ['session-102', { id: 'ABC123458F21', status: 'ACTIVE' }],
    [
      'session-103',
      { id: 'DEMO0002B456', alias: 'Visitor Card', status: 'REVOKED' },
    ],
  ] as const;
  for (const [id, credential] of expected) {
    const response = await request.get(`/api/sessions/${id}`);
    expect(response.status()).toBe(200);
    expect((await response.json()).data).toMatchObject({
      id,
      accessMethod: 'RFID',
      credential,
    });
  }
});
test('incomplete and non-RFID records are intentional API cases @api', async ({
  request,
}) => {
  for (const id of ['session-104', 'session-105', 'session-106']) {
    const response = await request.get(`/api/sessions/${id}`);
    expect(response.status()).toBe(200);
    const { data } = await response.json();
    expect(data).not.toHaveProperty('credential');
    if (id === 'session-106') expect(data).not.toHaveProperty('stationName');
  }
  const response = await request.get('/api/sessions/session-107');
  expect(response.status()).toBe(200);
  expect((await response.json()).data.credential.status).toBe('UNRECOGNIZED');
});
test('unknown session returns JSON 404 @api', async ({ request }) => {
  const response = await request.get('/api/sessions/session-does-not-exist');
  expect(response.status()).toBe(404);
  expect(await response.json()).toEqual({
    error: { code: 'SESSION_NOT_FOUND', message: 'Session not found' },
  });
});
