"use client";

import { MultiYAxisChart } from '@/demo/components/Charts/MultiYAxisChart';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { getProcessesAction } from '../../api/actions';
import { useToast } from '@/layout/context/toastcontext';
import { ProgressSpinner } from 'primereact/progressspinner';

const ChartPage = () => {
    const { showError } = useToast();
    const { id } = useParams();

    const { data: filteredProcessQuery, isLoading: loading, refetch } = useQuery({
        queryKey: ["processesDataQuery", id],
        queryFn: async () => {
            const response = await getProcessesAction();
            console.log("Processes:", response?.processesList);
            
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
    const chartInfo = process ? {
            id: process.id,
            title: [
                `Ime: ${process.productname ?? "[]"}`,
                `Količina: ${process.productquantity ?? "[]"}`,
                `Početak: ${process.processstart ?? "[]"}`,
                `Trajanje: ${process.processlength ?? "[]"}`,
            ].join(" | "),
            subtitle: [
                `Bakterija: ${process.bacteria ?? "[Ime bakterije]"}`,
                `Opis: ${process.description ?? "[Opis]"}`,
            ].join(" | "),
        } : { id: -1, title: "Nepoznati proces", subtitle: "Nepoznati proces" };

    return (
        <div className="grid">            
            <div className="col-12">                
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
                    <ProgressSpinner style={{ width: '100px', height: '100px' }} strokeWidth="4" animationDuration=".5s" />
                </div>
            ) : 
                <MultiYAxisChart id={chartInfo.id} title={chartInfo.title} subtitle={chartInfo.subtitle} />                
            }
            </div>
        </div>
    );
};

export default ChartPage;