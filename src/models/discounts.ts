import { Model } from 'objection';
import BaseModel from './baseModel';
import Item from './items';

export default class Discount extends BaseModel {
  id!: number;
  minItems!: number;
  value!: number;
  type!: string;
  itemId?: Item;

  static tableName = 'discounts';

  static relationMappings = () => ({
    item: {
      relation: Model.BelongsToOneRelation,
      modelClass: Item,
      join: {
        from: 'discount.itemId',
        to: 'items.id',
      },
    },
  });
}
