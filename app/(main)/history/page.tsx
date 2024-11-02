"use client";

import React, { useState } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

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
        return <Button icon="pi pi-chart-line" className="p-button-text p-button-plain" />;
    };
    const printerBodyTemplate = () => {
        return <Button icon="pi pi-print" className="p-button-text p-button-plain" />;
    };

    return (
        <div className="card">
            <h2>Povijest procesa</h2>            
            <DataTable 
                value={processes} 
                paginator 
                rows={10} 
                dataKey="id" 
                filters={filters} 
                filterDisplay="row" 
                loading={loading}
                selection={selectedProcesses}
                onSelectionChange={(e) => setSelectedProcesses(e.value)}
            >
                <Column selectionMode="multiple" headerStyle={{ width: '3em' }} />
                <Column field="name" header="Ime procesa" filter filterPlaceholder="Search by name" style={{ maxWidth: '250px' }} />
                <Column field="startTime" header="Vrijeme pocetka" style={{ maxWidth: '200px' }} />
                <Column field="duration" header="Duljina trajanja (s)"  bodyStyle={{ textAlign: 'center' }} />
                <Column body={graphBodyTemplate} header="Graf" style={{ maxWidth: '100px' }} />
                <Column body={printerBodyTemplate} header="Printanje" style={{ maxWidth: '100px' }} />
            </DataTable>
        </div>
    );
}