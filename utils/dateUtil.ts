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
export const formatTime = (dateString: string) => {
    const date = new Date(dateString);

    const timeOptions: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit', 
        second: '2-digit',       
        hour12: false, // Ensure 24-hour format
    };

    return date.toLocaleTimeString('en-GB', timeOptions);
};

// create method that will convert mseconds to hh:mm format
export const secondsToHms = (input: number) => {
    if(isNaN(input)) return '0h:0min';

    input = Number(input) / 1000;
    const h = Math.floor(input / 3600);
    const m = Math.floor(input % 3600 / 60);
    const s = Math.floor(input % 3600 % 60);

    const hDisplay = h > 0 ? String(h).padStart(2, '0') : '00';
    const mDisplay = m > 0 ? String(m).padStart(2, '0') : '00';
    //const sDisplay = s > 0 ? String(s).padStart(2, '0') : '00';

    return `${hDisplay}h:${mDisplay}min`;
};