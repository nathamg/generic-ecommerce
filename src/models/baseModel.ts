import { Model } from 'objection';
export default class BaseModel extends Model {
  static concurrency = 10;
}
