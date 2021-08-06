import BasketController from '../controllers/baskets';
import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { APIError } from '../utils/Errors';

const router = Router();
const basketController = new BasketController();

router.post('/', async (req, res) => {
  try {
    const basket = await basketController.createBasket();
    res.status(StatusCodes.CREATED).json(basket);
  } catch (error) {
    if (error instanceof APIError) {
      res.status(error.httpCode).json(error);
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send('Internal server error');
    }
  }
});

router.post('/:basketId/products', async (req, res) => {
  res.status(StatusCodes.NOT_IMPLEMENTED);
});

router.get('/:basketId/checkout', async (req, res) => {
  res.status(StatusCodes.NOT_IMPLEMENTED);
});

router.delete('/:basketId', async (req, res) => {
  try {
    await basketController.deleteBasket(req.params.basketId);
    res.status(StatusCodes.NO_CONTENT).end();
  } catch (error) {
    if (error instanceof APIError) {
      res.status(error.httpCode).json(error);
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send('Internal server error');
    }
  }
});

export default router;
