import {PriceIndication} from '../enums/price-indication';
import {Flag} from '../enums/flag';

export class DomExtract {
    private domNodes: NodeListOf<Element>;
    private filter = Array.prototype.filter;

    constructor(public selector: string = '*') {
        this.fetchNodes();
    }

    public getTextNodes(): NodeListOf<Element> {
        return this
            .filter
            .call(this.domNodes, function (node: Element) {
                const potentialTextNode = node.childNodes[0];
                const isTextNode = !!potentialTextNode && typeof potentialTextNode.nodeValue === 'string';

                if (isTextNode) {

                    let nodeText: string = potentialTextNode.nodeValue.toString();

                    return (
                        typeof node.className === 'string' &&
                        !node.className.includes(Flag.CLASS_EXCLUDE_ITEM) &&
                        (
                            nodeText.includes(PriceIndication.CURRENCY_SYMBOL) ||
                            nodeText.includes(PriceIndication.CURRENCY_PREFIX_UC) ||
                            nodeText.includes(PriceIndication.CURRENCY_PREFIX_CC) ||
                            nodeText.includes(PriceIndication.CURRENCY_PREFIX_LC) ||
                            nodeText.includes(PriceIndication.CURRENCY_NAME_CC) ||
                            nodeText.includes(PriceIndication.CURRENCY_NAME_LC) ||
                            nodeText.includes(PriceIndication.CURRENCY_NAME_UC)
                        )
                    );
                }

                return false;
            });
    }

    private fetchNodes() {
        return this.domNodes = document.querySelectorAll(this.selector);
    }
}
