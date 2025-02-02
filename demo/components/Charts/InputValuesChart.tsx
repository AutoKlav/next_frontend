"use client";

import React, { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "primereact/button";
import { Chart } from "primereact/chart";
import { ChartOptions } from "chart.js";
import { Checkbox } from "primereact/checkbox";
import { handleExportToPDF } from "@/utils/exportUtil";
import { getProcessLogsAction } from "@/app/(main)/api/actions";
import { updateChartOptions } from "@/utils/chartOptionsUtil";
import { ProgressSpinner } from "primereact/progressspinner";
import { formatTime } from "@/utils/dateUtil";
import { EnabledSensors, StateMachineValues } from "@/types/grpc";
import { TransformedData } from "@/types/app";

interface ChartInfo {
    id: number;
    title: string;
    subtitle: string;
    refetchInterval?: number;
}

export const InputValuesChart: React.FC<ChartInfo> = (chartInfoProps: ChartInfo) => {
    const modularDataTransformation = (data: { processlogsList: StateMachineValues[] }): TransformedData => {
        const transformedData: TransformedData = {
            timestamp: [],
            temp: [],
            tempk: [],
            pressure: [],
            expansiontemp: [],
            heatertemp: [],
            steampressure: [],
            tanktemp: [],
            tankwaterlevel: [],
        };

        data.processlogsList.forEach((log) => {
            transformedData.timestamp?.push(log.timestamp);
            transformedData.temp?.push(log.sensorvalues.temp);
            transformedData.tempk?.push(log.sensorvalues.tempk);
            transformedData.pressure?.push(log.sensorvalues.pressure);
            transformedData.expansiontemp?.push(log.sensorvalues.expansiontemp);
            transformedData.heatertemp?.push(log.sensorvalues.heatertemp);
            transformedData.steampressure?.push(log.sensorvalues.steampressure);
            transformedData.tanktemp?.push(log.sensorvalues.tanktemp);
            transformedData.tankwaterlevel?.push(log.sensorvalues.tankwaterlevel);
        });

        return transformedData;
    };

    const updateModularChartData = (
        data: TransformedData,
        selectedSensors: EnabledSensors,
        setChartData: (data: any) => void
    ) => {
        const datasets = [];

        if (selectedSensors.temp) {
            datasets.push({
                label: "Temperatura vode",
                data: data.temp,
                borderColor: "rgba(255, 99, 132, 1)",
                backgroundColor: "rgba(255, 99, 132, 0.3)",
                borderWidth: 2,
                fill: false,
            });
        }
        if (selectedSensors.tempk) {
            datasets.push({
                label: "Temperatura konzerve",
                data: data.tempk,
                borderColor: "rgba(204, 71, 71, 1)",
                backgroundColor: "rgba(204, 71, 71, 0.25)",
                borderWidth: 2,
                fill: false,
            });
        }
        if (selectedSensors.pressure) {
            datasets.push({
                label: "Tlak",
                data: data.pressure,
                borderColor: "rgba(153, 102, 255, 1)",
                backgroundColor: "rgba(153, 102, 255, 0.23)",
                borderWidth: 2,
                fill: false,
            });
        }
        if (selectedSensors.expansiontemp) {
            datasets.push({
                label: "Temperatura ekspanzije",
                data: data.expansiontemp,
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.3)",
                borderWidth: 2,
                fill: false,
            });
        }
        if (selectedSensors.heatertemp) {
            datasets.push({
                label: "Temperatura grijača",
                data: data.heatertemp,
                borderColor: "rgba(255, 206, 86, 1)",
                backgroundColor: "rgba(255, 206, 86, 0.3)",
                borderWidth: 2,
                fill: false,
            });
        }
        if (selectedSensors.steampressure) {
            datasets.push({
                label: "Tlak pare",
                data: data.steampressure,
                borderColor: "rgba(54, 162, 235, 1)",
                backgroundColor: "rgba(54, 162, 235, 0.3)",
                borderWidth: 2,
                fill: false,
            });
        }
        if (selectedSensors.tanktemp) {
            datasets.push({
                label: "Temperatura spremnika",
                data: data.tanktemp,
                borderColor: "rgba(255, 159, 64, 1)",
                backgroundColor: "rgba(255, 159, 64, 0.3)",
                borderWidth: 2,
                fill: false,
            });
        }
        if (selectedSensors.tankwaterlevel) {
            datasets.push({
                label: "Razina vode u spremniku",
                data: data.tankwaterlevel,
                borderColor: "rgba(153, 102, 255, 1)",
                backgroundColor: "rgba(153, 102, 255, 0.3)",
                borderWidth: 2,
                fill: false,
            });
        }

        setChartData({
            labels: data.timestamp,
            datasets,
        });
    };

    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState<ChartOptions<"line">>({});
    const [selectedValues, setSelectedValues] = useState<EnabledSensors>({
        temp: true,
        tempk: false,
        pressure: false,
        expansiontemp: false,
        heatertemp: false,
        steampressure: false,
        tanktemp: false,
        tankwaterlevel: false,
    });

    const chartRef = useRef<any>(null);

    const { isLoading: isLogLoading, data } = useQuery({
        queryKey: ["processLogs2", chartInfoProps.id],
        queryFn: async () => {
            const { data } = await getProcessLogsAction({
                ids: [chartInfoProps.id],
                source: "graph",
            });
            return modularDataTransformation({ processlogsList: data?.processlogsList || [] });
        },
        refetchInterval: chartInfoProps.refetchInterval || false,
        onSuccess: (data) => {
            updateModularChartData(data, selectedValues, setChartData);
        },
    });

    useEffect(() => {
        setChartOptions(updateChartOptions("white", "white", chartInfoProps));
    }, [chartInfoProps]);

    const handleExportToPdf = () => {
        // handleExportToPDF(chartRef, chartOptions, chartInfoProps);
    };

    const onValueChange = (e: any) => {
        const { name, checked } = e.target;
        const updatedValues = { ...selectedValues, [name]: checked };
        setSelectedValues(updatedValues);

        if (data) {
            updateModularChartData(data, updatedValues, setChartData);
        }
    };

    return (
        <div className="card">
            {isLogLoading ? (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "70vh",
                    }}
                >
                    <ProgressSpinner
                        style={{ width: "100px", height: "100px" }}
                        strokeWidth="4"
                        animationDuration=".5s"
                    />
                </div>
            ) : (
                <>
                    <div
                        className="mb-4"
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(4, 1fr)",
                            gap: "10px",
                        }}
                    >
                        {Object.keys(selectedValues).map((key) => (
                            <div key={key} className="flex align-items-center">
                                <Checkbox
                                    inputId={key}
                                    name={key}
                                    checked={selectedValues[key as keyof EnabledSensors]}
                                    onChange={onValueChange}
                                />
                                <label htmlFor={key} className="ml-2">
                                    {key.charAt(0).toUpperCase() + key.slice(1)}
                                </label>
                            </div>
                        ))}
                    </div>
                    <Chart ref={chartRef} type="line" data={chartData} options={chartOptions} />
                    <Button
                        label="Prebaci u PDF"
                        onClick={handleExportToPdf}
                        className="p-button-info mt-5"
                    />
                </>
            )}
        </div>
    );
};
