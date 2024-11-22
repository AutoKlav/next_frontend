"use client";

import React, { useState, useEffect, useRef } from "react";
import { Chart } from "primereact/chart";
import jsPDF from "jspdf";
import { getCurrentDateTime } from "@/utils/dateUtil";
import { Button } from "primereact/button";
import { ChartOptions } from "chart.js";

const MultiYAxisChart = () => {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState<ChartOptions<"line"> | undefined>(undefined);
    const chartRef = useRef<any>(null);

    useEffect(() => {
        const updateChartOptions = (textColor: string, gridColor: string): ChartOptions<"line"> => ({
            maintainAspectRatio: true,
            aspectRatio: 1.6, // Wider graph
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
                    type: "linear",
                    position: "left",
                    ticks: { color: textColor },
                    grid: { color: gridColor },
                },
                y1: {
                    type: "linear",
                    position: "left",
                    offset: true,
                    ticks: { color: textColor },
                    grid: { drawOnChartArea: false },
                },
                y2: {
                    type: "linear",
                    position: "right",
                    ticks: { color: textColor },
                    grid: { color: gridColor, drawOnChartArea: false },
                },
                y3: {
                    type: "linear",
                    position: "right",
                    offset: true,
                    ticks: { color: textColor },
                    grid: { drawOnChartArea: false },
                },
                y4: {
                    type: "linear",
                    position: "right",
                    offset: true,
                    ticks: { color: textColor },
                    grid: { drawOnChartArea: false },
                },
            },
        });

        const data = {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
            datasets: [
                {
                    label: "First Dataset",
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: "rgba(75, 192, 192, 0.6)", // Soft teal
                    borderDash: [5, 5], // Dashed line
                    borderWidth: 2,
                    pointStyle: "circle",
                    tension: 0.4,
                    yAxisID: "y",
                },
                {
                    label: "Second Dataset",
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    borderColor: "rgba(153, 102, 255, 0.6)", // Soft purple
                    borderDash: [1, 5], // Dotted line
                    borderWidth: 2,
                    pointStyle: "rect",
                    tension: 0.4,
                    yAxisID: "y1",
                },
                {
                    label: "Third Dataset",
                    data: [12, 42, 25, 36, 72, 50, 65],
                    fill: false,
                    borderColor: "rgba(255, 159, 64, 0.6)", // Soft orange
                    borderDash: [10, 5, 1, 5], // Dash-dot line
                    borderWidth: 2,
                    pointStyle: "triangle",
                    tension: 0.4,
                    yAxisID: "y2",
                },
                {
                    label: "Fourth Dataset",
                    data: [45, 67, 78, 88, 99, 100, 110],
                    fill: false,
                    borderColor: "rgba(54, 162, 235, 0.6)", // Soft blue
                    borderDash: [2, 2], // Dotted line
                    borderWidth: 2,
                    pointStyle: "star",
                    tension: 0.4,
                    yAxisID: "y3",
                },
                {
                    label: "Fifth Dataset",
                    data: [23, 34, 45, 56, 67, 78, 89],
                    fill: false,
                    borderColor: "rgba(255, 99, 132, 0.6)", // Soft red
                    borderDash: [3, 3], // Dashed line
                    borderWidth: 2,
                    pointStyle: "cross",
                    tension: 0.4,
                    yAxisID: "y4",
                },
            ],
        };

        setChartData(data);
        setChartOptions(updateChartOptions("white", "white")); // Initial white theme
    }, []);

    const handleExportToPDF = async () => {
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
                        grid: { drawOnChartArea: false },
                    },
                    y2: {
                        ...chartOptions.scales?.y2,
                        ticks: { color: "black" },
                        grid: { color: "black", drawOnChartArea: false },
                    },
                    y3: {
                        ...chartOptions.scales?.y3,
                        ticks: { color: "black" },
                        grid: { drawOnChartArea: false },
                    },
                    y4: {
                        ...chartOptions.scales?.y4,
                        ticks: { color: "black" },
                        grid: { drawOnChartArea: false },
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
            // (10, 40, 297, 210)  is the size of the image on the PDF
            // x axis, y axis, width, height
            pdf.save(`${getCurrentDateTime()}.pdf`);

            chartInstance.options = chartOptions;
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

export default MultiYAxisChart;
