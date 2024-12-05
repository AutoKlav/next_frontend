"use client";

import { MultiYAxisChart } from '@/demo/components/Charts/MultiYAxisChart';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React from 'react';
import { getProcessesAction } from '../../api/actions';
import { useToast } from '@/layout/context/toastcontext';

const ChartPage = () => {
    const { showError } = useToast();
    const { id } = useParams();

    const { data: filteredProcessQuery, isLoading: loading } = useQuery({
        queryKey: ["processesDataQuery"],
        queryFn: async () => {
            const response =  await getProcessesAction();
            
            console.log("Processes:", response?.processesList);
            
            return response?.processesList?.filter((process) => process.id.toString() === id);
        },
        onError(err) {
            showError(
                "Greška",
                "Nije moguće dohvatiti podatke sa senzora. Provjerite konekciju i pokušajte ponovno."
            );
            console.log(err);
        },
    });

    console.log("ProcessesDataQuery:", filteredProcessQuery);

    const chartInfo = {
        id: 55,
        title: ["Ime: [Product Name]","Količina: [Product Quantity]", "Početak: [Start]", "Trajanje: [Length]"].join(" - "), // Title of the chart
        subtitle: ["Bakterija: [Ime bakterije]","Opis: [Opis]"].join(" - "), // Subtitle of the chart
    }
    
    return (
        <div className='grid'>            
            <div className='col-12'>            
                <MultiYAxisChart id={chartInfo.id} title={chartInfo.title} subtitle={chartInfo.subtitle} />
            </div>
        </div>
    );
};

export default ChartPage;
