import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import fxHandler from './api/fx.js';
import quoteHandler from './api/quote.js';
import healthHandler from './api/health.js';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes registered FIRST
  app.get('/api/fx', fxHandler);
  app.get('/api/quote', quoteHandler);
  app.get('/api/health', healthHandler);

  // Vite middleware for development vs static build for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SimplyInvest server running on http://localhost:${PORT}`);
  });
}

startServer();
