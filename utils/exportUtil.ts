import { ChartOptions } from "chart.js";
import { getCurrentDateTime } from "./dateUtil";
import jsPDF from "jspdf";

export const handleExportToPDF = async (chartRef: React.RefObject<any>, chartOptions: ChartOptions<"line">) => {
    const chartInstance = chartRef.current?.getChart();
    if (chartInstance && chartOptions) {
        const updatedOptions: ChartOptions<"line"> = {
            ...chartOptions,
            plugins: {
                ...chartOptions.plugins,
                legend: {
                    labels: { color: "black" },
                },
            },
            scales: {
                x: {
                    ...chartOptions.scales?.x,
                    ticks: { color: "black" },
                    grid: { color: "black" },
                },
                y: {
                    ...chartOptions.scales?.y,
                    ticks: { color: "black" },
                    grid: { color: "black" },
                },
                y1: {
                    ...chartOptions.scales?.y1,
                    ticks: { color: "black" },
                    grid: { color: "black", drawOnChartArea: true },                        
                },
                y2: {
                    ...chartOptions.scales?.y2,
                    ticks: { color: "black" },
                    grid: { color: "black", drawOnChartArea: true },
                },
                y3: {
                    ...chartOptions.scales?.y3,
                    ticks: { color: "black" },
                    grid: { color:"black", drawOnChartArea: true },
                },
                y4: {
                    ...chartOptions.scales?.y4,
                    ticks: { color: "black" },
                    grid: { color:"black", drawOnChartArea: true },
                },
            },
        };

        chartInstance.options = updatedOptions;
        chartInstance.update();

        await new Promise((resolve) => requestAnimationFrame(resolve));

        const imageData = chartInstance.toBase64Image("image/png", 1.0);
        const pdf = new jsPDF({
            orientation: "landscape",
            unit: "mm",
            format: "a4",
        });

        pdf.addImage(imageData, "PNG", 7, 5, 285, 200); // Cover the rotated landscape A4 page 
        pdf.save(`${getCurrentDateTime()}.pdf`);

        chartInstance.options = chartOptions;
        chartInstance.update();
    } else {
        alert("Chart instance or options not found.");
    }
};