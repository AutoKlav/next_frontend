"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { Chart } from "primereact/chart";
import { ChartOptions } from "chart.js";
import { handleExportToPDF } from "@/utils/exportUtil";
import { useMutation } from "@tanstack/react-query";
import { getProcessLogsAction } from "@/app/(main)/api/actions";
import { updateChartOptions } from "@/utils/chartOptionsUtil";
import { ProgressSpinner } from "primereact/progressspinner";
import { transformData, updateChartData } from "@/utils/transformData";

interface ChartInfo {    
    id: number;
    title: string;
    subtitle: string;
}

export const MultiYAxisChart: React.FC<ChartInfo> = (chartInfoProps: ChartInfo) => {    
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState<ChartOptions<"line">>({});
    const chartRef = useRef<any>(null);

    const { isLoading: isLogLoading, mutate: getProcessLogMutation } = useMutation(getProcessLogsAction, {
        onSuccess: ({ data }) => {    
            // Get the first process start timestamp
            const initialTimestamp = new Date(data?.processlogsList[0]?.timestamp).getTime();
            console.log("Initial Timestamp:", initialTimestamp);
            
            const parsedData = data?.processlogsList.map((process, index) => {
                const currentTimestamp = new Date(process.timestamp).getTime();
                const timeDifference = currentTimestamp - initialTimestamp; // Subtract initial timestamp
                const minutesElapsed = Math.floor(timeDifference / 60000); 
                const adjustedTimestamp = index === 0 ? "0" : `+${minutesElapsed}min`;
                return {
                    ...process,
                    processstart: timeDifference, // Store the difference in milliseconds
                    timestamp: adjustedTimestamp, // Set timestamp as "0" for first, "+1" for second, etc.
                };
            });
            
            console.log("Parsed Data:", parsedData);
            updateChartData(transformData({ processlogsList: parsedData }), setChartData);
        },
    });
    
    

    useEffect(() => {
        getProcessLogMutation({ ids: [chartInfoProps.id], source: "graph" });
        setChartOptions(updateChartOptions("white", "white", chartInfoProps)); // Initial white theme
    }, []);
    
    return (
        <div className="card">
            {isLogLoading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
                    <ProgressSpinner style={{ width: '100px', height: '100px' }} strokeWidth="4" animationDuration=".5s" />
                </div>
            ) : (
                <>
                    <Chart ref={chartRef} type="line" data={chartData} options={chartOptions} />
                    <Button label="Export to PDF" onClick={() => handleExportToPDF(chartRef, chartOptions, chartInfoProps)} className="p-button-info mt-5" />
                </>
            )}            
        </div>
    );
};