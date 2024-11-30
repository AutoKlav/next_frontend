import { ChartOptions } from "chart.js";

/**
 * Updates the chart options with the specified text color and grid color. Must be separated
 * because of dark theme app and white paper prepared for print
 * @param textColor The color of the text in the chart.
 * @param gridColor The color of the grid lines in the chart.
 * @returns The updated chart options.
 */
export const updateChartOptions = (textColor: string, gridColor: string): ChartOptions<"line"> => ({
    maintainAspectRatio: true,
    aspectRatio: 1.6,
    interaction: {
        mode: 'index',  
        intersect: true,  
        axis: 'x',  // Enables the vertical hover line
      }, 
    plugins: {
      title: {
        display: true,
        text: "Multi-Y-Axis Chart Analysis",
        font: {
          size: 24,
        },
        color: textColor,
        padding: { top: 20, bottom: 20 },
      },
      subtitle: {
        display: true,
        text: "An analysis of process variables over time",
        font: {
          size: 16,
        },
        color: textColor,
        padding: { bottom: 10 },
      },
      legend: {
        display: true,
        position: "bottom", // Legend at the bottom
        labels: {
          usePointStyle: true,
          font: {
            size: 17,
          },
          color: textColor,
        },
      },
      tooltip: {
        mode: 'index',  // Show tooltip for all datasets at the same index
        //intersect: true,  // Tooltip displays even if the cursor isn't directly on a point
        callbacks: {
          label: (tooltipItem: any) => {
            return `${tooltipItem.dataset.label} =  ${tooltipItem.raw}`;
          },
        },
        titleFont: {
          size: 25,  // Increase title font size
        },
        bodyFont: {
          size: 20,  // Increase body font size
        },
        footerFont: {
          size: 18,  // Footer font size adjustment
        },                
    },                        
    },
    scales: {
      x: {
        ticks: { color: textColor, font: { size: 16 } },
        grid: { color: gridColor },
      },
      y: {
        ticks: { color: textColor, stepSize: 10 },
        grid: { color: gridColor },
        min: 0,
      },
      y2: {
        position: "right",
        ticks: { color: textColor, stepSize: 0.5 },
        grid: { drawOnChartArea: false },
        min: 0,
      },
    },
});