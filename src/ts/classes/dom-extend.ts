import {PriceParser} from './price-parser';
import {Flag} from '../enums/flag';
import {PriceIndication} from '../enums/price-indication';

export interface DomExtendItem {
    node: Element;
    price: number;
    extend: any;
    applied: boolean;
};

export class DomExtend {
    private queue: DomExtendItem[] = [];
    private priceParser = new PriceParser();

    constructor(private textNodes: NodeListOf<Element>) {
        if (textNodes.length > 0) {
            this.process();
        }
    }

    public apply() {
        this.queue
            .forEach((queueItem) => {
                queueItem.node.className += Flag.WHITESPACE + Flag.CLASS_EXCLUDE_ITEM;
                queueItem.node.innerHTML += queueItem.extend;

                queueItem.applied = true;
            });
    }

    private process() {
        this
            .textNodes
            .forEach((textNode) => {
                this.addDomExtendItem(textNode)
            });
    }

    private addDomExtendItem(textNode: Element) {
        const price = this.priceParser.parse(textNode.childNodes[0].nodeValue);

        if (typeof price === 'number') {

            // TODO some kind of better/stable calc "engine"
            let pitPrice = (price * .97).toFixed(2);


            this.queue.push({
                node: textNode,
                price: price,
                // TODO create element scripted/templated
                extend: '<span class="pitprice ' + Flag.CLASS_EXCLUDE_ITEM + '">-3%MwSt. ~' + pitPrice + PriceIndication.CURRENCY_SYMBOL + '</span>',
                applied: false
            });
        }
    }
}
