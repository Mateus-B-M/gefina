import {
    describe,
    it,
    expect
} from 'vitest';

import supertest from 'supertest';   //entra/requisita na api com o app

import app from './app.ts';

const request = supertest(app);

describe(
    'rotas de fatura',
    () => {
        it(
            'devolve a relação de faturas', 
            async () => {
                const response = await request.get('/api/invoices');
                
                expect(response.status).toBe(200);
                expect(Array.isArray(response.body)).toBe(true);
            }
        );
    }
);