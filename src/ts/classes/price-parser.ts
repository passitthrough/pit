export class PriceParser {
    public parse(textContainingOnePrice) {
        return parseFloat(
            textContainingOnePrice
                .replace(/[^0-9,]/g, '')
                .replace(/,/g, '.')
        );
    }
}
