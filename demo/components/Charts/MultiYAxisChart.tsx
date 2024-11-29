"use client";

import React, { useState, useEffect, useRef } from "react";
import { Chart } from "primereact/chart";
import { Button } from "primereact/button";
import { ChartOptions } from "chart.js";
import { handleExportToPDF } from "@/utils/exportUtil";
import { useMutation } from "@tanstack/react-query";
import { getProcessLogsAction } from "@/app/(main)/api/actions";

interface TransformedData {
    timestamp: string[];
    temp: number[];
    tempk: number[];
    sumfr: number[];
    fr: number[];
    pressure: number[];
}

const MultiYAxisChart = () => {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState<ChartOptions<"line">>({});
    const chartRef = useRef<any>(null);

    const { isLoading: isLogLoading, mutate: getProcessLogMutation } = useMutation(getProcessLogsAction, {
        onSuccess: ({ data }) => {
            
            const transformedData: TransformedData = {
                timestamp: [],
                temp: [],
                tempk: [],
                sumfr: [],
                fr: [],
                pressure: [],
            };

            data.processlogsList.forEach((log) => {
                transformedData.timestamp.push(log.timestamp);
                transformedData.temp.push(log.temp);
                transformedData.tempk.push(log.tempk);
                transformedData.sumfr.push(log.sumfr);
                transformedData.fr.push(log.fr);
                transformedData.pressure.push(log.pressure);
            });

            updateChartData(transformedData);
        },
    });

    const updateChartData = (data: TransformedData) => {
        setChartData({
            labels: data.timestamp,
            datasets: [
                {
                    label: "Temperatura vode (0-120°C)",
                    data: data.temp,
                    fill: false,
                    borderColor: "rgba(75, 192, 192, 1)",
                    backgroundColor: "rgba(75, 192, 192, 0.3)",
                    borderDash: [10, 10],
                    borderWidth: 5,
                    pointStyle: "line",
                    pointBorderColor: "rgba(75, 192, 192, 1)",
                    pointBackgroundColor: "rgba(255, 255, 255, 1)",
                    pointRadius: 8, // Increased for better visibility
                    tension: 0.4,
                    yAxisID: "y",
                },
                {
                    label: "Temperatura konzerve (0-120°C)",
                    data: data.tempk,
                    fill: false,
                    borderColor: "rgba(255, 99, 132, 1)",
                    backgroundColor: "rgba(255, 99, 132, 0.3)",
                    borderDash: [25, 5],
                    borderWidth: 2,
                    pointStyle: "triangle",
                    pointBorderColor: "rgba(255, 99, 132, 1)",
                    pointBackgroundColor: "rgba(255, 255, 255, 1)",
                    pointRadius: 10, // More prominent
                    tension: 0.3,
                    yAxisID: "y",
                },
                {
                    label: "Tlak (0-7)",
                    data: data.pressure,
                    fill: false,
                    borderColor: "rgba(153, 102, 255, 1)",
                    backgroundColor: "rgba(153, 102, 255, 0.3)",
                    borderDash: [5, 10, 2, 10],
                    borderWidth: 4,
                    pointStyle: "crossRot",
                    pointBorderColor: "rgba(153, 102, 255, 1)",
                    pointBackgroundColor: "rgba(255, 255, 255, 1)",
                    pointRadius: 9, // Adjusted for better contrast
                    tension: 0.1,
                    yAxisID: "y2",
                },
                {
                    label: "Fr (0-7)",
                    data: data.fr,
                    fill: false,
                    borderColor: "rgba(54, 162, 235, 1)",
                    backgroundColor: "rgba(54, 162, 235, 0.3)",
                    borderDash: [2, 2],
                    borderWidth: 3,
                    pointStyle: "rect",
                    pointBorderColor: "rgba(54, 162, 235, 1)",
                    pointBackgroundColor: "rgba(255, 255, 255, 1)",
                    pointRadius: 8, // Balanced size
                    tension: 0.2,
                    yAxisID: "y2",
                },
                {
                    label: "sumFr (0-7)",
                    data: data.sumfr,
                    fill: false,
                    borderColor: "rgba(255, 205, 86, 1)",
                    backgroundColor: "rgba(255, 205, 86, 0.4)",
                    borderDash: [],
                    borderWidth: 1,
                    pointStyle: "star",
                    pointBorderColor: "rgba(255, 205, 86, 1)",
                    pointBackgroundColor: "rgba(255, 255, 255, 1)",
                    pointRadius: 10, // Larger star points
                    tension: 0.5,
                    yAxisID: "y2",
                },
            ],
        });
    };  

    useEffect(() => {
        const updateChartOptions = (textColor: string, gridColor: string): ChartOptions<"line"> => ({
            maintainAspectRatio: true,
            aspectRatio: 1.6,
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
                        font: {
                            size: 16,
                        },
                    },
                    grid: {
                        color: gridColor,
                    },
                },
                y: {
                    type: "linear",
                    position: "left",
                    //offset: true,
                    ticks: {
                        color: textColor,
                        stepSize: 10, // Correct step size for linear scale,                        
                    },
                    grid: {
                        color: gridColor,
                        drawOnChartArea: true,
                    },
                    min: 0,  // Set minimum value for y axis
                },
                y2: {
                    type: "linear",
                    position: "right",
                    //offset: false,
                    ticks: {
                        color: textColor,
                        stepSize: 0.5, // Correct step size for y2 axis                        
                    },
                    grid: {
                        color: gridColor,
                        drawOnChartArea: false,
                    },
                    min: 0,  // Set minimum value for y2 axis
                    //max: 7,  // Set maximum value for y2 axis
                },
            },
        });
        
        getProcessLogMutation({ ids: [55], source: "graph" });
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
