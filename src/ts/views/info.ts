import {Flag} from '../enums/flag';
import {PriceIndication} from '../enums/price-indication';

export const getInfo = (price): Element => {
    const node = document.createElement('div');


    const template = `  <table cellpadding="0" cellspacing="0">
                        <tr>
                            <td class="valign-top text-right pr">Aktueller Preis</td>
                            <td class="valign-top bg-grey">
                                <table cellpadding="0" cellspacing="0">
                                <tr>
                                  
                                    <td class="text-center" colspan="2">
                                        nach MwSt-Senkung
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-grey text-center">5%</td>
                                    <td class="text-grey text-center">16%</td>
                                </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td class="text-bold text-right text-large valign-top pr ${Flag.IGNORE}">
                                ${price.toFixed(2).replace('.', ',')}${PriceIndication.CURRENCY_SYMBOL}
                           </td>
                            <td class="bg-grey">
                                <table cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td class="text-large text-center text-green text-bold ${Flag.IGNORE}">
                                            ${((price / 1.07) * 1.05).toFixed(2).replace('.', ',')}${PriceIndication.CURRENCY_SYMBOL}
                                        </td>
                                          <td class="text-large text-center text-green text-bold ${Flag.IGNORE}">
                                            ${((price / 1.19) * 1.16).toFixed(2).replace('.',',')}${PriceIndication.CURRENCY_SYMBOL}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="text-xsmall text-center text-bold">
                                            Ersparnis 
                                            <span class="text-bold text-green ${Flag.IGNORE}">
                                                ${(price - ((price / 1.07) * 1.05)).toFixed(2).replace('.', ',')}${PriceIndication.CURRENCY_SYMBOL}
                                            </span>
                                        </td>
                                        <td class="text-xsmall text-center text-bold">
                                            Ersparnis 
                                            <span class="text-bold text-green ${Flag.IGNORE}">
                                                ${(price - ((price / 1.19) * 1.16)).toFixed(2).replace('.', ',')}${PriceIndication.CURRENCY_SYMBOL}
                                            </span>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        </table>`;

    node.dataset['role'] = 'tooltip';
    node.className = `pit pit-hidden ${Flag.IGNORE}`;
    node.innerHTML = template;


    return node;
};
