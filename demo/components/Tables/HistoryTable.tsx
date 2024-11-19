"use client";

import React, { useState, useEffect } from "react";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";

const HistoryTable = () => {
    const processesDataQuery = [
        {
            id: 1,
            productname: "Product 1",
            processstart: new Date("2022-01-01T00:00:00"), // Proper Date object
            processlength: 100,
        },
        {
            id: 2,
            productname: "Product 2",
            processstart: new Date("2022-01-02T00:00:00"),
            processlength: 200,
        },
        {
            id: 3,
            productname: "Product 3",
            processstart: new Date("2022-01-03T00:00:00"),
            processlength: 300,
        },
        {
            id: 4,
            productname: "Product 4",
            processstart: new Date("2022-01-04T00:00:00"),
            processlength: 400,
        },        
    ];

    const [globalFilterValue, setGlobalFilterValue] = useState("");
    const [filters, setFilters] = useState<DataTableFilterMeta | undefined> (undefined);

    useEffect(() => {
        initFilters();
    }, []);

    const initFilters = () => {
        setFilters({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            productname: {
                operator: FilterOperator.AND,
                constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
            },
            processstart: {
                operator: FilterOperator.AND,
                constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
            },
            processlength: {
                operator: FilterOperator.AND,
                constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
            },
        });
    };
    
    const formatDate = (value: string | Date | null) => {
        if (!value) return ''; // Handle null or undefined gracefully
        const date = value instanceof Date ? value : new Date(value); // Ensure it's a Date object
        if (isNaN(date.getTime())) return ''; // Handle invalid date
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };  

    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const _filters = { ...filters };        
        _filters.global = { value, matchMode: FilterMatchMode.CONTAINS };
        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-content-between">
                <Button
                    type="button"
                    icon="pi pi-filter-slash"
                    label="Clear"
                    outlined
                    onClick={initFilters}
                />
                <InputText
                    value={globalFilterValue}
                    onChange={onGlobalFilterChange}
                    placeholder="Filter processes"
                    style={{ borderRadius: "11px" }}
                />
            </div>
        );
    };

    const dateFilterTemplate = (options: any) => {
        const value = options.value instanceof Date ? options.value : new Date(options.value);
        return (
            <Calendar
                value={value}
                onChange={(e) => options.filterCallback(e.value, options.index)}
                dateFormat="dd/mm/yy"
                placeholder="dd/mm/yyyy"
                mask="99/99/9999"
                showIcon
                className="p-column-filter"
            />
        );
    };  

    const dateBodyTemplate = (rowData: any) => {
    return formatDate(rowData.processstart); // Safe formatting
};

    const header = renderHeader();

    return (
        <div className="card">
            <h2>Process History</h2>
            <DataTable
                value={processesDataQuery}
                paginator
                rows={5}
                dataKey="id"
                filters={filters}
                filterDisplay="menu"
                globalFilterFields={["productname", "processstart"]}
                header={header}
                emptyMessage="No processes found."
            >
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
                />
                <Column field="processlength" header="Process Length (s)" />
            </DataTable>
        </div>
    );
};

export default HistoryTable;
