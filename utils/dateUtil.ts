/**
 * Gets the current date and time formatted as a string.
 * The format of the returned string is "YYYY-MM-DD-HH-MM-SS".
 *
 * @returns {string} The current date and time as a formatted string.
 */
export const getCurrentDateTime = (): string => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day}-${hours}-${minutes}-${seconds}`;
};

/**
 * Formats a date string into a formatted date and time string.
 * @param dateString - The date string to format.
 * @returns The formatted date and time string. (hh:mm:ss dd/mm/yyyy)
 */
export const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);

    const timeOptions: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false, // Ensure 24-hour format
    };

    const dateOptions: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    };

    return `${date.toLocaleTimeString('en-GB', timeOptions)}, ${date.toLocaleDateString('en-GB', dateOptions)}`;
};

/**
 * Formats a given date string into a 24-hour time format.
 * @param dateString - The date string to be formatted.
 * @returns The formatted time string in the format "HH:mm".
 */
export const formatTime = (dateString: string | undefined | null) => {
    // Handle undefined/null/empty input
    if (!dateString) {
        return '--:--'; // or return an empty string '' if preferred
    }

    const date = new Date(dateString);

    // Check if the date is invalid
    if (isNaN(date.getTime())) {
        return '--:--:--'; // or return an empty string '' if preferred
    }

    const timeOptions: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false, // Ensure 24-hour format
    };

    return date.toLocaleTimeString('en-GB', timeOptions);
};

/**
 * Converts a time duration from seconds to a string formatted as "hh:mm".
 *
 * @param input - The time duration in milliseconds. If the input is NaN, it returns '0h:0min'.
 * @returns A string representing the time in hours and minutes.
 *
 * @example
 * // returns "01h:30min"
 * secondsToHms(5400000);
 *
 * @example
 * // returns "00h:00min"
 * secondsToHms(NaN);
 */
export const secondsToHms = (input: number | undefined): string => {
    if (input === undefined || isNaN(input)) {
        return '00h:00min'; // Default string for undefined/NaN
    }

    const seconds = Number(input); // seconds
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);

    const hDisplay = String(h).padStart(2, '0');
    const mDisplay = String(m).padStart(2, '0');

    return `${hDisplay}h:${mDisplay}min`;
};