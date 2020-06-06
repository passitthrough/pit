export class PriceParser {
    public parse(textContainingOnePrice) {
        return parseInt(textContainingOnePrice
                .replace(/[^0-9,]/g, '')
                .replace(/,/g, '.'),
            10);
    }
}
