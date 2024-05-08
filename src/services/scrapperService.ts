import axios from 'axios';
import { JSDOM } from 'jsdom';
import IKeyword from '../interfaces/IKeyword';

class scrapperService {

  static async fetch(query: IKeyword) {
    const { keyword } = query;

    if (!keyword) {
      throw new Error('Keyword can not be empty');
    }

    const url: string = `https://www.amazon.com.br/s?k=${keyword}`;

    const result = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.9999.9999 Safari/537.36',
        'Accept-Language': 'en-US,en,q=0.9'
      }
    });

    return this.parseHTML(result.data);
  }

  private static parseHTML(data: string) {
    const dom = new JSDOM(data);
    const { document } = dom.window;

    const searchItemsList = document.querySelectorAll('[data-component-type="s-search-result"]');
    const itemsList: any[] = [];

    searchItemsList.forEach(element => {
      const elementDOM = new JSDOM(element.innerHTML).window.document;

      const product = {
        title: this.getItemTitle(elementDOM),
        image: this.getItemImage(elementDOM),
        rating: this.getItemRating(elementDOM),
        numberOfReviews: this.getItemReviewNumber(elementDOM)
      };

      itemsList.push(product);
    });

    return itemsList;
  }

  private static getItemTitle(element: Document) {
    const productTitle = element.querySelector('.s-title-instructions-style > h2 > a > span')?.textContent;
    return productTitle;
  }

  private static getItemImage(element: Document) {
    const imageSourceSet = element.querySelector('img')!.srcset;
    const arrayOfSourceSet = imageSourceSet.split(',');
    const biggestImage = arrayOfSourceSet[arrayOfSourceSet.length-1].trim().split(' ')[0].trim();

    return biggestImage;
  }

  private static getItemRating(element: Document) {
    const rating = element.querySelector('.a-spacing-top-micro span .a-declarative i > span')?.textContent;

    if (!rating) {
      return 'n/a';
    }

    return rating;
  }

  private static getItemReviewNumber(element: Document) {
    const reviewSpan = element.querySelectorAll('.a-spacing-top-micro > div.a-size-small > span');
    const reviewNumber = reviewSpan[reviewSpan.length-1]?.textContent!.trim();

    if (!reviewNumber) {
      return 0;
    }

    return reviewNumber;

  }

}

export default scrapperService;