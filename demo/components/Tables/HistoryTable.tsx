"use client";

import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Column, ColumnFilterElementTemplateOptions } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getProcessLogsAction, getProcessesAction } from '@/app/(main)/api/actions';

const HistoryTable = () => {
    const processesDataQuery  = [
        {
            id: 1,
            productname: "Product 1",
            processstart: "2022-01-01T00:00:00",
            processlength: 100
        },
        {
            id: 2,
            productname: "Product 2",
            processstart: "2022-01-02T00:00:00",
            processlength: 200
        },
        {
            id: 3,
            productname: "Product 3",
            processstart: "2022-01-03T00:00:00",
            processlength: 300
        },
        {
            id: 4,
            productname: "Product 4",
            processstart: "2022-01-04T00:00:00",
            processlength: 400
        },
        {
            id: 5,
            productname: "Product 5",
            processstart: "2022-01-05T00:00:00",
            processlength: 500
        }
    ];

    // const { data: processesDataQuery } = useQuery({
    //     queryKey: ['processesDataQuery'],
    //     queryFn: () => getProcessesAction(),
    //     onSuccess: () => setLoading(false),
    //     onError: () => setLoading(false)
    // });

    const {isLoading, mutate: getProcessLogMutation} = useMutation(getProcessLogsAction, {
        onSuccess: (response) => {           
            console.log('Process logs:', response.processlogsList);
        }
    });
    
    const [globalFilterValue1, setGlobalFilterValue1] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedProcesses, setSelectedProcesses] = useState<any[]>([]);
    const [filters1, setFilters1] = useState<DataTableFilterMeta>({});

    useEffect(() => {
        initFilters1();
    }, []);

    const clearFilter1 = () => {
        initFilters1();
    };

    const onGlobalFilterChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let _filters1 = { ...filters1 };
        (_filters1['global'] as any).value = value;

        setFilters1(_filters1);
        setGlobalFilterValue1(value);
    };

    const initFilters1 = () => {
        setFilters1({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            name: {
                operator: FilterOperator.AND,
                constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
            },
            startTime: {
                operator: FilterOperator.AND,
                constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }]
            }
        });
        setGlobalFilterValue1('');
    };

    const renderHeader1 = () => {
        return (
            <div className="flex justify-content-between">
                <Button type="button" icon="pi pi-filter-slash" label="Obriši filter" outlined onClick={clearFilter1} />
                <div className='flex justify-content-between gap-3'>
                    {selectedProcesses.length > 0 && (
                        <>
                            <Button icon="pi pi-print" className="p-button-text p-button-plain" size='large' onClick={handlePrint} />
                            <Button icon="pi pi-chart-line" className="p-button-text p-button-plain" size='large' onClick={handleGraph} />
                        </>
                    )}
                    <InputText value={globalFilterValue1} onChange={onGlobalFilterChange1} placeholder="Filtriraj procese" style={{ borderRadius: '11px' }} />
                </div>
            </div>
        );
    };

    const handlePrint = () => {
        console.log('Print processes:', selectedProcesses);
        // Add your print logic here
    };

    const handleGraph = () => {
        console.log('Graph processes:', selectedProcesses);
        const identifiers = selectedProcesses.map((process) => process.id);        
        getProcessLogMutation(identifiers);        
    };

    const dateFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
        return (
            <Calendar
                value={options.value}
                onChange={(e) => options.filterCallback(e.value, options.index)}
                dateFormat="yy-mm-dd"
                placeholder="Select a date"
                className="p-column-filter"
            />
        );
    };

    const formatDate = (value: string) => {
        const date = new Date(value);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const dateBodyTemplate = (rowData: { processstart: string }) => {
        return formatDate(rowData.processstart);
    };

    const header = renderHeader1();
    
    return (
        <div className="card">
            <h2>Povijest procesa</h2>
            <DataTable
                className="p-datatable-gridlines"
                showGridlines
                value={processesDataQuery || []} // Use fetched data here
                paginator
                rows={5}
                dataKey="id"
                loading={loading}
                selection={selectedProcesses}
                onSelectionChange={(e) => setSelectedProcesses(e.value)}
                filters={filters1}
                filterDisplay="menu"
                globalFilterFields={['productname']}
                header={header}
            >
                <Column selectionMode="multiple" headerStyle={{ width: '3em' }} />
                <Column field="productname" header="Ime procesa" filterPlaceholder="Search by name" style={{ maxWidth: '250px' }} />
                <Column field="processstart" header="Vrijeme pocetka" style={{ maxWidth: '200px' }} body={dateBodyTemplate} filter filterElement={dateFilterTemplate} />
                <Column field="processlength" header="Duljina trajanja (s)" />
            </DataTable>
        </div>
    );
};

export default HistoryTable;
