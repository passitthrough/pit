import {PriceParser} from './price-parser';
import {Flag} from '../enums/flag';
import {PriceIndication} from '../enums/price-indication';
import {getInfo} from '../views/info';
import {createPopper} from '@popperjs/core';

export interface DomExtendItem {
    node: HTMLElement;
    price: number;
    extend: any;
    applied: boolean;
};

export class DomExtend {
    private queue: DomExtendItem[] = [];
    private priceParser = new PriceParser();

    constructor(private textNodes: NodeListOf<HTMLElement> | HTMLElement[]) {
        if (textNodes.length > 0) {
            this.process();
        }
    }

    public apply() {
        this.queue
            .forEach((queueItem) => {
                const tooltip = queueItem.extend();

                queueItem.node.className += Flag.WHITESPACE + Flag.IGNORE + Flag.WHITESPACE + 'has-pit-dialog';
                queueItem.node.appendChild(tooltip);


                queueItem.node.onmouseover = () => {
                    tooltip.className = tooltip.className.replace(/ pit-hidden/g, '');
                };

                queueItem.node.onmouseout = () => {
                    tooltip.className += ' pit-hidden';
                };

                requestAnimationFrame(() => {
                    createPopper(queueItem.node,
                        tooltip,
                        {
                            placement: 'right',
                        });
                });

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

    private addDomExtendItem(textNode: HTMLElement) {
        let rawPriceString = '';

        textNode.childNodes
            .forEach((childNode) => {
                rawPriceString += (!!childNode.nodeValue) ? childNode.nodeValue.toString() : '';
            });


        const price = this.priceParser.parse(rawPriceString.trim());

        if (typeof price === 'number') {

            this.queue.push({
                node: textNode,
                price: price,
                extend: () => {
                    return getInfo(price);
                },
                applied: false
            });
        }
    }
}
