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
        onSuccess: ({data, source}) => {
            
            console.log("Process logs:", data.processlogsList);
            
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

            console.log("Transformed data:", transformedData);
        },
    });
    
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
                    ticks: { color: textColor, stepSize: 11 },                    
                    grid: {  color: gridColor, drawOnChartArea: true },
                },
                y1: {
                    type: "linear",
                    position: "left",
                    offset: true,
                    ticks: { color: textColor, stepSize: 14 },
                    grid: {  color: gridColor, drawOnChartArea: true },
                },
                y2: {
                    type: "linear",
                    position: "right",
                    ticks: { color: textColor, stepSize: 16 },
                    grid: { color: gridColor, drawOnChartArea: true },
                },
                y3: {
                    type: "linear",
                    position: "right",
                    offset: true,
                    ticks: { color: textColor, stepSize: 9 },
                    grid: { color: gridColor, drawOnChartArea: true },
                },
                y4: {
                    type: "linear",
                    position: "right",
                    offset: true,
                    ticks: { color: textColor, stepSize:12 },
                    grid: { color: gridColor, drawOnChartArea: true },
                },
            },
        });

        const data = {
            labels: [
                "11:52:53", 
                "11:53:49", 
                "12:29:49", 
                "14:09:46", 
                "13:47:46", 
                "13:49:46"
            ],
            datasets: [
                {
                    label: "Temperatura vode",
                    data: [11.7276, 11.7276, 60.9079, 60.4035, 116.898, 116.898],                 
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
                    label: "Temperatura konzerve",
                    data: [12.7364, 12.7364, 45.0189, 105.044, 113.871, 114.124],
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
                    label: "Tlak",
                    data: [108.364, 108.364, 76.0811, 16.0559, 7.2287, 6.97649],
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
                    yAxisID: "y2",
                },
                {
                    label: "Fr",
                    data: [-0.0341854, -0.00335308, 1.74381, 1.8089, 2.04871, 2.05214],
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
                    label: "sumFr",
                    data: [0.0000000000728809, 0.000000000145762, 0.00000012327, 0.123987, 0.946455, 1.00305],                 
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
            ],
        };        

        setChartData(data);
        setChartOptions(updateChartOptions("white", "white")); // Initial white theme
    }, []);

    

    return (
        <div className="card">
            <Button label="Fetch" onClick={() => getProcessLogMutation({ ids:[55], source: "graph" })} className="p-button-success" />
            <Chart ref={chartRef} type="line" data={chartData} options={chartOptions} />
            <Button label="Export to PDF" onClick={() => handleExportToPDF(chartRef, chartOptions)} className="p-button-info mt-5" />
        </div>
    );
};

export default MultiYAxisChart;
