import { useEffect, useState } from 'react';

const STORAGE_KEY = 'showTimeGraphExtraSeries';

/**
 * Plain, SSR-safe read of the "show extra series on TIME-mode graphs" preference.
 * Returns false on the server and when no preference has been stored (default: hidden).
 */
export const getShowTimeGraphExtraSeries = (): boolean => {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem(STORAGE_KEY) === 'true';
};

/**
 * React hook for the settings switch. Initialises to false, reads the stored value
 * after mount (avoiding hydration mismatch) and persists changes to localStorage.
 */
export const useShowTimeGraphExtraSeries = (): [boolean, (value: boolean) => void] => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(getShowTimeGraphExtraSeries());
    }, []);

    const update = (value: boolean) => {
        setShow(value);
        if (typeof window !== 'undefined') {
            window.localStorage.setItem(STORAGE_KEY, value ? 'true' : 'false');
        }
    };

    return [show, update];
};
