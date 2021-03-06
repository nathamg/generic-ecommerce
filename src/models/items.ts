import { Model } from 'objection';
import BaseModel from './baseModel';
import Basket from './basket';
import Discount from './discounts';

export default class Item extends BaseModel {
  id!: number;
  code!: string;
  name!: string;
  price!: number;

  static tableName = 'items';

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
        from: 'items.id',
        to: 'discounts.itemId',
      },
    },
    baskets: {
      relation: Model.ManyToManyRelation,
      modelClass: Basket,
      join: {
        from: 'items.id',
        through: {
          from: 'baskets_items.itemId',
          to: 'baskets_items.basketsId',
          extra: ['itemsQuantity'],
        },
        to: 'baskets.id',
      },
    },
  });
}
