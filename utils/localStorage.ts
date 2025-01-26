/**
 * Construct the local storage key in a way that is safe to store data
 * @param key identifier
 */
const constructStorageKey = (key: string): string => key;

/**
 * Gets value from local storage in a safe way.
 * @param key identifier
 */
export const getFromLocalStorage = (key: string): any | null => {
  const localStorageKey = constructStorageKey(key);
  const value = localStorage.getItem(localStorageKey)  || "null";
  return JSON.parse(value);
};

/**
 * Stores values to local storage in a safe way
 * @param key identifier
 * @param value value to store
 */
export const setToLocalStorage = (key: string, value: any): void => {
  const localStorageKey = constructStorageKey(key);
  localStorage.setItem(localStorageKey, JSON.stringify(value));
};

/**
 * Removes key from local storage in a safe way
 * @param key identifier
 */
export const removeFromLocalStorage = (key: string): void => {
  const localStorageKey = constructStorageKey(key);
  localStorage.removeItem(localStorageKey);
};
