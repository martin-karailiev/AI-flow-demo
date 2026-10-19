import type { ChargingSession } from '../src/domain.js';
export const sessions: ChargingSession[] = [
  {
    id: 'session-101',
    stationName: 'Cedar Plaza',
    startedAt: '2026-01-12T09:00:00Z',
    endedAt: '2026-01-12T10:15:00Z',
    accessMethod: 'RFID',
    credential: { id: 'DEMO0001A123', alias: 'Office Card', status: 'ACTIVE' },
  },
  {
    id: 'session-102',
    stationName: 'Harbor Point',
    startedAt: '2026-01-12T10:00:00Z',
    accessMethod: 'RFID',
    credential: { id: 'ABC123458F21', status: 'ACTIVE' },
  },
  {
    id: 'session-103',
    stationName: 'Maple Square',
    startedAt: '2026-01-12T11:00:00Z',
    endedAt: '2026-01-12T12:00:00Z',
    accessMethod: 'RFID',
    credential: {
      id: 'DEMO0002B456',
      alias: 'Visitor Card',
      status: 'REVOKED',
    },
  },
  {
    id: 'session-104',
    stationName: 'Cedar Plaza',
    startedAt: '2026-01-12T12:00:00Z',
    accessMethod: 'MOBILE_APP',
  },
  {
    id: 'session-105',
    stationName: 'Harbor Point',
    startedAt: '2026-01-12T13:00:00Z',
    accessMethod: 'AUTO',
  },
  {
    id: 'session-106',
    startedAt: '2026-01-12T14:00:00Z',
    accessMethod: 'RFID',
  },
  {
    id: 'session-107',
    stationName: 'Maple Square',
    startedAt: '2026-01-12T15:00:00Z',
    accessMethod: 'RFID',
    credential: { id: 'DEMO0003C789', alias: '   ', status: 'UNRECOGNIZED' },
  },
  {
    id: 'session-108',
    stationName: 'Cedar Plaza',
    startedAt: '2026-01-12T16:00:00Z',
    accessMethod: 'RFID',
    credential: { id: 'DEMO0004D012', status: 'REVOKED' },
  },
];
