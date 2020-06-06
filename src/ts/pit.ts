import {DomExtract} from './dom-extract';
import {Flag} from './enums/flag';

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
let prependHeader = '<div class="pitheader"><button id="showPitPricesBtn">Zeige PIT-Preise</button></div>';


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

    let domExtractor = new DomExtract();

    let textNodes = domExtractor.getTextNodes();


    textNodes
        .forEach((currentNode) => {

            let price = currentNode
                .childNodes[0]
                .nodeValue
                .replace(/[^0-9,]/g, '')
                .replace(/,/g, '.');


            let priceNumber = parseInt(price, 10);

            if (typeof priceNumber === 'number') {
                let betterPrice = (priceNumber * .97).toFixed(2);
                currentNode.className += Flag.WHITESPACE + Flag.CLASS_EXCLUDE_ITEM;
                currentNode.innerHTML += ' <span class="pitprice ' + Flag.CLASS_EXCLUDE_ITEM + '">PITPRICE* ~' + betterPrice + 'EUR </span>';

                matches += 1;
            }


        });
}, 1000);


const findRelevantNodes = () => {

}


