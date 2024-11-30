import { ChartOptions } from "chart.js";
import { getCurrentDateTime } from "./dateUtil";
import jsPDF from "jspdf";
import { updateChartOptions } from "./chartOptionsUtil";

export const handleExportToPDF = async (chartRef: React.RefObject<any>, chartOptions: ChartOptions<"line">) => {
    const chartInstance = chartRef.current?.getChart();
    if (chartInstance && chartOptions) {        

        chartInstance.options = updateChartOptions("black", "black");
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