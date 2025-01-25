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
import { modularDataTransformation, updateModularChartData } from "@/utils/transformData";
import { formatTime } from "@/utils/dateUtil";

interface ChartInfo {
    id: number;
    title: string;
    subtitle: string;
    refetchInterval?: number;
}

export const InputValuesChart: React.FC<ChartInfo> = (chartInfoProps: ChartInfo) => {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState<ChartOptions<"line">>({});
    const [selectedValues, setSelectedValues] = useState({
        temp: false,
        tempk: false,
        pressure: false,
        expansiontemp: false,
        heatertemp: false,
        steampressure: false,
        tanktemp: false,
        tankwaterlevel: false,
    });
    const chartRef = useRef<any>(null);

    const { isLoading: isLogLoading, refetch } = useQuery({
        queryKey: ["processLogs2"],
        queryFn: async () => {
            const { data } = await getProcessLogsAction({
                ids: [chartInfoProps.id],
                source: "graph",
            });
            const parsedData = data?.processlogsList?.map((process, index) => {
                return {
                    ...process,
                    timestamp: index === 0 ? formatTime(process.timestamp) : `+${index}min`,
                };
            });

            updateModularChartData(
                modularDataTransformation({ processlogsList: parsedData }),
                setChartData
            );
            return parsedData;
        },
        refetchInterval: chartInfoProps.refetchInterval ? chartInfoProps.refetchInterval : false,
    });

    useEffect(() => {
        refetch();
        setChartOptions(updateChartOptions("white", "white", chartInfoProps));
    }, [chartInfoProps.id, refetch]);

    const handleExportToPdf = () => {
        handleExportToPDF(chartRef, chartOptions, chartInfoProps);
    };

    const onValueChange = (e: any) => {
        const { name, checked } = e.target;
        setSelectedValues((prev) => ({
            ...prev,
            [name]: checked,
        }));
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
                    {/* Checkbox Section */}
                    <div
                        className="mb-4"
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(4, 1fr)",
                            gap: "10px",
                            alignItems: "center",
                        }}
                    >
                        <div className="flex align-items-center">
                            <Checkbox
                                inputId="temp"
                                name="temp"
                                checked={selectedValues.temp}
                                onChange={onValueChange}
                            />
                            <label htmlFor="temp" className="ml-2">
                                Temperatura
                            </label>
                        </div>
                        <div className="flex align-items-center">
                            <Checkbox
                                inputId="tempk"
                                name="tempk"
                                checked={selectedValues.tempk}
                                onChange={onValueChange}
                            />
                            <label htmlFor="tempk" className="ml-2">
                                Temperatura Konzerve
                            </label>
                        </div>
                        <div className="flex align-items-center">
                            <Checkbox
                                inputId="pressure"
                                name="pressure"
                                checked={selectedValues.pressure}
                                onChange={onValueChange}
                            />
                            <label htmlFor="pressure" className="ml-2">
                                Tlak
                            </label>
                        </div>
                        <div className="flex align-items-center">
                            <Checkbox
                                inputId="expansiontemp"
                                name="expansiontemp"
                                checked={selectedValues.expansiontemp}
                                onChange={onValueChange}
                            />
                            <label htmlFor="expansiontemp" className="ml-2">
                                Temperatura Ekspanzije
                            </label>
                        </div>
                        <div className="flex align-items-center">
                            <Checkbox
                                inputId="heatertemp"
                                name="heatertemp"
                                checked={selectedValues.heatertemp}
                                onChange={onValueChange}
                            />
                            <label htmlFor="heatertemp" className="ml-2">
                                Temperatura Grijača
                            </label>
                        </div>
                        <div className="flex align-items-center">
                            <Checkbox
                                inputId="steampressure"
                                name="steampressure"
                                checked={selectedValues.steampressure}
                                onChange={onValueChange}
                            />
                            <label htmlFor="steampressure" className="ml-2">
                                Tlak Pare
                            </label>
                        </div>
                        <div className="flex align-items-center">
                            <Checkbox
                                inputId="tanktemp"
                                name="tanktemp"
                                checked={selectedValues.tanktemp}
                                onChange={onValueChange}
                            />
                            <label htmlFor="tanktemp" className="ml-2">
                                Temperatura Spremnika
                            </label>
                        </div>
                        <div className="flex align-items-center">
                            <Checkbox
                                inputId="tankwaterlevel"
                                name="tankwaterlevel"
                                checked={selectedValues.tankwaterlevel}
                                onChange={onValueChange}
                            />
                            <label htmlFor="tankwaterlevel" className="ml-2">
                                Razina Vode u Spremniku
                            </label>
                        </div>
                    </div>

                    {/* Chart Section */}
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
