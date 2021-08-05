import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import ProductController from '../controllers/products';

const router = Router();
const productController = new ProductController();

router.get('/:productId', (req, res) => {
  try {
    const product = productController.getProduct(
      Number.parseInt(req.params.productId)
    );
    res.status(StatusCodes.OK).json(product);
  } catch (error) {
    res.status(error.httpCode).json(error);
  }
});

export default router;
