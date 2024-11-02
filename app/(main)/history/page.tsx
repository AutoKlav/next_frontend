"use client";

import React, { useState } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

export default function BasicFilterDemo() {
    const processes = [
        { id: 1000, name: 'Process A', startTime: '2024-10-22T15:05:20', duration: 9000 },
        { id: 1001, name: 'Process B', startTime: '2024-10-22T16:00:00', duration: 6300 },
        { id: 1002, name: 'Process C', startTime: '2024-10-22T17:15:00', duration: 11700 },
    ];

    const [globalFilter, setGlobalFilter] = useState<string | null>(null);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    });
    const [loading, setLoading] = useState(false);
    const [selectedProcesses, setSelectedProcesses] = useState<any[]>([]);

    const graphBodyTemplate = () => {
    };
    
    const renderHeader1 = () => {
        return (
            <div className="flex justify-content-between">
                <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined />
                <div className='flex justify-content-between gap-3'>
                <Button icon="pi pi-print" className="p-button-text p-button-plain" size='large'/>
                <Button icon="pi pi-chart-line" className="p-button-text p-button-plain" size='large'/>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText placeholder="Filtriraj procese" />
                </span>
                </div>
            </div>
        );
    };

    const header = renderHeader1();

    return (
        <div className="card">
            <h2>Povijest procesa</h2>            
            <DataTable 
                value={processes} 
                paginator 
                rows={10} 
                dataKey="id" 
                loading={loading}
                selection={selectedProcesses}
                onSelectionChange={(e) => setSelectedProcesses(e.value)}
                header={header}
            >
                <Column selectionMode="multiple" headerStyle={{ width: '3em' }} />
                <Column field="name" header="Ime procesa" style={{ maxWidth: '250px' }} />
                <Column field="startTime" header="Vrijeme pocetka" style={{ maxWidth: '200px' }} />
                <Column field="duration" header="Duljina trajanja (s)" />
            </DataTable>
        </div>
    );
}