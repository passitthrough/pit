import {PriceIndication} from '../enums/price-indication';
import {Flag} from '../enums/flag';

export class DomExtract {
    private domNodes: NodeListOf<HTMLElement>;
    private filter = Array.prototype.filter;

    constructor(public selector: string = '*') {
        this.fetchNodes();
    }

    public getTextNodes(): HTMLElement[] {
        let relevantNodes: HTMLElement[] = [];

        this.domNodes
            .forEach((node) => {
                node
                    .childNodes
                    .forEach((childNode) => {

                        node.childNodes
                            .forEach((childNode) => {
                                const potentialTextNode = childNode;
                                const isTextNode = !!potentialTextNode && typeof potentialTextNode.nodeValue === 'string';

                                if (isTextNode) {

                                    let nodeText: string = potentialTextNode.nodeValue.toString().trim();

                                    if (
                                        typeof node.className === 'string' &&
                                        !node.className.includes(Flag.IGNORE) &&
                                        (
                                            nodeText.includes(PriceIndication.CURRENCY_SYMBOL) ||
                                            nodeText.includes(PriceIndication.CURRENCY_PREFIX_UC) ||
                                            nodeText.includes(PriceIndication.CURRENCY_PREFIX_CC) ||
                                            nodeText.includes(PriceIndication.CURRENCY_PREFIX_LC) ||
                                            nodeText.includes(PriceIndication.CURRENCY_NAME_CC) ||
                                            nodeText.includes(PriceIndication.CURRENCY_NAME_LC) ||
                                            nodeText.includes(PriceIndication.CURRENCY_NAME_UC) ||
                                            nodeText.match(/\d+(\.|,)\d+/) !== null
                                        )
                                    ) {
                                        relevantNodes.push(node);
                                    }
                                }
                            });
                    });
            });

        return relevantNodes;
        /*
                return this
                    .filter
                    .call(this.domNodes, function (node: HTMLElement) {

                        node
                            .childNodes
                            .forEach((childNode) => {


                                const potentialTextNode = node.childNodes[0];

                                const isTextNode = !!potentialTextNode && typeof potentialTextNode.nodeValue === 'string';

                                if (isTextNode) {

                                    let nodeText: string = potentialTextNode.nodeValue.toString();

                                    return (
                                        typeof node.className === 'string' &&
                                        !node.className.includes(Flag.IGNORE) &&
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
                                } else {
                                    console.log('x', node);
                                }
                            });

                        return false;
                    });
                    */

    }

    private fetchNodes() {
        return this.domNodes = document.querySelectorAll(this.selector);
    }
}
