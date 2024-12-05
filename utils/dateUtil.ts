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

    return `${date.toLocaleDateString('en-GB', dateOptions)}, ${date.toLocaleTimeString('en-GB', timeOptions)} `;
};