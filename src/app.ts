import express from 'express';
import itemRouter from './routes/items';
import Knex from 'knex';
import knexConfig from './config/knexfile';
import { Model } from 'objection';

// Initialize knex.
const knex = Knex(knexConfig.development);

// Bind all Models to a knex instance. If you only have one database in
// your server this is all you have to do. For multi database systems, see
// the Model.bindKnex() method.
Model.knex(knex);

const app = express();

app.use('/items', itemRouter);

export default app;
