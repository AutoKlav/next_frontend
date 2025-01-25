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
    temp: true,
    tempk: true, // TODO value not displayed, coolingextension not displayed
    pressure: false,
    expansiontemp: true,
    heatertemp: false,
    steampressure: false,
    tanktemp: true,
    tankwaterlevel: true,
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




