import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { credentialLabel, type ChargingSession } from './domain';
import './style.css';
function App() {
  const id = new URLSearchParams(window.location.search).get('session');
  const [sessions, setSessions] = useState<ChargingSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    const controller = new AbortController();
    fetch(id ? `/api/sessions/${encodeURIComponent(id)}` : '/api/sessions', {
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok)
          throw new Error(
            response.status === 404
              ? 'Session not found'
              : 'Unable to load sessions',
          );
        return response.json();
      })
      .then((body) => setSessions(id ? [body.data] : body.data))
      .catch((error) => {
        if (error.name !== 'AbortError') setError(error.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [id]);
  const session = sessions[0];
  const label = session ? credentialLabel(session) : null;
  return (
    <>
      <header>
        <a href="/" className="brand">
          <span className="mark">ϟ</span> ChargeLab
        </a>
        <span className="demo">QA ENGINEERING LAB</span>
      </header>
      <main>
        <div className="eyebrow">WORKSPACE / SESSION EXPLORER</div>
        <h1>{id ? 'Session details' : 'Charging sessions'}</h1>
        <p className="intro">
          A fictional charging network. A real commitment to quality.
        </p>
        {id && (
          <a className="back" href="/">
            ← Back to sessions
          </a>
        )}
        {loading ? (
          <p role="status">Loading sessions…</p>
        ) : error ? (
          <section role="alert">
            <h2>{error}</h2>
            <p>Please return to the session list or try again.</p>
          </section>
        ) : id && session ? (
          <section className="card">
            <div className="card-heading">
              <h2>{session.id}</h2>
              <span className="badge">
                {session.endedAt ? 'Completed' : 'In progress'}
              </span>
            </div>
            <dl>
              <dt>Station</dt>
              <dd>{session.stationName?.trim() || 'Unknown station'}</dd>
              <dt>Started at</dt>
              <dd>
                {new Date(session.startedAt).toLocaleString('en-GB', {
                  timeZone: 'UTC',
                })}{' '}
                UTC
              </dd>
              <dt>Access method</dt>
              <dd>{session.accessMethod}</dd>
              {session.endedAt && (
                <>
                  <dt>Ended at</dt>
                  <dd>
                    {new Date(session.endedAt).toLocaleString('en-GB', {
                      timeZone: 'UTC',
                    })}{' '}
                    UTC
                  </dd>
                </>
              )}
              {label !== null && (
                <>
                  <dt>Credential</dt>
                  <dd data-testid="credential">{label}</dd>
                </>
              )}
            </dl>
          </section>
        ) : (
          <section className="card table-wrap">
            <div className="card-heading">
              <h2>All sessions</h2>
              <span className="count">{sessions.length} sessions</span>
            </div>
            <table>
              <thead>
                <tr>
                  <th scope="col">Session</th>
                  <th scope="col">Station</th>
                  <th scope="col">Started (UTC)</th>
                  <th scope="col">Access method</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {sessions.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <a href={`/?session=${encodeURIComponent(item.id)}`}>
                        {item.id}
                      </a>
                    </td>
                    <td>{item.stationName?.trim() || 'Unknown station'}</td>
                    <td>
                      {new Date(item.startedAt).toLocaleString('en-GB', {
                        timeZone: 'UTC',
                      })}
                    </td>
                    <td>{item.accessMethod}</td>
                    <td>
                      <span className="badge">
                        {item.endedAt ? 'Completed' : 'In progress'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}
        <footer>
          <span className="dot" /> Synthetic data only{' '}
          <span>React · REST · Playwright</span>
        </footer>
      </main>
    </>
  );
}
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
