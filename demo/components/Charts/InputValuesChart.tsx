"use client";

import React, { useState, useEffect, useRef } from "react";
import { useQuery } from '@tanstack/react-query';
import { Button } from "primereact/button";
import { Chart } from "primereact/chart";
import { ChartOptions } from "chart.js";
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
    const chartRef = useRef<any>(null);

    const { isLoading: isLogLoading, refetch } = useQuery({
        queryKey: ["processLogs"], // Unique key for the query
        queryFn: async () => {
            const { data } = await getProcessLogsAction({ ids: [chartInfoProps.id], source: "graph" });
            const parsedData = data?.processlogsList?.map((process, index) => {
                return {
                    ...process,
                    timestamp: index === 0 ? formatTime(process.timestamp) : `+${index}min`,
                };
            });

            updateModularChartData(modularDataTransformation({ processlogsList: parsedData }), setChartData);
            return parsedData; // Ensure the query function returns the parsed data
        },
        refetchInterval: chartInfoProps.refetchInterval ? chartInfoProps.refetchInterval : false,
    });
    
    useEffect(() => {
        refetch();
        setChartOptions(updateChartOptions("white", "white", chartInfoProps)); // Initial white theme
    }, [chartInfoProps.id, refetch]);

    const handleExportToPdf = () => {        
        handleExportToPDF(chartRef, chartOptions, chartInfoProps);
    }
    console.log(chartData);
    return (
        <div className="card">
            {isLogLoading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
                    <ProgressSpinner style={{ width: '100px', height: '100px' }} strokeWidth="4" animationDuration=".5s" />
                </div>
            ) : (
                <>
                    <Chart ref={chartRef} type="line" data={chartData} options={chartOptions} />
                    <Button label="Export to PDF" onClick={handleExportToPdf} className="p-button-info mt-5" />
                </>
            )}            
        </div>
    );
};