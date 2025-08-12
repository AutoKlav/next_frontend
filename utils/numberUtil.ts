/**
 * Parses a string value into a number and formats it for display.
 * If the parsed value is between 0 and 10,000 (inclusive), it is displayed in normal notation with 2 decimal places.
 * Otherwise, it is displayed in exponential notation with 1 decimal place.
 * If the value is NaN, it displays 'Nedostupno'.
 * If the value is Infinity, it displays 'Beskonačno'.
 * 
 * @param value - The string value to parse and format.
 * @returns The formatted display value as a string.
 */
export const parseAndFormatValue = (value: string, decimal: number = 1): string => {
    const parsedValue = parseFloat(value);
    let displayValue;

    if (isNaN(parsedValue)) {
        displayValue = 'Nedostupno';
    } else if (!isFinite(parsedValue)) {
        displayValue = 'Beskonačno';
    } else if (parsedValue === 0) {
        displayValue = '0';
    } else {
        const exponent = Math.floor(Math.log10(Math.abs(parsedValue)));
        if (exponent <= 4) {
            displayValue = parsedValue.toFixed(decimal); // Display in normal notation with 2 decimal places
        } else {
            displayValue = parsedValue.toExponential(2); // Display in exponential notation with 2 decimal places
        }
    }

    return displayValue;
}