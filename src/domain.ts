export type AccessMethod = 'RFID' | 'MOBILE_APP' | 'AUTO';
export interface AccessCredential {
  id?: string;
  alias?: string;
  status?: string;
}
export interface ChargingSession {
  id: string;
  stationName?: string;
  startedAt: string;
  endedAt?: string;
  accessMethod: AccessMethod;
  credential?: AccessCredential;
}
// Unknown status is deliberately not interpreted as active.
export function credentialLabel(session: ChargingSession): string | null {
  if (session.accessMethod !== 'RFID') return null;
  const credential = session.credential;
  if (!credential) return 'Unavailable';
  const id = credential.id?.trim();
  const alias = credential.alias?.trim();
  // An alias equal to the identifier must not bypass masking.
  const label =
    alias && (!id || !alias.includes(id))
      ? alias
      : id
        ? id.length > 4
          ? `****${id.slice(-4)}`
          : '****'
        : 'Unavailable';
  if (credential.status === 'REVOKED') return `${label} (revoked)`;
  if (credential.status !== 'ACTIVE') return `${label} (status unknown)`;
  return label;
}
