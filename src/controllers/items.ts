import Item from '../models/items';
import { NOT_FOUND_ERROR } from '../utils/Errors';

export default class ItemController {
  async getItem(id: number): Promise<Item> {
    const product = await Item.query().findById(id);
    if (!product) throw NOT_FOUND_ERROR;
    return product;
  }
}
