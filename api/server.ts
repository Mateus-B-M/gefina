import express from 'express';

import invoices from './invoice.route.ts';

import path from 'node:path';

const app = express();

const dist = path.join(import.meta.dirname, "..", "web", "dist");

app.use((request, _response, next) => {
  console.log(`${request.method} ${request.url}`);
  next();
});

app.get('/api/health', (_request, response) => {
  response.status(200).json({ status: 'ok' });
});

app.use('/api/invoices', invoices);

app.use(express.static(dist));

app.use((_request, response) => {
  response.status(404).json({ message: 'Recurso não encontrado.' });
});

app.listen(process.env.PORT || 3000);
