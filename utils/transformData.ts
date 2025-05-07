import { TransformedData } from "@/types/app";
import { StateMachineValues } from "@/types/grpc";

/**
 * Transforms the data by extracting specific properties from each log object.
 * @param data - The data object containing an array of log objects.
 * @returns The transformed data object with extracted properties.
 */
export const transformData = (data: { processlogsList: StateMachineValues[] }): TransformedData => {
    const transformedData: TransformedData = {
        timestamp: [],
        temp: [],
        tempk: [],
        sumfr: [],
        fr: [],
        pressure: [],
    };

    data?.processlogsList?.forEach((log) => {      
        transformedData.timestamp?.push(log.timestamp);
        transformedData.temp?.push(log.sensorvalues.temp);
        transformedData.tempk?.push(log.sensorvalues.tempk);
        transformedData.sumfr?.push(log.sumfr);
        transformedData.fr?.push(log.fr);
        transformedData.pressure?.push(log.sensorvalues.pressure*10); // 
    });

    return transformedData;
};
  
/**
 * Updates the chart data with the provided transformed data.
 * @param data - The transformed data to update the chart with.
 * @param setChartData - The function to set the chart data.
 */

export const updateChartData = (data: TransformedData, setChartData: (data: any) => void) => {    
    // Check if fr array has any non-null values
    const hasFrData = data.fr && data.fr.some(val => val === null);
    // Check if sumfr array has any non-null values
    const hasSumFrData = data.sumfr && data.sumfr.some(val => val === null);

    const datasets = [
        {
            label: "Temperatura autoklava ",
            data: data.temp,
            fill: false,
            borderColor: "rgba(139, 0, 0, 1)", // Darker red
            backgroundColor: "rgba(139, 0, 0, 0.3)", // Lighter background for contrast
            borderWidth: 5,
            pointStyle: "circle",
            pointBorderColor: "rgba(139, 0, 0, 1)",
            pointBackgroundColor: "rgba(139, 0, 0, 0.5)",
            pointRadius: 0,
            tension: 1,
            yAxisID: "y",
        },
        // {
        //     label: "Temperatura sredine ",
        //     data: data.tempk,
        //     fill: false,
        //     borderColor: "rgba(255, 182, 193, 1)", // Pale red (light pink)
        //     backgroundColor: "rgba(255, 182, 193, 0.3)", // Lighter pale red background
        //     borderWidth: 4,
        //     pointBorderColor: "rgba(255, 182, 193, 1)",
        //     pointBackgroundColor: "rgba(255, 182, 193, 0.5)",
        //     pointRadius: 0,
        //     tension: 1,
        //     yAxisID: "y",
        // },
        {
            label: "Tlak/10  ",
            data: data.pressure,
            fill: false,
            borderColor: "rgba(153, 102, 255, 1)",
            backgroundColor: "rgba(153, 102, 255, 0.23)",
            borderWidth: 4,
            pointStyle: "circle",
            pointBorderColor: "rgba(153, 102, 255, 1)",
            pointBackgroundColor: "#9966ff2a",
            pointRadius: 0, 
            tension: 1,
            yAxisID: "y",
        },
        // Conditionally include fr dataset
        // ...(hasFrData ? [{
        //     label: "Fr  ",
        //     data: data.fr,
        //     fill: false,
        //     borderColor: "rgba(54, 162, 235, 1)",
        //     backgroundColor: "rgba(54, 162, 235, 0.3)",
        //     borderWidth: 4,
        //     pointStyle: "circle",
        //     pointBorderColor: "rgba(54, 162, 235, 1)",
        //     pointBackgroundColor: "rgba(54, 162, 235, 0.4)",
        //     pointRadius: 0,
        //     tension: 1,
        //     yAxisID: "y2",
        // }] : []),
        // // Conditionally include sumfr dataset
        // ...(hasSumFrData ? [{
        //     label: "sumFr",
        //     data: data.sumfr,
        //     fill: false,
        //     borderColor: "rgba(30, 144, 255, 1)",
        //     backgroundColor: "rgba(30, 144, 255, 0.4)",
        //     borderWidth: 2,
        //     pointStyle: "circle",
        //     pointBorderColor: "rgba(30, 144, 255, 1)",
        //     pointBackgroundColor: "rgba(30, 144, 255, 0.5)",
        //     pointRadius: 0,
        //     tension: 1,
        //     yAxisID: "y2",
        // }] : [])
    ];        
    
    setChartData({
        labels: data.timestamp,
        datasets: datasets
    });
};




