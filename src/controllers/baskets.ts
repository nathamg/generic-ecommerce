/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import { BasketCheckout } from '../types/baskets';
import Basket from '../models/basket';
import DiscountController from './discounts';

export default class BasketController {
  async createBasket(): Promise<Basket> {
    const basket = {
      totalPrice: 0,
      creationDate: new Date(),
    };
    return await Basket.query().insert(basket);
  }

  async deleteBasket(id: string): Promise<void> {
    await Basket.query().deleteById(id);
  }

  async addProductToBasket(
    basketId: string,
    itemId: string,
    itemsQuantity: number
  ): Promise<void> {
    const basket = await Basket.query().findById(basketId);
    await basket.$relatedQuery('items').relate({
      id: itemId,
      itemsQuantity,
    });
  }

  async checkoutBasket(basketId: string): Promise<BasketCheckout> {
    const discountController = new DiscountController();
    const basket = await Basket.query().findById(basketId);
    const items = await basket.$relatedQuery('items');

    let basketTotalPrice = 0;
    let basketTotalDiscounts = 0;

    items.forEach(async (item) => {
      const { itemsQuantity, ...itemAtts } = item;
      const discountValue = await discountController.getDiscountByProduct(
        itemAtts,
        itemsQuantity
      );
      basketTotalPrice += itemAtts.price * itemsQuantity - discountValue;
      basketTotalDiscounts += discountValue;
    });

    await basket.$query().patch({ totalPrice: basketTotalPrice });

    return {
      discounts: basketTotalDiscounts,
      totalPrice: basketTotalPrice,
    };
  }
}
