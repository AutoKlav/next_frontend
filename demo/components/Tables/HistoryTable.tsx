"use client";

import { Chart } from "primereact/chart";
import { ChartOptions } from "chart.js";
import React, { useEffect, useRef, useState } from "react";
import { FilterMatchMode } from "primereact/api";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getProcessLogsAction, getProcessesAction } from "@/app/(main)/api/actions";
import { useToast } from "@/layout/context/toastcontext";
import DateFilterDialog from "../Dialogs/DateFilterSelector";
import { useRouter } from "next/navigation";
import { getChartInfo, updateChartOptions } from "@/utils/chartOptionsUtil";
import { transformData, updateChartData } from "@/utils/transformData";
import { handleExportToPDF } from "@/utils/exportUtil";

const HistoryTable = () => {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState<ChartOptions<"line">>({});
    const chartRef = useRef<any>(null);

    const router = useRouter()
    const { showError } = useToast();
    
    const { data: processesDataQuery, isLoading: loading } = useQuery({
        queryKey: ["processesDataQuery"],
        queryFn: async () => {
            const response =  await getProcessesAction();
            
            console.log("Processes:", response?.processesList);
            
            return response?.processesList?.map((process) => ({
                ...process,
                processstart: new Date(process.processstart), // Ensure it's a Date object
            }));
        },
        onError(err) {
            showError(
                "Greška",
                "Nije moguće dohvatiti podatke sa senzora. Provjerite konekciju i pokušajte ponovno."
            );
            console.log(err);
        },
    });

    const { isLoading: isLogLoading, mutate: getProcessLogMutation } = useMutation(getProcessLogsAction, {
        onSuccess: ({data, source}) => {
            console.log("Process logs:", data);

            if (source === "print") {                
                updateChartData(transformData({ processlogsList: data.processlogsList }), setChartData);
                
                const chartInfo = getChartInfo(selectedProcesses[0]);                
                handleExportToPDF(chartRef, chartOptions, chartInfo);
            } else if (source === "graph") {                
                router.push(`/chart/${data?.processlogsList[0]?.id}`);
            }
        },
    }); 

    const [globalFilterValue, setGlobalFilterValue] = useState("");
    const [filters, setFilters] = useState<DataTableFilterMeta | undefined>(undefined);
    const [selectedProcesses, setSelectedProcesses] = useState<any[]>([]);

    const [showDateFilterDialog, setShowDateFilterDialog] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [dateFilterOption, setDateFilterOption] = useState<string>("Datum je jednak");

    const initFilters = () => {
        setFilters({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },            
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
                <Button
                    type="button"
                    icon="pi pi-filter-slash"
                    label="Obriši filtere"
                    outlined
                    onClick={clearFilter}
                />
                <div className="flex justify-content-between gap-3">
                    {selectedProcesses.length === 1 && (
                        <Button
                        icon="pi pi-chart-line"
                        className="p-button-text p-button-plain"
                        size="large"
                        onClick={handleGraph}
                    />
                    )}
                    {selectedProcesses.length > 0 && (                        
                        <Button
                            icon="pi pi-print"
                            className="p-button-text p-button-plain"
                            size="large"
                            onClick={handlePrint}
                        />
                    )}
                    <InputText
                        value={globalFilterValue}
                        onChange={onGlobalFilterChange}
                        placeholder="Filtriraj procese"
                        style={{ borderRadius: "11px", height: "50px" }}
                    />
                    <Button
                        icon="pi pi-calendar"
                        outlined
                        onClick={() => setShowDateFilterDialog(true)} // Open date filter dialog
                    />
                </div>
            </div>
        );
    };

    const handlePrint = () => {
        const ids = selectedProcesses.map((process) => process.id);
        getProcessLogMutation({ ids: ids, source: "print" });        
        setShowChart(true); // Make the chart visible before exporting
    };

    const handleGraph = () => {
        const ids = selectedProcesses.map((process) => process.id);
        getProcessLogMutation({ ids: ids, source: "graph" });
    };

    const handleDateFilterApply = () => {
        if (selectedDate) {
            const _filters = { ...filters };
            switch (dateFilterOption) {
                case "Datum je prije":
                    _filters.processstart = {
                        operator: FilterMatchMode.DATE_BEFORE,
                        constraints: [{ value: selectedDate, matchMode: FilterMatchMode.DATE_IS }],
                    };
                    break;
                case "Datum je jednak":
                    _filters.processstart = {
                        operator: FilterMatchMode.DATE_IS,
                        constraints: [{ value: selectedDate, matchMode: FilterMatchMode.DATE_IS }],
                    };
                    break;
                case "Datum je poslije":
                    _filters.processstart = {
                        operator: FilterMatchMode.DATE_AFTER,
                        constraints: [{ value: selectedDate, matchMode: FilterMatchMode.DATE_IS }],
                    };
                    break;
            }
            setFilters(_filters);
        }
        setShowDateFilterDialog(false);
    };

    const handleDateFilterCancel = () => {
        setShowDateFilterDialog(false);
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    useEffect(() => {
        // Usage    
        setChartOptions(updateChartOptions("#1f2937", "#1f2937", {id:1, title:'', subtitle:''})); // Initial white theme
    }, []);

    const header = renderHeader();

    const [showChart, setShowChart] = useState(false); // State to control chart visibility
    useEffect(() => {
        // Hide chart again after a short delay (optional, if required for export operations)
        if (showChart) {
            const timer = setTimeout(() => setShowChart(false), 1000);
            return () => clearTimeout(timer);
        }
    }, [showChart]);
    
    return (
        <div className="card">
            <h2>Povijest procesa</h2>
            <DataTable
                className="p-datatable-gridlines"
                showGridlines
                value={processesDataQuery || []}
                loading={loading || isLogLoading}
                paginator
                rows={6}
                dataKey="id"
                filters={filters}
                selection={selectedProcesses}
                onSelectionChange={(e) => setSelectedProcesses(e.value)}
                filterDisplay="menu"
                globalFilterFields={["productname", "processstart"]}
                header={header}
                emptyMessage="Nema pronađenih procesa."
            >
                <Column selectionMode="multiple" headerStyle={{ width: "3em" }} />
                <Column field="productname" header="Naziv procesa" />
                <Column 
                    field="processstart" 
                    header="Datum početka" 
                    body={(rowData) => formatDate(rowData.processstart)} // Format date before displaying
                />
                <Column field="processlength" header="Duljina procesa (s)" />
            </DataTable>

            {/* Date Filter Dialog */}
            <DateFilterDialog
                showDateFilterDialog={showDateFilterDialog}
                handleDateFilterCancel={handleDateFilterCancel}
                handleDateFilterApply={handleDateFilterApply}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                dateFilterOption={dateFilterOption}
                setDateFilterOption={setDateFilterOption}
            />
                
            <Chart ref={chartRef} type="line" data={chartData} options={chartOptions} />
            
        </div>
    );
};

export default HistoryTable;

