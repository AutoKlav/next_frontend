import { ChartOptions } from "chart.js";

/**
 * Updates the chart options with the specified text color and grid color. Must be separated
 * because of dark theme app and white paper prepared for print
 * @param textColor The color of the text in the chart.
 * @param gridColor The color of the grid lines in the chart.
 * @param chartInfo The title and subtitle of the chart about the process.
 * @returns The updated chart options.
 */
export const updateChartOptions = (
  textColor: string, 
  gridColor: string, 
  chartInfo: { title: string, subtitle: string }
): ChartOptions<"line"> => ({
  maintainAspectRatio: true,
  aspectRatio: 1.6,
  interaction: {
    mode: "index",
    intersect: true,
    axis: "x", // Enables the vertical hover line
  },
  plugins: {
    title: {
      display: true,
      text: chartInfo.title,
      font: {
        size: 24,
      },
      color: textColor,
      padding: {
        bottom: 15, // Padding below the title
      },
      align: "center", // Alignment: 'start', 'center', 'end'
    },
    subtitle: {
      display: true,
      text: chartInfo.subtitle,
      font: {
        size: 20,
      },
      color: textColor,
      padding: { bottom: 15 },
      align: "center", // 'start', 'center', 'end'
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
      mode: "index", // Show tooltip for all datasets at the same index
      callbacks: {
        label: (tooltipItem: any) => {
          return `${tooltipItem.dataset.label} =  ${tooltipItem.raw}`;
        },
      },
      titleFont: {
        size: 25, // Increase title font size
      },
      bodyFont: {
        size: 20, // Increase body font size
      },
      footerFont: {
        size: 18, // Footer font size adjustment
      },
      padding: {
        top: 15,    // Space above tooltip content
        left: 15,   // Space to the left of tooltip content
        right: 15,  // Space to the right of tooltip content
        bottom: 15, // Space below tooltip content
      },
      bodySpacing: 17, // Space between tooltip body items
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
