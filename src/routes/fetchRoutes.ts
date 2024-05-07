import { Router } from 'express';
import scrapperController from '../controllers/scrapperController';

const fetchRouter = Router();

fetchRouter.get('/scrape', scrapperController.fetchAmazon);

export default fetchRouter;