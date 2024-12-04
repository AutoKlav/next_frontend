"use client";

import { MultiYAxisChart } from '@/demo/components/Charts/MultiYAxisChart';
import { useParams } from 'next/navigation';
import React from 'react';

const ChartPage = () => {
    const { id } = useParams();
    
    console.log("ID:", id);

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
