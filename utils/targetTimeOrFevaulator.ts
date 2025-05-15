export const hideFSumFR =  (process: any) => {    
    return parseFloat(process?.targetf || "0") > 0 ? false : true;
}    
