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
        // ==== REPLACE download with print ====
        // 4. Convert to Blob and create URL
        const pdfBlob = pdf.output("blob");
        const blobUrl = URL.createObjectURL(pdfBlob);

        // 5. Inject hidden iframe
        const iframe = document.createElement("iframe");
        iframe.style.visibility = "hidden";
        iframe.style.position = "fixed";
        iframe.style.right = "0";
        iframe.style.bottom = "0";
        iframe.src = blobUrl;
        document.body.appendChild(iframe);

        // 6. Print once loaded
        iframe.onload = () => {
            // Give the browser a moment to render
            setTimeout(() => {
                iframe.contentWindow?.focus();
                iframe.contentWindow?.print();
            }, 250);

            setTimeout(() => {
                // Clean up
                URL.revokeObjectURL(blobUrl);
                document.body.removeChild(iframe);
            }, 10000);

        };

        chartInstance.options = chartOptions;
        chartInstance.update();
    } else {
        alert("Chart instance or options not found.");
    }
};