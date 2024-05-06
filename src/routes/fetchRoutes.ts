import { Router } from 'express';
import scrapperController from '../controllers/scrapperController';

const fetchRouter = Router();

fetchRouter.get('/fetch', scrapperController.fetchAmazon);

export default fetchRouter;