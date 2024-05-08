import { Request, Response  } from 'express';
import scrapperService from '../services/scrapperService';

class scrapperController {

  static async fetchAmazon(
    req: Request,
    res: Response
  ) {
    const result = await scrapperService.fetch(req.query);

    res.status(200).json({ result });
  }

}

export default scrapperController;