import {DomExtract} from './classes/dom-extract';
import {Flag} from './enums/flag';
import {PriceParser} from './classes/price-parser';
import {DomExtend} from './classes/dom-extend';

console.log('PIT RUNNING');


const showPitPrices = () => {
    let hiddenNodes = document.querySelectorAll('.pithidden');

    hiddenNodes
        .forEach((hiddenNode) => {
            hiddenNode.className = hiddenNode.className.replace('pithidden', '');
        });
};

let matches = 0;
let headerNotInjected = false;


setInterval(() => {
    if (matches > 0 && !headerNotInjected) {
        let body = document.getElementsByTagName('body')[0];

        //   body.innerHTML = prependHeader + body.innerHTML;
        headerNotInjected = true;

        requestAnimationFrame(() => {
            const showPitPricesBtn = document.getElementById('showPitPricesBtn');

            showPitPricesBtn.addEventListener('click', showPitPrices);
        });
    }

    let domExtender = new DomExtend(new DomExtract().getTextNodes());


    domExtender.apply();


}, 1000);


const findRelevantNodes = () => {

}


