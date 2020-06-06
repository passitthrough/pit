import {PriceIndication} from './enums/price-indication';
import {Flag} from './enums/flag';

export class DomExtract {
    private readonly domNodes: NodeListOf<Element>;
    private filter = Array.prototype.filter;

    constructor(selector: string = '*') {
        this.domNodes = document.querySelectorAll(selector);
    }


    public getTextNodes(): NodeListOf<Element> {
        console.log('Init extraction');

        let filtered = this
            .filter
            .call(this.domNodes, function (node: Element) {
                const potentialTextNode = node.childNodes[0];
                const isTextNode = !!potentialTextNode && typeof potentialTextNode.nodeValue === 'string';

                if (isTextNode) {

                    let nodeText: string = potentialTextNode.nodeValue;

                    return (
                        node.className.indexOf(Flag.CLASS_EXCLUDE_ITEM) === -1 &&
                        (
                            nodeText.indexOf(PriceIndication.CURRENCY_SYMBOL) !== -1 ||
                            nodeText.indexOf(PriceIndication.CURRENCY_PREFIX_UC) !== -1 ||
                            nodeText.indexOf(PriceIndication.CURRENCY_PREFIX_CC) !== -1 ||
                            nodeText.indexOf(PriceIndication.CURRENCY_PREFIX_LC) !== -1 ||
                            nodeText.indexOf(PriceIndication.CURRENCY_NAME_CC) !== -1 ||
                            nodeText.indexOf(PriceIndication.CURRENCY_NAME_LC) !== -1 ||
                            nodeText.indexOf(PriceIndication.CURRENCY_NAME_UC) !== -1
                        )
                    );
                }

                return false;
            });


        return filtered;
    }

}
