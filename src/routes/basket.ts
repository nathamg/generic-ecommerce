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
  const { params, body } = req;
  try {
    await basketController.addProductToBasket(
      params.basketId,
      body.itemId,
      body.itemsQuantity
    );
    res.status(StatusCodes.OK).end();
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

router.get('/:basketId/checkout', async (req, res) => {
  try {
    const checkout = await basketController.checkoutBasket(req.params.basketId);
    res.status(StatusCodes.OK).json(checkout);
  } catch (error) {
    console.log(error);
    if (error instanceof APIError) {
      res.status(error.httpCode).json(error);
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send('Internal server error');
    }
  }
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
