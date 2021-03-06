import { Model } from 'objection';
import BaseModel from './baseModel';
import Item from './items';

export default class Basket extends BaseModel {
  id!: number;
  creationDate!: string;
  totalPrice!: number;

  static tableName = 'baskets';

  static relationMappings = () => ({
    items: {
      relation: Model.ManyToManyRelation,
      modelClass: Item,
      join: {
        from: 'baskets.id',
        through: {
          from: 'baskets_items.basketId',
          to: 'baskets_items.itemId',
          extra: ['itemsQuantity'],
        },
        to: 'items.id',
      },
    },
  });
}
