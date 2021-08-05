import { Model } from 'objection';
import knex from 'knex';
import knexConfig from '../config/knexfile';

export default class BaseModel extends Model {
  static knex = knex(knexConfig.development);
  static concurrency = 10;
}
