

import handleError from './error.middleware.ts';

import express from 'express';

import path from 'node:path';
import  fs  from 'node:fs';

import pool from './database.ts';

import invoices from './invoice.route.ts';
import customers from './customer.route.ts' /////////////////////////////////////////////////////////////////

import dashboard from './dashboard.route.ts';
const app = express();

app.use(express.json());//pega requisiçao e transforma em json

const dist = path.join(import.meta.dirname, '..', 'web', 'dist');

app.use((request, _response, next) => {             //middleware
  console.log(`${request.method} ${request.url}`);
  next();
});
       //end point   ,         função
app.get('/api/health', async (_request, response) => {
  try {
    const connect = await pool.query('SELECT datname FROM pg_database WHERE oid = 5;');
  
    response.status(200).json({
      status: 'Server is running.',
      database: connect.rows[0].datname
    });
  } catch (error) {
    console.error(error);

    response.status(500).json({
      status: 'Server is running.',
      database: 'unvaliable'
    });
  }
});

app.use('/api/invoices', invoices);
app.use('/api/customers', customers);
app.use('/api/dashboard', dashboard);

app.use(express.static(dist));

app.use((request, response, next) => {
  if(request.url.startsWith('/api') || !fs.existsSync(path.join(dist, 'index.html'))){
    next();
    return;
  }
  response.sendFile(path.join(dist, 'index.html'));
})

app.use((_request, response) => {           //middleware
  response.status(404).json({error:{ 
    status: 404,
    message: 'Recurso não encontrado.' }});
});

app.use(handleError);

app.listen(Number(process.env.PORT) || 3000);