import express from 'express';
import Knex from 'knex';
import knexConfig from './config/knexfile';
import { Model } from 'objection';

import itemRouter from './routes/items';
import basketRouter from './routes/basket';

const knex = Knex(knexConfig.development);
Model.knex(knex);

const app = express();
app.use(express.json());

app.use('/items', itemRouter);
app.use('/baskets', basketRouter);

export default app;
