/**
 * Checks if the given data contains the error "14 UNAVAILABLE".
 * @param data - The data to check for errors.
 * @returns True if the error "14 UNAVAILABLE" is found, false otherwise.
 */
export const checkForErrors = (data:any) =>{
    return data?.errorsstring?.includes("14 UNAVAILABLE");
}
