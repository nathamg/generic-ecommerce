import { Model } from 'objection';
import BaseModel from './baseModel';
import Product from './products';

export default class Discount extends BaseModel {
  id!: number;
  minProducts!: number;
  value!: number;
  type!: string;

  productId?: Product;

  static tableName = 'discounts';

  static relationMappings = () => ({
    product: {
      relation: Model.BelongsToOneRelation,
      modelClass: Product,
      join: {
        from: 'discount.productId',
        to: 'product.id',
      },
    },
  });
}
