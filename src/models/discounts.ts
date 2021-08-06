import { Model } from 'objection';
import BaseModel from './baseModel';
import Item from './items';

export default class Discount extends BaseModel {
  id!: number;
  minProducts!: number;
  value!: number;
  type!: string;

  itemId?: Item;

  static tableName = 'discounts';

  static relationMappings = () => ({
    product: {
      relation: Model.BelongsToOneRelation,
      modelClass: Item,
      join: {
        from: 'discount.productId',
        to: 'items.id',
      },
    },
  });
}
