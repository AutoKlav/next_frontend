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
                    label: "Sales (2023)",
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: "rgba(75, 192, 192, 1)", // Teal
                    backgroundColor: "rgba(75, 192, 192, 0.3)", // Soft fill
                    borderDash: [5, 5], // Dashed line
                    borderWidth: 2,
                    pointStyle: "circle",
                    pointBorderColor: "rgba(75, 192, 192, 1)",
                    pointBackgroundColor: "rgba(255, 255, 255, 1)", // White fill
                    pointRadius: 5,
                    tension: 0.4,
                    yAxisID: "y",
                },
                {
                    label: "Revenue (2023)",
                    data: [90, 85, 75, 95, 105, 110, 115],
                    fill: false,
                    borderColor: "rgba(255, 99, 132, 1)", // Red
                    backgroundColor: "rgba(255, 99, 132, 0.3)", // Soft fill
                    borderDash: [10, 5], // Long dash
                    borderWidth: 2,
                    pointStyle: "triangle",
                    pointBorderColor: "rgba(255, 99, 132, 1)",
                    pointBackgroundColor: "rgba(255, 255, 255, 1)", // White fill
                    pointRadius: 6,
                    tension: 0.3,
                    yAxisID: "y1",
                },
                {
                    label: "Expenses",
                    data: [45, 50, 55, 50, 60, 65, 70],
                    fill: false,
                    borderColor: "rgba(54, 162, 235, 1)", // Blue
                    backgroundColor: "rgba(54, 162, 235, 0.3)", // Soft fill
                    borderDash: [2, 2], // Dotted line
                    borderWidth: 3,
                    pointStyle: "rect",
                    pointBorderColor: "rgba(54, 162, 235, 1)",
                    pointBackgroundColor: "rgba(255, 255, 255, 1)", // White fill
                    pointRadius: 4,
                    tension: 0.2,
                    yAxisID: "y2",
                },
                {
                    label: "Profit",
                    data: [10, 15, 20, 25, 30, 35, 40],
                    fill: false,
                    borderColor: "rgba(255, 205, 86, 1)", // Yellow
                    backgroundColor: "rgba(255, 205, 86, 0.4)", // Transparent fill
                    borderDash: [], // Solid line
                    borderWidth: 2,
                    pointStyle: "star",
                    pointBorderColor: "rgba(255, 205, 86, 1)",
                    pointBackgroundColor: "rgba(255, 255, 255, 1)", // White fill
                    pointRadius: 5,
                    tension: 0.5,
                    yAxisID: "y3",
                },
                {
                    label: "Growth Rate",
                    data: [5, 10, 15, 20, 25, 30, 35],
                    fill: false,
                    borderColor: "rgba(153, 102, 255, 1)", // Purple
                    backgroundColor: "rgba(153, 102, 255, 0.3)", // Soft fill
                    borderDash: [5, 10, 2, 10], // Dash-dot pattern
                    borderWidth: 2,
                    pointStyle: "crossRot",
                    pointBorderColor: "rgba(153, 102, 255, 1)",
                    pointBackgroundColor: "rgba(255, 255, 255, 1)", // White fill
                    pointRadius: 6,
                    tension: 0.1,
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
