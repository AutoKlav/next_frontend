/**
 * Determines whether to hide the F graph sum based on the target F value.
 * @param targetF - The target F value.
 * @returns True if the target F value is 0 or falsy, false otherwise.
 */
export const hideFSumFR =  (targetF: string) => {    
    return parseFloat(targetF || "0") > 0 ? false : true;
}    
