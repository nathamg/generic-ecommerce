import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import ItemController from '../controllers/items';
import { APIError } from '../utils/Errors';

const router = Router();
const itemController = new ItemController();

router.get('/:itemId', async (req, res) => {
  try {
    const product = await itemController.getItem(
      Number.parseInt(req.params.itemId)
    );
    res.status(StatusCodes.OK).json(product);
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
