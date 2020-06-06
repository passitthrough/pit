import {DomExtract} from './dom-extract';

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

    console.log(textNodes);

    let nodes = document.querySelectorAll('*');

    nodes.forEach((currentNode) => {
        let textNode = currentNode.childNodes[0];
        const isTextNode = !!currentNode.childNodes[0] && typeof currentNode.childNodes[0].nodeValue === 'string';

        if (isTextNode) {

            let text = textNode.nodeValue;

            if (
                (
                    text.indexOf('EUR') !== -1 ||
                    text.indexOf('Eur') !== -1 ||
                    text.indexOf('€') !== -1 ||
                    text.indexOf('EURO') !== -1 ||
                    text.indexOf('Euro') !== -1
                ) &&
                currentNode.className.indexOf('calculated') === -1
            ) {
                let price = textNode.nodeValue.replace(/[^0-9,]/g, '').replace(/,/g, '.');
                let priceNumber = parseInt(price, 10);

                if (typeof priceNumber === 'number') {
                    let betterPrice = (priceNumber * .97).toFixed(2);
                    currentNode.className += ' calculated';
                    currentNode.innerHTML += ' <span class="pitprice calculated">PITPRICE* ~' + betterPrice + 'EUR </span>';

                    matches += 1;
                }
            }
        }
    });
}, 1000);


const findRelevantNodes = () => {

}


