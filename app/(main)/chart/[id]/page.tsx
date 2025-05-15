"use client";

import { MultiYAxisChart } from '@/demo/components/Charts/MultiYAxisChart';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { getProcessesAction } from '../../api/actions';
import { useToast } from '@/layout/context/toastcontext';
import { ProgressSpinner } from 'primereact/progressspinner';
import { getChartInfo } from '@/utils/chartOptionsUtil';
import { hideFSumFR } from '@/utils/targetTimeOrFevaulator';

const ChartPage = () => {
    const { showError } = useToast();
    const { id } = useParams();
    const refetchInterval = 60000; // 10 seconds

    const { data: filteredProcessQuery, isLoading: loading, refetch } = useQuery({
        queryKey: ["processesDataQuery", id],
        queryFn: async () => {
            const response = await getProcessesAction();
            
            // If id is 0, return the first process because user wants to see latest
            if(id === '0'){
                return [response?.processesList[0]];
            }

            return response?.processesList
            ?.filter((process) => process.id.toString() === id);
        },
        onError(err) {
            showError(
                "Greška",
                "Nije moguće dohvatiti podatke sa senzora. Provjerite konekciju i pokušajte ponovno."
            );
            console.log(err);
        },
        
        enabled: !!id, // Ensure the query runs only if id is available
    });      

    useEffect(() => {
        if (id) {
            refetch();
        }
    }, [id, refetch]);

    const process = filteredProcessQuery?.[0]; // Get the first matching process
    console.log(process);
    const chartInfo = getChartInfo(process);
    const hideFSumFRBool = hideFSumFR(process);

    return (
        <div className="grid">            
            <div className="col-12">                
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
                    <ProgressSpinner style={{ width: '100px', height: '100px' }} strokeWidth="4" animationDuration=".5s" />
                </div>
            ) : 
                <MultiYAxisChart id={chartInfo.id} title={chartInfo.title} subtitle={chartInfo.subtitle} refetchInterval={refetchInterval} hideFSumFR={hideFSumFRBool}/>
            }
            </div>
        </div>
    );
};

export default ChartPage;
