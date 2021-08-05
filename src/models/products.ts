import { Model } from 'objection';
import BaseModel from './baseModel';
import Discount from './discounts';

export default class Product extends BaseModel {
  id!: number;
  code!: string;
  name!: string;
  price!: number;

  discounts?: Discount[];

  static tableName = 'products';

  static jsonSchema = {
    type: 'object',
    required: ['code', 'name', 'price'],

    properties: {
      id: { type: 'integer' },
      code: { type: 'string', minLength: 1, maxLength: 255 },
      name: { type: 'string', minLength: 1, maxLength: 255 },
      price: { type: 'number', exclusiveMinimum: 1 },
    },
  };

  static relationMappings = () => ({
    discounts: {
      relation: Model.HasManyRelation,
      modelClass: Discount,
      join: {
        from: 'products.id',
        to: 'discounts.productId',
      },
    },
  });
}
