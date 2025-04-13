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
        transformedData.pressure?.push(log.sensorvalues.pressure);
    });

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
              yAxisID: "y",
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




