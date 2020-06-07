import {Flag} from '../enums/flag';
import {PriceIndication} from '../enums/price-indication';

export const getInfo = (price): Element => {
    const node = document.createElement('div');


    const template = `<table>
                         <tr>
                            <td class="text-right">aktueller Preis:</td>     
                            <td class=" text-bold text-right text-red ${Flag.IGNORE}">
                                ${price.toFixed(2)} ${PriceIndication.CURRENCY_SYMBOL}
                            </td>    
                         </tr>
                         
                         
                         <tr>
                            <td class="text-right">Sparpotential:</td>     
                            <td>
                                <table class="border-top" cellpadding="0" cellspacing="0">
                                    <thead>
                                    <tr>
                                        <th width="50%" class="text-right text-xsmall text-grey">-2% MwSt.</th>
                                        <th width="50%" class="text-right text-xsmall text-grey">-3% MwSt.</th>
                                    </tr>
                                   </thead>
                                   <tbody>
                                       <tr>
                                           <td width="50%" class="text-right text-bold text-green ${Flag.IGNORE}">${((price) * .02).toFixed(2)} ${PriceIndication.CURRENCY_SYMBOL}</td>
                                           <td width="50%" class="text-right text-bold text-green ${Flag.IGNORE}">${((price) * .03).toFixed(2)} ${PriceIndication.CURRENCY_SYMBOL}</td>
                                       </tr>
                                   </tbody>
                                </table>
                            </td>
                         </tr>
                         
                          <tr>
                            <td class="text-right">Durchreichspreis:</td>     
                            <td>
                                <table class="border-top" cellpadding="0" cellspacing="0">
                                    <thead>
                                    <tr>
                                        <th class="text-right text-xsmall text-grey">5% MwSt.</th>
                                        <th class="text-right text-xsmall text-grey">16% MwSt.</th>
                                    </tr>
                                   </thead>
                                   <tbody>
                                       <tr>
                                           <td class="text-medium text-right text-bold text-green ${Flag.IGNORE}">${((price) * .98).toFixed(2)} ${PriceIndication.CURRENCY_SYMBOL}</td>
                                           <td class="text-medium text-right text-bold text-green ${Flag.IGNORE}">${((price) * .97).toFixed(2)} ${PriceIndication.CURRENCY_SYMBOL}</td>
                                       </tr>
                                   </tbody>
                                </table>
                            </td>
                         </tr>
                     </table>
    `;

    node.dataset['role'] = 'tooltip';
    node.className = `pit pit-hidden ${Flag.IGNORE}`;
    node.innerHTML = template;


    return node;
};
