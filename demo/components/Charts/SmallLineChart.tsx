"use client";

import React, { useState, useEffect, useRef } from "react";
import { Chart } from "primereact/chart";
import jsPDF from "jspdf";
import { getCurrentDateTime } from "@/utils/dateUtil";
import { Button } from "primereact/button";
import { ChartOptions } from "chart.js";

const SmallLineChart = () => {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState<ChartOptions<"line"> | undefined>(undefined);    
    const chartRef = useRef<any>(null);

    useEffect(() => {
        const updateChartOptions = (textColor: string, gridColor: string): ChartOptions<"line"> => ({
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: textColor,
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: textColor,
                    },
                    grid: {
                        color: gridColor,
                    },
                },
                y: {
                    ticks: {
                        color: textColor,
                    },
                    grid: {
                        color: gridColor,
                    },
                },
            },
        });

        const data = {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [
                {
                    label: "Sales",
                    data: [12, 19, 3, 5, 2, 3],
                    fill: false,
                    borderColor: "#42A5F5",
                    tension: 0.4,
                },
            ],
        };

        setChartData(data);
        setChartOptions(updateChartOptions("white", "white")); // Initial white theme
    }, []);

    const handleExportToPDF = async () => {
        const chartInstance = chartRef.current?.getChart(); // Access the Chart.js instance
        if (chartInstance && chartOptions) {
            // Temporarily update chart options to black for export
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
                },
            };

            chartInstance.options = updatedOptions; // Apply temporary options
            chartInstance.update(); // Trigger re-render
            
            // Wait for one animation frame to ensure changes are applied
            await new Promise((resolve) => requestAnimationFrame(resolve));

            // Export chart as image
            const imageData = chartInstance.toBase64Image("image/png", 1.0);
            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "mm",
                format: "a4",
            });

            pdf.addImage(imageData, "PNG", 0, 0, 297, 210);
            pdf.save(`${getCurrentDateTime()}.pdf`);

            // Revert the chart options back to white theme
            const revertedOptions: ChartOptions<"line"> = {
                ...chartOptions,
                plugins: {
                    ...chartOptions.plugins,
                    legend: {
                        labels: { color: "white" },
                    },
                },
                scales: {
                    x: {
                        ...chartOptions.scales?.x,
                        ticks: { color: "white" },
                        grid: { color: "white" },
                    },
                    y: {
                        ...chartOptions.scales?.y,
                        ticks: { color: "white" },
                        grid: { color: "white" },
                    },
                },
            };

            chartInstance.options = revertedOptions; // Reapply original options
            chartInstance.update();
        } else {
            alert("Chart instance or options not found.");
        }
    };

    return (
        <div className="card">
            <Chart ref={chartRef} type="line" data={chartData} options={chartOptions} />
            <Button label="Export to PDF" onClick={handleExportToPDF} className="p-button-info mt-5" />
        </div>
    );
};

export default SmallLineChart;
