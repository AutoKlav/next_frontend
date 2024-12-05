/**
 * Converts seconds to hours, minutes, and seconds format.
 * @param seconds - The number of seconds to convert.
 * @returns The converted time in the format "Xh Ym Zs".
 */
export const convertSecondsToHMS = (input: string): string => {
    //try to convert string to number 
    const seconds = parseInt(input);
    if (isNaN(seconds)) {
        return 'Nedostupno';
    }

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours}h ${minutes}m ${remainingSeconds}s`;
};