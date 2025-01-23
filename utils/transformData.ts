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

    data.processlogsList.forEach((log) => {      
        transformedData.timestamp?.push(log.timestamp);
        transformedData.temp?.push(log.sensorvalues.temp);
        transformedData.tempk?.push(log.sensorvalues.tempk);
        transformedData.sumfr?.push(log.sumfr);
        transformedData.fr?.push(log.fr);
        transformedData.pressure?.push(log.sensorvalues.pressure);
    });

    return transformedData;
};

/**
 * Updates the chart data with the provided transformed data.
 * @param data - The transformed data to update the chart with.
 * @param setChartData - The function to set the chart data.
 */
export const modularDataTransformation = (data: { processlogsList: StateMachineValues[] }): TransformedData => {
    const transformedData: TransformedData = {
        timestamp: [],
        temp: [],
        tempk: [],
        pressure: [],
        expansiontemp: [],
        heatertemp: [],
        steampressure: [],
        tanktemp: [],
        tankwaterlevel: [],
    };

    data.processlogsList.forEach((log) => {    
        transformedData.timestamp?.push(log.timestamp);  
        transformedData.temp?.push(log.sensorvalues.temp);
        transformedData.tempk?.push(log.sensorvalues.tempk);
        transformedData.pressure?.push(log.sensorvalues.pressure);
        transformedData.expansiontemp?.push(log.sensorvalues.expansiontemp);
        transformedData.heatertemp?.push(log.sensorvalues.heatertemp);
        transformedData.steampressure?.push(log.sensorvalues.steampressure);
        transformedData.tanktemp?.push(log.sensorvalues.tanktemp);
        transformedData.tankwaterlevel?.push(log.sensorvalues.tankwaterlevel);
    });
    console.log("Transformed data",transformedData);
    return transformedData;
};

/**
 * Updates the chart data with the provided transformed data.
 * @param data - The transformed data to update the chart with.
 * @param setChartData - The function to set the chart data.
 */

export const updateChartData = (data: TransformedData, setChartData: (data: any) => void) => {    
    setChartData({
        labels: data.timestamp,
        datasets: [
            {
                label: "Temperatura vode",
                data: data.temp,
                fill: false,
                borderColor: "rgba(255, 99, 132, 1)",  // Light red
                backgroundColor: "rgba(255, 99, 132, 0.3)",  // Light red with transparency
                //borderDash: [10,10],
                borderWidth: 5,
                pointStyle: "circle",
                pointBorderColor: "rgba(255, 99, 132, 1)", // Matching red for points
                pointBackgroundColor: "rgba(255, 99, 132, 0.5)", // Light red with transparency for point
                pointRadius: 0, 
                tension: 1,  // Smooth curve
                yAxisID: "y",
            },
            {
                label: "Temperatura konzerve  ",
                data: data.tempk,
                fill: false,
                borderColor: "rgba(204, 71, 71, 1)",  // Slightly lighter red than before
                backgroundColor: "rgba(204, 71, 71, 0.25)", // Less intense red with transparency
                //borderDash: [10, 10],
                //pointStyle: "circle",
                borderWidth: 4,
                pointBorderColor: "rgba(204, 71, 71, 1)", // Slightly lighter red for points
                pointBackgroundColor: "rgba(204, 71, 71, 0.3)", // Softer, more transparent red for points
                pointRadius: 0,
                tension: 1,
                yAxisID: "y",
            },
            {
                label: "Tlak  ",
                data: data.pressure,
                fill: false,
                borderColor: "rgba(153, 102, 255, 1)",
                backgroundColor: "rgba(153, 102, 255, 0.23)",
                //borderDash: [10,10],
                borderWidth: 4,
                pointStyle: "circle",
                pointBorderColor: "rgba(153, 102, 255, 1)",
                pointBackgroundColor: "#9966ff2a",
                pointRadius: 0, 
                tension: 1,
                yAxisID: "y2",
            },
            {
                label: "Fr  ",
                data: data.fr,
                fill: false,
                borderColor: "rgba(54, 162, 235, 1)",  // Lighter blue (Fr)
                backgroundColor: "rgba(54, 162, 235, 0.3)",  // Light blue with transparency
                //borderDash: [10,10],
                borderWidth: 4,
                pointStyle: "circle",
                pointBorderColor: "rgba(54, 162, 235, 1)",  // Lighter blue for points
                pointBackgroundColor: "rgba(54, 162, 235, 0.4)", // Lighter blue for point background
                pointRadius: 0,
                tension: 1,
                yAxisID: "y2",
            },
            {
                label: "sumFr",
                data: data.sumfr,
                fill: false,
                borderColor: "rgba(30, 144, 255, 1)",  // Darker blue (sumFr)
                backgroundColor: "rgba(30, 144, 255, 0.4)",  // Darker blue with transparency
                //borderDash: [10,10],
                borderWidth: 2,
                pointStyle: "circle",
                pointBorderColor: "rgba(30, 144, 255, 1)",  // Darker blue for points
                pointBackgroundColor: "rgba(30, 144, 255, 0.5)", // Darker blue for point background
                pointRadius: 0,
                tension: 1,
                yAxisID: "y2",
            }
        ],        
    });
};

/**
 * Updates the chart data for export.
 * @param data - The transformed data.
 * @param setChartData - The function to set the chart data adjusted for export (everything black/white).
 */
export const updateModularChartData = (
    data: TransformedData,
    setChartData: (data: any) => void
) => {
    setChartData({
        labels: data.timestamp,
        datasets: [
            // Temperatures
            {
                label: "Temperatura autoklava",
                data: data.temp,
                fill: false,
                borderColor: "rgba(255, 99, 132, 1)", // Light red
                backgroundColor: "rgba(255, 99, 132, 0.3)", // Transparent red
                borderWidth: 4,
                pointStyle: "circle",
                pointBorderColor: "rgba(255, 69, 69, 1)", // Vivid red
                pointBackgroundColor: "rgba(255, 69, 69, 0.4)", // Softer vivid red
                pointRadius: 0,
                tension: 1,
                yAxisID: "y",
            },
            {
                label: "Temperatura konzerve",
                data: data.tanktemp,
                fill: false,
                borderColor: "rgba(204, 71, 71, 1)", // Slightly darker red
                backgroundColor: "rgba(204, 71, 71, 0.3)", // Transparent darker red
                borderWidth: 4,
                pointStyle: "circle",
                pointBorderColor: "rgba(220, 20, 60, 1)", // Crimson
                pointBackgroundColor: "rgba(220, 20, 60, 0.4)", // Softer crimson
                pointRadius: 0,
                tension: 1,
                yAxisID: "y",
            },
            {
                label: "Temperatura cijevnog proširenja",
                data: data.expansiontemp,
                fill: false,
                borderColor: "rgba(204, 71, 71, 1)", // Slightly darker red
                backgroundColor: "rgba(204, 71, 71, 0.3)", // Transparent darker red
                borderWidth: 4,
                pointStyle: "circle",
                pointBorderColor: "rgba(178, 34, 34, 1)", // Firebrick
                pointBackgroundColor: "rgba(178, 34, 34, 0.4)", // Softer firebrick
                pointRadius: 0,
                tension: 1,
                yAxisID: "y",
            },
            {
                label: "Temperatura grijača",
                data: data.heatertemp,
                fill: false,
                borderColor: "rgba(204, 71, 71, 1)", // Slightly darker red
                backgroundColor: "rgba(204, 71, 71, 0.3)", // Transparent darker red
                borderWidth: 4,
                pointStyle: "circle",
                pointBorderColor: "rgba(255, 0, 0, 1)", // Pure red
                pointBackgroundColor: "rgba(255, 0, 0, 0.4)", // Softer pure red
                pointRadius: 0,
                tension: 1,
                yAxisID: "y",
            },
            {
                label: "Temperatura spremnika vode",
                data: data.tanktemp,
                fill: false,
                borderColor: "rgba(204, 71, 71, 1)", // Slightly darker red
                backgroundColor: "rgba(204, 71, 71, 0.3)", // Transparent darker red
                borderWidth: 4,
                pointStyle: "circle",
                pointBorderColor: "rgba(139, 0, 0, 1)", // Dark red
                pointBackgroundColor: "rgba(139, 0, 0, 0.4)", // Softer dark red
                pointRadius: 0,
                tension: 1,
                yAxisID: "y",
            },
            {
                label: "Razina spremnika vode",
                data: data.tankwaterlevel,
                fill: false,
                borderColor: "rgba(255, 140, 0, 1)", // Orange-red
                backgroundColor: "rgba(255, 140, 0, 0.3)", // Transparent orange-red
                borderWidth: 4,
                pointStyle: "circle",
                pointBorderColor: "rgba(255, 140, 0, 1)", // Orange-red
                pointBackgroundColor: "rgba(255, 140, 0, 0.4)", // Softer orange-red
                pointRadius: 0,
                tension: 1,
                yAxisID: "y",
            },
            // Pressures
            {
                label: "Pritisak",
                data: data.pressure,
                fill: false,
                borderColor: "rgba(54, 162, 235, 1)", // Light blue
                backgroundColor: "rgba(54, 162, 235, 0.3)", // Transparent blue
                borderWidth: 4,
                pointStyle: "circle",
                pointBorderColor: "rgba(54, 162, 235, 1)", // Matching blue
                pointBackgroundColor: "rgba(54, 162, 235, 0.4)", // Transparent blue
                pointRadius: 0,
                tension: 1,
                yAxisID: "y2",
            },
            {
                label: "Pritisak pare",
                data: data.steampressure,
                fill: false,
                borderColor: "rgba(30, 144, 255, 1)", // Dark blue
                backgroundColor: "rgba(30, 144, 255, 0.3)", // Transparent dark blue
                borderWidth: 4,
                pointStyle: "circle",
                pointBorderColor: "rgba(30, 144, 255, 1)", // Dark blue
                pointBackgroundColor: "rgba(30, 144, 255, 0.4)", // Softer dark blue
                pointRadius: 0,
                tension: 1,
                yAxisID: "y2",
            },
        ],
    });
};
