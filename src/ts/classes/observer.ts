import {DomExtract} from './dom-extract';
import {Detector} from './detector';

export class Observer {
    private shopDetector: Detector;
    private domExtractor: DomExtract;

    constructor(interval: number = 5000, selector: string = '*') {
        this.shopDetector = new Detector();

        if (this.shopDetector.isOnlineshop()) {
            this.domExtractor = new DomExtract(selector);
        }

    }
}
