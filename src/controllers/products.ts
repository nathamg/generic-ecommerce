import Product from '../models/products';
import { NOT_FOUND_ERROR } from '../utils/Errors';

export default class ProductController {
  async getProduct(id: number): Promise<Product> {
    const product = await Product.query().findById(id);
    if (!product) throw NOT_FOUND_ERROR;
    return product;
  }
}
