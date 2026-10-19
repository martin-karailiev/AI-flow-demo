import express from 'express';
import { createServer as createViteServer } from 'vite';
import { fileURLToPath } from 'node:url';
import { sessions } from './data.js';
const app = express();
app.disable('x-powered-by');
app.use('/api', (_req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});
app.get('/api/sessions', (_req, res) => res.json({ data: sessions }));
app.get('/api/sessions/:id', (req, res) => {
  const session = sessions.find(({ id }) => id === req.params.id);
  if (!session) {
    res.status(404).json({
      error: { code: 'SESSION_NOT_FOUND', message: 'Session not found' },
    });
    return;
  }
  res.json({ data: session });
});
app.use('/api', (_req, res) => {
  res
    .status(404)
    .json({ error: { code: 'NOT_FOUND', message: 'Endpoint not found' } });
});
if (process.argv.includes('--production')) {
  const dist = fileURLToPath(new URL('../dist/', import.meta.url));
  app.use(express.static(dist));
  app.get('/{*path}', (_req, res) => res.sendFile(`${dist}/index.html`));
} else {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
}
const server = app.listen(4173, '127.0.0.1', () =>
  console.log('ChargeLab: http://127.0.0.1:4173'),
);
for (const signal of ['SIGINT', 'SIGTERM'] as const)
  process.on(signal, () => server.close(() => process.exit(0)));
