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
import { formatDateTime, secondsToHms } from "@/utils/dateUtil";
import { delay } from "@/utils/delayUtil";
import { generateTablePDF } from "@/utils/generateTableUtil";
import { hideFSumFR } from "@/utils/targetTimeOrFevaulator";
import { ProcessInfoList } from "@/types/grpc";

const HistoryTable = () => {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState<ChartOptions<"line">>({});
    const chartRef = useRef<any>(null);
    const dt = useRef<DataTable<ProcessInfoList[]>>(null);

    const router = useRouter()
    const { showError } = useToast();

    const { data: processesDataQuery, isLoading: loading } = useQuery({
        queryKey: ["processesDataQuery"],
        queryFn: async () => {
            const response = await getProcessesAction();

            return response?.processesList?.map((process) => ({
                ...process,
                processstart: new Date(process.processstart!), // Ensure it's a Date object
                processType: Number(process.targetf) ? 'F vrijednost' : 'Vrijeme' // Add computed field
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

    const { isLoading: isLogLoading, mutateAsync: getProcessLogMutation } = useMutation(getProcessLogsAction, {
        onSuccess: async ({ data, source }) => {
            if (source === "print") {
                const hideFSumFRBool = hideFSumFR(selectedProcesses[0].targetf.toString());

                updateChartData(transformData({ processlogsList: data?.processlogsList }), hideFSumFRBool, setChartData);

                // Wait for 3 seconds before moving to the next iteration until Chart 
                // loads animation is complete
                await delay(3000);

                const chartInfo = getChartInfo(selectedProcesses[0]);
                handleExportToPDF(chartRef, chartOptions, chartInfo);
            } else if (source === "graph") {
                router.push(`/chart/${data?.processlogsList[0]?.id}`);
            } else if (source === "modularGraph") {
                router.push(`/values_chart/${data?.processlogsList[0]?.id}`);
            } else if (source === "handleTableExport") {
                const chartInfo = getChartInfo(selectedProcesses[0], true);
                generateTablePDF(chartInfo, data);
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
        dt.current?.reset(); // clears filters, sorting, pagination, and selection :contentReference[oaicite:2]{index=2}
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-content-between">
                <Button
                    type="button"
                    icon="pi pi-filter-slash"
                    label="Očisti filtere i sortiranje"
                    outlined
                    onClick={clearFilter}
                />
                <div className="flex justify-content-between gap-3">
                    {selectedProcesses.length === 1 && (
                        <Button
                            icon="pi pi-star"
                            className="p-button-text p-button-plain"
                            size="large"
                            onClick={handleGraph}
                        />
                    )}
                    {selectedProcesses.length === 1 && (
                        <Button
                            icon="pi pi-chart-bar"
                            className="p-button-text p-button-plain"
                            size="large"
                            onClick={handleModularGraph}
                        />
                    )}
                    {selectedProcesses.length === 1 && (
                        <Button
                            icon="pi pi-file-excel"
                            className="p-button-text p-button-plain"
                            size="large"
                            onClick={handleTableExport}
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
        fetchAndDisplaySequential();
    };

    const handleGraph = () => {
        const ids = selectedProcesses.map((process) => process.id);
        getProcessLogMutation({ id: ids[0], source: "graph" });
    };

    const handleModularGraph = () => {
        const ids = selectedProcesses.map((process) => process.id);
        getProcessLogMutation({ id: ids[0], source: "modularGraph" });
    }

    const handleTableExport = async () => {

        const ids = selectedProcesses.map((process) => process.id);

        for (const id of ids) {
            await getProcessLogMutation({ id, source: "handleTableExport" });
        }
    }

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
        return formatDateTime(date.toString());
    };

    const header = renderHeader();

    // Set 
    useEffect(() => {
        setChartOptions(updateChartOptions("white", "white", { id: 1, title: '', subtitle: '' })); // Initial white theme
    }, []);

    useEffect(() => {
        //fetchAndDisplaySequential();
    }, [selectedProcesses]);

    const fetchAndDisplaySequential = async () => {
        const ids = selectedProcesses.map((process) => process.id);

        for (const id of ids) {
            await getProcessLogMutation({ id, source: "print" });
        }
    }

    return (
        <div className="card">
            <h2>Povijest procesa</h2>
            <DataTable
                ref={dt}
                className="p-datatable-gridlines"
                showGridlines
                value={processesDataQuery || []}
                loading={loading || isLogLoading}
                paginator
                rows={5}
                rowsPerPageOptions={[5, 10, 25, 50]}
                dataKey="id"
                filters={filters}
                selectionMode="multiple" // Add this required prop
                selection={selectedProcesses}
                onSelectionChange={(e) => setSelectedProcesses(e.value)}
                filterDisplay="menu"
                globalFilterFields={["productname", "processstart"]}
                header={header}
                emptyMessage="Nema pronađenih procesa."
            >
                <Column selectionMode="multiple" headerStyle={{ width: "3em" }} />
                <Column field="productname" header="Naziv procesa" />
                <Column field="productquantity" header="Količina" />
                <Column
                    field="processstart"
                    header="Datum početka"
                    body={(rowData) => formatDate(rowData.processstart)} // Format date before displaying
                />
                <Column
                    field="processType"
                    header="Tip procesa"
                    sortable
                    body={(rowData) => rowData?.processType || "N/A"}
                />
                <Column
                    field="processlength"
                    header="Duljina procesa (s)"
                    body={(rowData) => secondsToHms(rowData.processlength)}
                />
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

