import {DomExtract} from './dom-extract';
import {ShopDetector} from './shop-detector';

export class Observer {
    private shopDetector: ShopDetector;
    private domExtractor: DomExtract;

    constructor(interval: number = 5000, selector: string = '*') {
        this.shopDetector = new ShopDetector();

        if (this.shopDetector.dermineIfCurrentPageIsAShop()) {
            this.domExtractor = new DomExtract(selector);
        }

    }
}
