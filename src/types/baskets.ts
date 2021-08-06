import Item from '../models/items';

interface CheckoutItem {
  item: Item;
  quantity: number;
  discount: number;
}

export interface BasketCheckout {
  items?: CheckoutItem[];
  discounts: number;
  totalPrice: number;
}
