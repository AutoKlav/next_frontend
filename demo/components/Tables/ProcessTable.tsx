"use client"
import React, { useEffect, useRef, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { CSSProperties } from 'react';
import { Bacteria, HeatingType, ProcessConfigMode, ProcessInfoRow, StartProcessRequest } from '@/types/grpc';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { useToast } from '@/layout/context/toastcontext';
import { getUniqueProcessesAction, deleteProcessAction, startProcessAction } from '@/app/(main)/api/actions';
import { confirmDialog } from 'primereact/confirmdialog';

interface ProcessTableProps {
    onProcessStart?: () => void;
}

const ProcessTable = ({ onProcessStart }: ProcessTableProps) => {
    const { showSuccess, showError, showWarn } = useToast();
    const [config, setConfig] = useState<ProcessInfoRow[]>([]);
    const [loading, setLoading] = useState(false);
    const [deleteLoadingId, setDeleteLoadingId] = useState<string | null>(null);
    const [proceedLoadingId, setProceedLoadingId] = useState<string | null>(null);
    const [showBatchDialog, setShowBatchDialog] = useState(false);
    const [batchLTO, setBatchLTO] = useState('');
    const [selectedRow, setSelectedRow] = useState<ProcessInfoRow | null>(null);
    const toast = useRef<Toast>(null);

    const deleteConfirmation = (id: string) => {
        confirmDialog({
            message: 'Jeste li sigurni da želite obrisati proces?',
            header: 'Potvrda brisanja',
            icon: 'pi pi-exclamation-triangle',
            rejectLabel: 'Odustani',
            acceptLabel: 'Obriši',
            accept: () => deleteProcessRow(id),
        });
    }
    const deleteProcessRow = async (id: string) => {
        try {
            setDeleteLoadingId(id);
            await deleteProcessAction({ id: parseInt(id) });

            setConfig(prevConfig => prevConfig.filter(item => item.id.toString() !== id));
            showSuccess('Proces', 'Proces je uspješno izbrisan');
        } catch (error) {
            showError('Proces', 'Došlo je do greške prilikom brisanja procesa');
            console.error('Error deleting process:', error);
        } finally {
            setDeleteLoadingId(null);
        }
    };

    const fetchProcesses = async () => {
        try {
            setLoading(true);
            const response = await getUniqueProcessesAction();
            setConfig(response.processesList);
        } catch (error) {
            showError('Proces', 'Došlo je do greške prilikom učitavanja procesa');
            console.error('Error fetching processes:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleProceedClick = (rowData: ProcessInfoRow) => {
        setSelectedRow(rowData);
        setShowBatchDialog(true);
    };

    const startProcessButton = async () => {
        if (!selectedRow) return;

        try {
            setProceedLoadingId(selectedRow.id.toString());

            const bacteria: Bacteria = {
                id: selectedRow.bacteria.id,
                name: selectedRow.bacteria.name,
                description: '',
                d0: selectedRow.bacteria.d0,
                z: selectedRow.bacteria.z,
            };

            const processType = {
                id: selectedRow.processtype.id,
                customTemp: selectedRow.processtype.customtemp,
                maintainTemp: selectedRow.processtype.maintaintemp,
                d0: bacteria.d0,
                z: bacteria.z,
                name: selectedRow.processtype.name,
                description: '',
            }

            const request: StartProcessRequest = {
                processConfig: {
                    heatingType: HeatingType.STEAM,
                    mode: ProcessConfigMode.TIME,
                },
                processInfo: {
                    productName: selectedRow.productname,
                    batchLTO: batchLTO || '', // Use the entered batchLTO or empty string
                    bacteria: bacteria,
                    targetF: '0',
                    productQuantity: selectedRow.productquantity,
                    processStart: new Date().toISOString(),
                    processLength: 'Proces nije završen',
                    targetCoolingTime: (parseFloat(selectedRow.targetcoolingtime) * 60 * 1000).toString(),
                    targetHeatingTime: (parseFloat(selectedRow.targetheatingtime) * 60 * 1000).toString(),
                    processType: processType,
                    finishTemp: '',
                },
            };

            await startProcessAction(request);
            showSuccess('Proces', 'Proces je uspješno pokrenut');

            if (onProcessStart) {
                onProcessStart();
            }
        } catch (error) {
            showError('Proces', 'Došlo je do greške prilikom pokretanja procesa');
            console.error('Error starting process:', error);
        } finally {
            setProceedLoadingId(null);
            setShowBatchDialog(false);
            setBatchLTO('');
            setSelectedRow(null);
        }
    };

    useEffect(() => {
        fetchProcesses();
    }, []);

    const columns = [
        { field: 'productname', header: 'Ime' },
        { field: 'productquantity', header: 'Količina' },
        { field: 'targetheatingtime', header: 'Vrijeme grijanja (min)' },
        { field: 'targetcoolingtime', header: 'Vrijeme hlađenja (min)' },
        { field: 'processtype.customtemp', header: 'Prilagođena temperatura' },
        { field: 'processtype.name', header: 'Ime tipa' },
        { field: 'processtype.maintaintemp', header: 'Temperatura održavanja' },
        { field: 'bacteria.name', header: 'Bakterija' },
    ];

    const deleteButton = (rowData: ProcessInfoRow) => {
        return (
            <Button
                icon="pi pi-trash"
                className="p-button-rounded p-button-danger"
                onClick={() => deleteConfirmation(rowData.id.toString())}
                loading={deleteLoadingId === rowData.id.toString()}
                disabled={!!deleteLoadingId}
            />
        );
    };

    const proceedButton = (rowData: ProcessInfoRow) => {
        return (
            <Button
                icon="pi pi-arrow-right"
                className="p-button-rounded p-button-primary"
                onClick={() => handleProceedClick(rowData)}
                loading={proceedLoadingId === rowData.id.toString()}
                disabled={!!proceedLoadingId}
            />
        );
    };

    const batchDialogFooter = (
        <div>
            <Button label="Odustani" icon="pi pi-times" onClick={() => {
                setShowBatchDialog(false);
                setBatchLTO('');
                setSelectedRow(null);
            }} className="p-button-text" />
            <Button label="Pokreni" icon="pi pi-check" onClick={startProcessButton} autoFocus />
        </div>
    );

    return (
        <div className="card p-fluid">
            <Toast ref={toast} />
            <DataTable
                dataKey="id"
                value={config}
                loading={loading}
                tableStyle={{ minWidth: '50rem' }}
                paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}
            >
                {columns.map(({ field, header }) => (
                    <Column
                        key={field}
                        field={field}
                        header={header}
                        style={{ width: '10%', textAlign: 'left' as CSSProperties['textAlign'] }}
                        sortable={field === 'productname' || field === 'productquantity'} // Enable sorting for these fields
                    />
                ))}
                <Column
                    body={deleteButton}
                    headerStyle={{ width: '5%', minWidth: '2rem' }}
                    bodyStyle={{ textAlign: 'center' }}
                />
                <Column
                    body={proceedButton}
                    headerStyle={{ width: '5%', minWidth: '2rem' }}
                    bodyStyle={{ textAlign: 'center' }}
                />
            </DataTable>

            <Dialog
                header="Unesite broj šarže"
                visible={showBatchDialog}
                style={{ width: '30vw' }}
                onHide={() => {
                    setShowBatchDialog(false);
                    setBatchLTO('');
                    setSelectedRow(null);
                }}
                footer={batchDialogFooter}
            >
                <div className="p-fluid">
                    <div className="field">
                        <label htmlFor="batchLTO">Broj šarže (opcionalno)</label>
                        <InputText
                            id="batchLTO"
                            value={batchLTO}
                            onChange={(e) => setBatchLTO(e.target.value)}
                            placeholder="LOT356357"
                        />
                    </div>
                </div>
            </Dialog>
        </div>
    );
}

export default ProcessTable;