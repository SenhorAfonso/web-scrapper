import { Request, Response  } from 'express';

class scrapperController {

  static fetchAmazon(
    req: Request,
    res: Response
  ) {
    const result: string = 'fetchAmazon';
    res.status(200).json({ result });
  }

}

export default scrapperController;