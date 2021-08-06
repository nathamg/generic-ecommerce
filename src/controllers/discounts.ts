import Item from '../models/items';
import Discount from '../models/discounts';

export default class DiscountController {
  async getDiscountByProduct(
    item: Item,
    itemsQuantity: number
  ): Promise<number> {
    let discountValue = 0;
    const [discount] = await Item.relatedQuery('discounts').for(item.id);
    if (discount && (discount as Discount).minItems <= itemsQuantity) {
      discountValue = this.calculateDiscount(
        discount as Discount,
        item.price,
        itemsQuantity
      );
    }
    return discountValue;
  }

  private calculateDiscount(
    discount: Discount,
    itemPrice: number,
    itemsQuantity: number
  ): number {
    let totalDiscount: number;
    const individualDiscount = itemPrice * discount.value;
    switch (discount.type) {
      case 'FROM_MIN_QUANTITY':
        totalDiscount = individualDiscount * itemsQuantity;
        break;
      case 'ONLY_MIN_QUANTITY':
        totalDiscount =
          individualDiscount *
          (itemsQuantity - (itemsQuantity % discount.minItems));
        break;
      default:
        totalDiscount = 0;
    }

    return totalDiscount;
  }
}
