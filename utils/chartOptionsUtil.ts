import { ChartOptions } from "chart.js";
import { formatDateTime, secondsToHms } from "./dateUtil";
import { Bacteria, ProcessInfoGraphView } from "@/types/grpc";

export interface TitleInfo {
  id: number;
  title: string;
  subtitle: string;
}
/**
 * Updates the chart options with the specified text color and grid color. Must be separated
 * because of dark theme app and white paper prepared for print
 * @param textColor The color of the text in the chart.
 * @param gridColor The color of the grid lines in the chart.
 * @param titleInfo The title and subtitle of the chart about the process.
 * @returns The updated chart options.
 */
export const updateChartOptions = (
  textColor: string,
  gridColor: string,
  titleInfo: TitleInfo,
  tickCount: number = 0,
  hideSecondaryAxis: boolean = false
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
      text: titleInfo.title,
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
      text: titleInfo.subtitle,
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
      offset: false,
      ticks: { color: textColor, font: { size: 16 } },
      grid: { color: gridColor },
    },
    x2: {
      type: "linear",
      position: "top",
      offset: false,
      min: 0,
      max: Math.max(tickCount - 1, 0),
      ticks: {
        color: textColor,
        font: { size: 16 },
        stepSize: 1,    // one tick per line so every line is numbered at low point counts
        precision: 0,   // integer fallback if afterUpdate ever doesn't run
        autoSkip: true, // thin labels for long runs
        maxRotation: 0,
      },
      grid: { drawOnChartArea: false },
      // The linear axis pins value k to the pixel of line k, so every tick stays aligned
      // on its data line (this is what fixed the "numbers between lines" at low counts).
      // But after autoSkip the survivors would otherwise render their *value* (0, 3, 6…),
      // i.e. the data-point/minute index. afterUpdate runs after autoSkip, so scale.ticks
      // holds only the visible survivors — relabel them sequentially (0, 1, 2 …) so the
      // axis counts the shown gridlines instead of the underlying values.
      afterUpdate: (scale: any) => {
        scale.ticks.forEach((tick: { label?: string }, i: number) => {
          tick.label = String(i);
        });
      },
    },
    y: {
      ticks: { color: textColor, stepSize: 5 },
      grid: { color: gridColor },
      min: 0,
      max: 130,
    },
    y2: {
      display: !hideSecondaryAxis,
      position: "right",
      ticks: { color: textColor, stepSize: 0.5 },
      grid: { drawOnChartArea: false },
    },
  },
});

export type ChartInfo = {
  id: number;
  title: string;
  subtitle: string;
};


/**
 * Retrieves chart information based on the provided process data.
 *
 * @param process - The process information to extract data from. It can be null or undefined.
 * @param reduceBacteriaInfo - A boolean flag to determine whether to include detailed bacteria information. Defaults to false.
 * @returns An object containing the chart information, including id, title, and subtitle.
 *
 * @example
 * const chartInfo = getChartInfo(processData, true);
 * console.log(chartInfo.title);
 */
export const getChartInfo = (process: ProcessInfoGraphView | null | undefined, reduceBacteriaInfo: boolean = false): ChartInfo => {
  if (!process) {
    return { id: -1, title: "Nepoznati proces", subtitle: "Nepoznati proces" };
  }

  const formattedDate = formatDateTime(process.processstart ?? "");
  const formattedLength = secondsToHms(Number(process.processlength));
  let processEndDate;

  if (process.processstart && !isNaN(Number(process.processlength))) {
    const startDate = new Date(process.processstart);
    
    const processEndTimestamp = startDate.getTime() + (Number(process.processlength) * 1000);
    processEndDate = formatDateTime(new Date(processEndTimestamp).toISOString());
  }

  return {
    id: process.id,
    title: [
      `Ime: ${process.productname ?? "[]"}`,
      `Količina: ${process.productquantity ?? "[]"}`,
      `Početak: ${formattedDate ?? "[]"}`,
      `Trajanje: ${formattedLength ?? "[]"}`,
      `Kraj: ${processEndDate ?? "[]"}`,
    ].join(" | "),
    subtitle: [
      `Bakterija: ${process.bacteria.name ?? "[Ime bakterije]"}`,
      ...(reduceBacteriaInfo
        ? []
        : [
          `Opis: ${process.bacteria.description ?? "[Opis]"}`,
          `Broj sarže: ${process.batchlto ?? "[LTO01]"}`,
        ]),
      `D₀(min): ${process.bacteria.d0 ?? "[0]"}`,
      `z₀= ${process.bacteria.z ?? "[1]"}`,
    ].join(" | "),
  };
};