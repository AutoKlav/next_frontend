import { ChartOptions } from "chart.js";
import { getCurrentDateTime } from "./dateUtil";
import jsPDF from "jspdf";
import { TitleInfo, updateChartOptions } from "./chartOptionsUtil";

export const handleExportToPDF = async (chartRef: React.RefObject<any>, chartOptions: ChartOptions<"line">, chartInfo: TitleInfo) => {
    const chartInstance = chartRef.current?.getChart();
    if (chartInstance && chartOptions) {        

        chartInstance.options = updateChartOptions("black", "black", chartInfo);
        chartInstance.update();

        await new Promise((resolve) => requestAnimationFrame(resolve));

        const imageData = chartInstance.toBase64Image("image/png", 1.0);
        const pdf = new jsPDF({
            orientation: "landscape",
            unit: "mm",
            format: "a4",
        });

        pdf.addImage(imageData, "PNG", 7, 5, 285, 200); // Cover the rotated landscape A4 page 
        // pdf.save(`${getCurrentDateTime()}.pdf`);
        
        // Auto print graph
        pdf.autoPrint();
        const blobUrl = pdf.output("bloburl");
        
        const iframe = document.createElement("iframe");
        iframe.style.display = "none";
	iframe.src = blobUrl;
        iframe.onload = () => {
                iframe.contextWindow?.focus();
                iframe.contextWindow?.print();

		setTimeout(() => {
                        document.body.removeChild(iframe);
                        URL.revokeObjectURL(blobUrl);
                }, 500);
        };

	console.log("Test");

        chartInstance.options = chartOptions;
        chartInstance.update();
    } else {
        alert("Chart instance or options not found.");
    }
};