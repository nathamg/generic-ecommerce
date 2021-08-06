import Item from '../models/items';
import Discount from '../models/discounts';

export default class DiscountController {
  async getDiscountByProduct(
    product: Item,
    productsQuantity: number
  ): Promise<number> {
    let discountValue = 0;
    const [discount] = await Discount.relatedQuery('product').where(
      'productId',
      product.id
    );

    if (discount && (discount as Discount).minProducts <= productsQuantity) {
      discountValue = this.calculateDiscount(
        discount as Discount,
        product.price,
        productsQuantity
      );
    }
    return discountValue;
  }

  private calculateDiscount(
    discount: Discount,
    productPrice: number,
    productsQuantity: number
  ): number {
    let totalDiscount: number;
    const individualDiscount = productPrice * discount.value;
    switch (discount.type) {
      case 'FROM_MIN_QUANTITY':
        totalDiscount = individualDiscount * productsQuantity;
        break;
      case 'ONLY_MIN_QUANTITY':
        totalDiscount =
          individualDiscount *
          (productsQuantity - (productsQuantity % discount.minProducts));
        break;
      default:
        totalDiscount = 0;
    }

    return totalDiscount;
  }
}
