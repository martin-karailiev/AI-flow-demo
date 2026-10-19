import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  credentialLabel,
  type AccessCredential,
  type ChargingSession,
} from '../../src/domain';
const session = (credential?: AccessCredential): ChargingSession => ({
  id: 'unit',
  startedAt: '2026-01-01T00:00:00Z',
  accessMethod: 'RFID',
  credential,
});
for (const [name, credential, expected] of [
  [
    'alias',
    { id: 'ABC123458F21', alias: 'Office Card', status: 'ACTIVE' },
    'Office Card',
  ],
  ['mask', { id: 'ABC123458F21', status: 'ACTIVE' }, '****8F21'],
  ['short identifier', { id: 'ABCD', status: 'ACTIVE' }, '****'],
  ['empty identifier', { id: '', alias: ' ', status: 'ACTIVE' }, 'Unavailable'],
  [
    'identifier as alias',
    { id: 'ABC123458F21', alias: 'Card ABC123458F21', status: 'ACTIVE' },
    '****8F21',
  ],
  ['missing credential', undefined, 'Unavailable'],
  [
    'unknown status',
    { id: 'ABC123458F21', status: 'NEW_STATUS' },
    '****8F21 (status unknown)',
  ],
  ['revoked', { id: 'ABC123458F21', status: 'REVOKED' }, '****8F21 (revoked)'],
] as const)
  test(name, () =>
    assert.equal(credentialLabel(session(credential)), expected),
  );
for (const accessMethod of ['AUTO', 'MOBILE_APP'] as const)
  test(`${accessMethod} ignores even attached credentials`, () =>
    assert.equal(
      credentialLabel({
        ...session({ id: 'ABC123458F21', status: 'ACTIVE' }),
        accessMethod,
      }),
      null,
    ));
