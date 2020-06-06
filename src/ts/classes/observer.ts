import {DomExtract} from './dom-extract';
import {Detector} from './detector';
import {DomExtend} from './dom-extend';

export class Observer {
    private readonly isShop: boolean;
    private interval;

    constructor(
        public frequency: number = 500,
        public selector: string = '*'
    ) {
        this.isShop = new Detector().isOnlineshop();

        if (this.isShop) {
            console.info('PIT::onlineshop detected');
        } else {
            console.info('PIT::exit');
        }
    }

    public start() {
        if (!this.interval && this.isShop) {

            this.exec();

            this.interval = setInterval(() => {
                this.exec();
            }, this.frequency)
        }
    }

    public stop() {
        if (!!this.interval) {
            clearInterval(this.interval);
            console.info('PIT::stopped');
        }
    }

    private exec() {
        new DomExtend(new DomExtract(this.selector).getTextNodes()).apply();
    }
}
