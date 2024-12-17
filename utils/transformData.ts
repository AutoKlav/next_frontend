import { TransformedData } from "@/types/app";

type Log = {
    timestamp: string;
    temp: number;
    tempk: number;
    sumfr: number;
    fr: number;
    pressure: number;
};


/**
 * Transforms the data by extracting specific properties from each log object.
 * @param data - The data object containing an array of log objects.
 * @returns The transformed data object with extracted properties.
 */
export const transformData = (data: { processlogsList: Log[] }): TransformedData => {
    const transformedData: TransformedData = {
        timestamp: [],
        temp: [],
        tempk: [],
        sumfr: [],
        fr: [],
        pressure: [],
    };

    data.processlogsList.forEach((log) => {
        transformedData.timestamp.push(log.timestamp);
        transformedData.temp.push(log.temp);
        transformedData.tempk.push(log.tempk);
        transformedData.sumfr.push(log.sumfr);
        transformedData.fr.push(log.fr);
        transformedData.pressure.push(log.pressure);
    });

    return transformedData;
};

/**
 * Updates the chart data with the provided transformed data.
 * @param data - The transformed data to update the chart with.
 * @param setChartData - The function to set the chart data.
 */

// balck white circles
export const updateChartData = (data: TransformedData, setChartData: (data: any) => void) => {    
    setChartData({
        labels: data.timestamp,
        datasets: [
            {
                label: "Temperatura vode (0-120°C)",
                data: data.temp,
                fill: false,
                borderColor: "rgba(255, 99, 132, 1)",  // Light red
                backgroundColor: "rgba(255, 99, 132, 0.3)",  // Light red with transparency
                borderDash: [],
                borderWidth: 4,
                pointStyle: "circle",
                pointBorderColor: "rgba(255, 99, 132, 1)", // Matching red for points
                pointBackgroundColor: "rgba(255, 99, 132, 0.5)", // Light red with transparency for point
                pointRadius: 1, 
                tension: 1,  // Smooth curve
                yAxisID: "y",
            },
            {
                label: "Temperatura konzerve (0-120°C)",
                data: data.tempk,
                fill: false,
                borderColor: "rgba(204, 71, 71, 1)",  // Slightly lighter red than before
                backgroundColor: "rgba(204, 71, 71, 0.25)", // Less intense red with transparency
                borderDash: [10, 10],
                pointStyle: "circle",
                borderWidth: 2,
                pointBorderColor: "rgba(204, 71, 71, 1)", // Slightly lighter red for points
                pointBackgroundColor: "rgba(204, 71, 71, 0.3)", // Softer, more transparent red for points
                pointRadius: 1,
                tension: 0.3,
                yAxisID: "y",
            },
            {
                label: "Tlak (0-7)",
                data: data.pressure,
                fill: false,
                borderColor: "rgba(153, 102, 255, 1)",
                backgroundColor: "rgba(153, 102, 255, 0.23)",
                borderDash: [1],
                borderWidth: 2,
                pointStyle: "circle",
                pointBorderColor: "rgba(153, 102, 255, 1)",
                pointBackgroundColor: "#9966ff2a",
                pointRadius: 1, // Adjusted for better contrast
                tension: 0,
                yAxisID: "y2",
            },
            {
                label: "Fr (0-7)",
                data: data.fr,
                fill: false,
                borderColor: "rgba(54, 162, 235, 1)",  // Lighter blue (Fr)
                backgroundColor: "rgba(54, 162, 235, 0.3)",  // Light blue with transparency
                borderDash: [2, 2],
                borderWidth: 2,
                pointStyle: "circle",
                pointBorderColor: "rgba(54, 162, 235, 1)",  // Lighter blue for points
                pointBackgroundColor: "rgba(54, 162, 235, 0.4)", // Lighter blue for point background
                pointRadius: 1,
                tension: 0.2,
                yAxisID: "y2",
            },
            {
                label: "sumFr (0-7)",
                data: data.sumfr,
                fill: false,
                borderColor: "rgba(30, 144, 255, 1)",  // Darker blue (sumFr)
                backgroundColor: "rgba(30, 144, 255, 0.4)",  // Darker blue with transparency
                borderDash: [],
                borderWidth: 1,
                pointStyle: "circle",
                pointBorderColor: "rgba(30, 144, 255, 1)",  // Darker blue for points
                pointBackgroundColor: "rgba(30, 144, 255, 0.5)", // Darker blue for point background
                pointRadius: 1,  // Larger star points
                tension: 0.5,
                yAxisID: "y2",
            }
        ],        
    });
};

// datasets: [
//     {
//         label: "Temperatura vode (0-120°C)",
//         data: data.temp,
//         fill: false,
//         borderColor: "#000000",  // Black
//         backgroundColor: "#000000",  // Black
//         borderDash: [10, 10],
//         borderWidth: 2,
//         pointBorderColor: "#000000", // Black
//         pointBackgroundColor: "#666666", // Dark gray for point
//         pointRadius: 8, 
//         tension: 1,  // Smooth curve
//         yAxisID: "y",
//     },
//     {
//         label: "Temperatura konzerve (0-120°C)",
//         data: data.tempk,
//         fill: false,
//         borderColor: "#333333",  // Dark gray
//         backgroundColor: "#333333", // Dark gray
//         borderDash: [10, 10],
//         borderWidth: 3,
//         pointBorderColor: "#333333", // Dark gray
//         pointBackgroundColor: "#999999", // Lighter gray for points
//         pointRadius: 8,
//         tension: 0.3,
//         yAxisID: "y",
//     },
//     {
//         label: "Tlak (0-7)",
//         data: data.pressure,
//         fill: false,
//         borderColor: "#666666", // Medium gray
//         backgroundColor: "#666666", // Medium gray
//         borderDash: [10, 10],
//         borderWidth: 4,
//         pointBorderColor: "#666666", // Medium gray
//         pointBackgroundColor: "#cccccc", // Light gray for points
//         pointRadius: 10, // Adjusted for better contrast
//         tension: 0,
//         yAxisID: "y2",
//     },
//     {
//         label: "Fr (0-7)",
//         data: data.fr,
//         fill: false,
//         borderColor: "#999999",  // Light gray
//         backgroundColor: "#999999",  // Light gray
//         borderDash: [2, 2],
//         borderWidth: 3,
//         pointBorderColor: "#999999",  // Light gray
//         pointBackgroundColor: "#e0e0e0", // Very light gray for point background
//         pointRadius: 8,
//         tension: 0.2,
//         yAxisID: "y2",
//     },
//     {
//         label: "sumFr (0-7)",
//         data: data.sumfr,
//         fill: false,
//         borderColor: "#cccccc",  // Lighter gray
//         backgroundColor: "#cccccc",  // Lighter gray
//         borderDash: [],
//         borderWidth: 2,
//         pointBorderColor: "#cccccc",  // Lighter gray for points
//         pointBackgroundColor: "#f0f0f0", // Very light gray for point background
//         pointRadius: 9,  // Larger star points
//         tension: 0.5,
//         yAxisID: "y2",
//     }
// ],