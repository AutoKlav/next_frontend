/**
 * Calculates the slope and intercept of a line equation based on two sets of coordinates.
 * 
 * @param x1x2 - An array containing the x-coordinates [x1, x2].
 * @param y1y2 - An array containing the y-coordinates [y1, y2].
 * @returns An array containing the calibrated minimum and maximum values [calibratedMinimum, calibratedMaximum].
 * @throws If the input arrays do not contain exactly two elements each.
 */
export const calculateSlope = (x1x2: number[], y1y2: number[]) => {
    if (x1x2.length !== 2 || y1y2.length !== 2) {
        console.error("Invalid input arrays. Both arrays must contain exactly two elements.");
        return;
    }

    // Input from sensor
    const [x1, x2] = x1x2;

    // Input from user
    const [y1, y2] = y1y2;
    console.log(`x1: ${x1}, x2: ${x2}, y1: ${y1}, y2: ${y2}`);

    // Calculate line equation
    const m = (y2 - y1) / (x2 - x1);
    const b = y1 - m * x1;
    console.log(`Line equation: y = ${m}x + ${b}`);
    
    const calibratedMinimum = m * 0 + b;
    const calibratedMaximum = m * 25000 + b;    

    console.log(`Calibrated minimum: ${calibratedMinimum}, calibrated maximum: ${calibratedMaximum}`);
    return [calibratedMinimum, calibratedMaximum];
};