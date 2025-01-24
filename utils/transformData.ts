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
// Define a constant to control which sensors to include
const ENABLED_SENSORS = {
    temp: false,
    tempk: true, // TODO value not displayed, coolingextension not displayed
    pressure: false,
    expansiontemp: false,
    heatertemp: false,
    steampressure: false,
    tanktemp: false,
    tankwaterlevel: false,
  };
  
  export const modularDataTransformation = (data: { processlogsList: StateMachineValues[] }): TransformedData => {
    const transformedData: TransformedData = {
      timestamp: [],
      temp: ENABLED_SENSORS.temp ? [] : undefined,
      tempk: ENABLED_SENSORS.tempk ? [] : undefined,
      pressure: ENABLED_SENSORS.pressure ? [] : undefined,
      expansiontemp: ENABLED_SENSORS.expansiontemp ? [] : undefined,
      heatertemp: ENABLED_SENSORS.heatertemp ? [] : undefined,
      steampressure: ENABLED_SENSORS.steampressure ? [] : undefined,
      tanktemp: ENABLED_SENSORS.tanktemp ? [] : undefined,
      tankwaterlevel: ENABLED_SENSORS.tankwaterlevel ? [] : undefined,
    };
  
    data.processlogsList.forEach((log) => {
      transformedData.timestamp?.push(log.timestamp);
  
      if (ENABLED_SENSORS.temp && transformedData.temp) {
        transformedData.temp?.push(log.sensorvalues.temp);
      }
      if (ENABLED_SENSORS.tempk && transformedData.tempk) {
        transformedData.tempk?.push(log.sensorvalues.tempk);
      }
      if (ENABLED_SENSORS.pressure && transformedData.pressure) {
        transformedData.pressure?.push(log.sensorvalues.pressure);
      }
      if (ENABLED_SENSORS.expansiontemp && transformedData.expansiontemp) {
        transformedData.expansiontemp?.push(log.sensorvalues.expansiontemp);
      }
      if (ENABLED_SENSORS.heatertemp && transformedData.heatertemp) {
        transformedData.heatertemp?.push(log.sensorvalues.heatertemp);
      }
      if (ENABLED_SENSORS.steampressure && transformedData.steampressure) {
        transformedData.steampressure?.push(log.sensorvalues.steampressure);
      }
      if (ENABLED_SENSORS.tanktemp && transformedData.tanktemp) {
        transformedData.tanktemp?.push(log.sensorvalues.tanktemp);
      }
      if (ENABLED_SENSORS.tankwaterlevel && transformedData.tankwaterlevel) {
        transformedData.tankwaterlevel?.push(log.sensorvalues.tankwaterlevel);
      }
    });
  
    console.log("Transformed data", transformedData);
    return transformedData;
  };
  

/**
 * Updates the chart data with the provided transformed data.
 * @param data - The transformed data to update the chart with.
 * @param setChartData - The function to set the chart data.
 */

export const updateChartData = (data: TransformedData, setChartData: (data: any) => void) => {
    const datasets = [];
  
    if (ENABLED_SENSORS.temp && data.temp) {
      datasets.push({
        label: "Temperatura vode",
        data: data.temp,
        fill: false,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.3)",
        borderWidth: 5,
        pointRadius: 0,
        tension: 1,
        yAxisID: "y",
      });
    }
  
    if (ENABLED_SENSORS.tempk && data.tempk) {
      datasets.push({
        label: "Temperatura konzerve",
        data: data.tempk,
        fill: false,
        borderColor: "rgba(204, 71, 71, 1)",
        backgroundColor: "rgba(204, 71, 71, 0.25)",
        borderWidth: 4,
        pointRadius: 0,
        tension: 1,
        yAxisID: "y",
      });
    }
  
    if (ENABLED_SENSORS.pressure && data.pressure) {
      datasets.push({
        label: "Tlak",
        data: data.pressure,
        fill: false,
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.23)",
        borderWidth: 4,
        pointRadius: 0,
        tension: 1,
        yAxisID: "y2",
      });
    }
  
    if (ENABLED_SENSORS.expansiontemp && data.expansiontemp) {
      datasets.push({
        label: "Temperatura ekspanzije",
        data: data.expansiontemp,
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.3)",
        borderWidth: 4,
        pointRadius: 0,
        tension: 1,
        yAxisID: "y",
      });
    }
  
    if (ENABLED_SENSORS.heatertemp && data.heatertemp) {
      datasets.push({
        label: "Temperatura grijača",
        data: data.heatertemp,
        fill: false,
        borderColor: "rgba(255, 206, 86, 1)",
        backgroundColor: "rgba(255, 206, 86, 0.3)",
        borderWidth: 4,
        pointRadius: 0,
        tension: 1,
        yAxisID: "y",
      });
    }
  
    if (ENABLED_SENSORS.steampressure && data.steampressure) {
      datasets.push({
        label: "Tlak pare",
        data: data.steampressure,
        fill: false,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.3)",
        borderWidth: 4,
        pointRadius: 0,
        tension: 1,
        yAxisID: "y2",
      });
    }
  
    if (ENABLED_SENSORS.tanktemp && data.tanktemp) {
      datasets.push({
        label: "Temperatura spremnika",
        data: data.tanktemp,
        fill: false,
        borderColor: "rgba(255, 159, 64, 1)",
        backgroundColor: "rgba(255, 159, 64, 0.3)",
        borderWidth: 4,
        pointRadius: 0,
        tension: 1,
        yAxisID: "y",
      });
    }
  
    if (ENABLED_SENSORS.tankwaterlevel && data.tankwaterlevel) {
      datasets.push({
        label: "Razina vode u spremniku",
        data: data.tankwaterlevel,
        fill: false,
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.3)",
        borderWidth: 4,
        pointRadius: 0,
        tension: 1,
        yAxisID: "y2",
      });
    }
  
    setChartData({
      labels: data.timestamp,
      datasets,
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
