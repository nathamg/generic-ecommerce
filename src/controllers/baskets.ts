import Basket from '../models/basket';

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
}
