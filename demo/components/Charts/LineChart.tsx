"use client";

import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';

const LineChart = () => {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        const data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: 'rgba(75, 192, 192, 0.6)', // Soft teal
                    borderDash: [5, 5], // Dashed line
                    borderWidth: 2,
                    pointStyle: 'circle',
                    tension: 0.4,
                    yAxisID: 'y'
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    borderColor: 'rgba(153, 102, 255, 0.6)', // Soft purple
                    borderDash: [1, 5], // Dotted line
                    borderWidth: 2,
                    pointStyle: 'rect',
                    tension: 0.4,
                    yAxisID: 'y1'
                },
                {
                    label: 'Third Dataset',
                    data: [12, 42, 25, 36, 72, 50, 65],
                    fill: false,
                    borderColor: 'rgba(255, 159, 64, 0.6)', // Soft orange
                    borderDash: [10, 5, 1, 5], // Dash-dot line
                    borderWidth: 2,
                    pointStyle: 'triangle',
                    tension: 0.4,
                    yAxisID: 'y2'
                },
                {
                    label: 'Fourth Dataset',
                    data: [45, 67, 78, 88, 99, 100, 110],
                    fill: false,
                    borderColor: 'rgba(54, 162, 235, 0.6)', // Soft blue
                    borderDash: [2, 2], // Dotted line
                    borderWidth: 2,
                    pointStyle: 'star',
                    tension: 0.4,
                    yAxisID: 'y3'
                },
                {
                    label: 'Fifth Dataset',
                    data: [23, 34, 45, 56, 67, 78, 89],
                    fill: false,
                    borderColor: 'rgba(255, 99, 132, 0.6)', // Soft red
                    borderDash: [3, 3], // Dashed line
                    borderWidth: 2,
                    pointStyle: 'cross',
                    tension: 0.4,
                    yAxisID: 'y4'
                }
            ]
        };

        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function(tooltipItem: any) {
                            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
                        }
                    }
                },
                crosshair: {
                    line: {
                        color: 'rgba(0, 0, 0, 0.25)', // Customize color
                        width: 1
                    },
                    sync: {
                        enabled: false
                    },
                    zoom: {
                        enabled: false
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    ticks: {
                        color: textColorSecondary,
                        stepSize: 1
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    ticks: {
                        color: textColorSecondary,
                        stepSize: 5
                    },
                    grid: {
                        drawOnChartArea: false,
                        color: surfaceBorder
                    }
                },
                y2: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    offset: true,
                    ticks: {
                        color: textColorSecondary,
                        stepSize: 5
                    },
                    grid: {
                        drawOnChartArea: false,
                        color: surfaceBorder
                    }
                },
                y3: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    offset: true,
                    ticks: {
                        color: textColorSecondary,
                        stepSize: 5
                    },
                    grid: {
                        drawOnChartArea: false,
                        color: surfaceBorder
                    }
                },
                y4: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    offset: true,
                    ticks: {
                        color: textColorSecondary,
                        stepSize: 5
                    },
                    grid: {
                        drawOnChartArea: false,
                        color: surfaceBorder
                    }
                }
            },
            interaction: {
                mode: 'index',
                intersect: false
            },
            hover: {
                mode: 'index',
                intersect: false
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, []);

    return (
        <div className="card">
            <Chart type="line" data={chartData} options={chartOptions} />
        </div>
    );
};

export default LineChart;