import { Model } from 'objection';
import BaseModel from './baseModel';
import Product from './products';

export default class Basket extends BaseModel {
  id!: number;
  creationDate!: string;
  priceTotal!: number;

  products?: Product[];

  static tableName = 'baskets';

  static relationMappings = () => ({
    products: {
      relation: Model.ManyToManyRelation,
      modelClass: Product,
      join: {
        from: 'baskets.id',
        through: {
          from: 'baskets_products.basketId',
          to: 'baskets_products.productId',
          extra: ['productQuantity'],
        },
        to: 'products.id',
      },
    },
  });
}
