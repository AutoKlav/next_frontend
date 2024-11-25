"use client";

import React, { useState, useEffect, useRef } from "react";
import { Chart } from "primereact/chart";
import jsPDF from "jspdf";
import { getCurrentDateTime } from "@/utils/dateUtil";
import { Button } from "primereact/button";
import { ChartOptions } from "chart.js";
import { handleExportToPDF } from "@/utils/exportUtil";

const MultiYAxisChart = () => {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState<ChartOptions<"line">>({});
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
                    grid: {  color: gridColor, drawOnChartArea: true },
                },
                y1: {
                    type: "linear",
                    position: "left",
                    offset: true,
                    ticks: { color: textColor },
                    grid: {  color: gridColor, drawOnChartArea: true },
                },
                y2: {
                    type: "linear",
                    position: "right",
                    ticks: { color: textColor },
                    grid: { color: gridColor, drawOnChartArea: true },
                },
                y3: {
                    type: "linear",
                    position: "right",
                    offset: true,
                    ticks: { color: textColor },
                    grid: { color: gridColor, drawOnChartArea: true },
                },
                y4: {
                    type: "linear",
                    position: "right",
                    offset: true,
                    ticks: { color: textColor },
                    grid: { color: gridColor, drawOnChartArea: true },
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
                    borderDash: [10, 10], // Dashed line
                    borderWidth: 2,
                    pointStyle: "circle",
                    pointBorderColor: "rgba(75, 192, 192, 1)",
                    pointBackgroundColor: "rgba(255, 255, 255, 1)", // White fill
                    pointRadius: 5,
                    tension: 0.4,
                    yAxisID: "y1",
                },
                {
                    label: "Revenue (2023)",
                    data: [90, 85, 75, 95, 105, 110, 115],
                    fill: false,
                    borderColor: "rgba(255, 99, 132, 1)", // Red
                    backgroundColor: "rgba(255, 99, 132, 0.3)", // Soft fill
                    borderDash: [25, 5], // Long dash
                    borderWidth: 2,
                    pointStyle: "triangle",
                    pointBorderColor: "rgba(255, 99, 132, 1)",
                    pointBackgroundColor: "rgba(255, 255, 255, 1)", // White fill
                    pointRadius: 6,
                    tension: 0.3,
                    yAxisID: "y",
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
                    data: [5,5, 25, 20, 65, 30, 35],
                    fill: false,
                    borderColor: "rgba(153, 102, 255, 1)", // Purple
                    backgroundColor: "rgba(153, 102, 255, 0.3)", // Soft fill
                    borderDash: [5, 10, 2, 10], // Dash-dot pattern
                    borderWidth: 4,
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

    

    return (
        <div className="card">
            <Chart ref={chartRef} type="line" data={chartData} options={chartOptions} />
            <Button label="Export to PDF" onClick={() => handleExportToPDF(chartRef, chartOptions)} className="p-button-info mt-5" />
        </div>
    );
};

export default MultiYAxisChart;
