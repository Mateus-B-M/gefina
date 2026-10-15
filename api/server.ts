import express from 'express';

import invoices from './invoice.route.ts';

import path from 'node:path';

import pool from './database.ts';

const app = express();

const dist = path.join(import.meta.dirname, "..", "web", "dist");

app.use((request, _response, next) => {
  console.log(`${request.method} ${request.url}`);
  next();
});

app.get('/api/health', async (_request, response) => {
  const connect = await pool.query('SELECT datname FROM pg_database WHERE oid = 5;');

  response.status(200).json({ 
    status: 'Server is running.',
    database: connect.rows[0].datname
   });
});

app.use('/api/invoices', invoices);

app.use(express.static(dist));

app.use((_request, response) => {
  response.status(404).json({ message: 'Recurso não encontrado.' });
});

app.listen(process.env.PORT || 3000);
