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

export const updateChartData = (data: TransformedData, hideFSumFR: boolean | undefined, setChartData: (data: any) => void) => {    
    
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
        {
            label: "Temperatura sredine ",
            data: data.tempk,
            fill: false,
            borderColor: "rgba(255, 182, 193, 1)", // Pale red (light pink)
            backgroundColor: "rgba(255, 182, 193, 0.3)", // Lighter pale red background
            borderWidth: 4,
            pointBorderColor: "rgba(255, 182, 193, 1)",
            pointBackgroundColor: "rgba(255, 182, 193, 0.5)",
            pointRadius: 0,
            tension: 1,
            yAxisID: "y",
        },
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
        //TODO revert this        
        ...(!hideFSumFR ? [{
            label: "Fr  ",
            data: data.fr,
            fill: false,
            borderColor: "rgba(0, 51, 153, 1)", // Darker blue
            backgroundColor: "rgba(0, 51, 153, 0.3)", // Lighter background for contrast
            borderWidth: 4,
            pointStyle: "circle",
            pointBorderColor: "rgba(0, 51, 153, 1)",
            pointBackgroundColor: "rgba(0, 51, 153, 0.4)",
            pointRadius: 0,
            tension: 1,
            yAxisID: "y2",
        }] : []),
        // Conditionally include sumfr dataset
        ...(!hideFSumFR ? [{
            label: "sumFr",
            data: data.sumfr,
            fill: false,
            borderColor: "rgba(135, 206, 250, 1)", // Lighter blue (sky blue)
            backgroundColor: "rgba(135, 206, 250, 0.4)", // Pale blue background
            borderWidth: 2,
            pointStyle: "circle",
            pointBorderColor: "rgba(135, 206, 250, 1)",
            pointBackgroundColor: "rgba(135, 206, 250, 0.5)",
            pointRadius: 0,
            tension: 1,
            yAxisID: "y2",
        }] : [])
    ];        
    
    setChartData({
        labels: data.timestamp,
        datasets: datasets
    });
};




