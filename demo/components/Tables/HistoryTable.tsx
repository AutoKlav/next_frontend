"use client";

import React, { useState, useEffect } from "react";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getProcessLogsAction, getProcessesAction } from "@/app/(main)/api/actions";

const HistoryTable = () => {
    const [loading, setLoading] = useState(true);
    const [processesDataQuery, setProcessesData] = useState<any[]>([]);

    const processesDataQuery1 = [
        {
            id: 1,
            productname: "Product 1",
            processstart: new Date("2015-09-13"),//new Date("2022-01-01T00:00:00"),
            processlength: 100,
        },            
    ];

    const { data: processesDataQuery2 } = useQuery({
        queryKey: ['processesDataQuery'],
        queryFn: () => getProcessesAction(),
        onSuccess: (data) => {
            const transformedData = data.processesList.map((process) => ({
                ...process,
                processstart: new Date(process.processstart)
            }));
            setProcessesData(transformedData);
            setLoading(false);
        },
        onError: () => setLoading(false)
    });

    const {isLoading, mutate: getProcessLogMutation} = useMutation(getProcessLogsAction, {
        onSuccess: (response) => {           
            //console.log('Process logs:', response.processlogsList);
        }
    });

    const [globalFilterValue, setGlobalFilterValue] = useState("");
    const [filters, setFilters] = useState<DataTableFilterMeta | undefined> (undefined);
    const [selectedProcesses, setSelectedProcesses] = useState<any[]>([]);

    useEffect(() => {
        initFilters();
    }, []);

    const initFilters = () => {
        setFilters({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },          
            processstart: {
                operator: FilterOperator.AND,
                constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
            },
        });
    };
    
    const formatDate = (value: Date ) => {
        // if (!value) return ''; // Handle null or undefined gracefully        
        // const date = value instanceof Date ? value : new Date(value); // Ensure it's a Date object
        
        // if (isNaN(date.getTime())) return ''; // Handle invalid date
        // return date.toLocaleDateString('en-US', {
        //     day: '2-digit',
        //     month: '2-digit',
        //     year: 'numeric',
        // });
        return value.toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };  

    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const _filters = { ...filters };        
        _filters.global = { value, matchMode: FilterMatchMode.CONTAINS };
        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const clearFilter = () => {
        initFilters();
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-content-between">
                <Button type="button" icon="pi pi-filter-slash" label="Obriši filter" outlined onClick={clearFilter} />
                <div className='flex justify-content-between gap-3'>
                    {selectedProcesses.length > 0 && (
                        <>
                            <Button icon="pi pi-print" className="p-button-text p-button-plain" size='large' onClick={handlePrint} />
                            <Button icon="pi pi-chart-line" className="p-button-text p-button-plain" size='large' onClick={handleGraph} />
                        </>
                    )}
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Filtriraj procese" style={{ borderRadius: '11px' }} />
                </div>
            </div>
        );
    };

    const dateFilterTemplate = (options: any) => {
        return (
            <Calendar 
                value={options.value} 
                onChange={(e) => options.filterCallback(e.value, options.index)} 
                dateFormat="mm/dd/yy" 
                placeholder="mm/dd/yyyy" 
                mask="99/99/9999"
                showIcon />);        
    };  

    const dateBodyTemplate = (rowData: any) => {
    return formatDate(rowData.processstart); // Safe formatting
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


    const header = renderHeader();
    return (
        <div className="card">
            <h2>Process History</h2>
            <DataTable
                className="p-datatable-gridlines"
                showGridlines
                value={processesDataQuery || []}
                paginator
                rows={5}
                dataKey="id"
                filters={filters}
                selection={selectedProcesses}
                onSelectionChange={(e) => setSelectedProcesses(e.value)}
                filterDisplay="menu"
                globalFilterFields={["productname","processstart"]}
                header={header}
                emptyMessage="No processes found."
            >
                <Column selectionMode="multiple" headerStyle={{ width: '3em' }} />
                
                <Column
                    field="productname"
                    header="Process Name"                    
                />
                <Column
                    field="processstart"
                    header="Start Date"
                    dataType="date"
                    body={dateBodyTemplate}
                    filter
                    filterElement={dateFilterTemplate}
                    showFilterMatchModes
                    style={{ maxWidth: '200px' }} 
                />
                <Column field="processlength" header="Process Length (s)" />
            </DataTable>
        </div>
    );
};

export default HistoryTable;
