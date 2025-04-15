"use client"
import React, { useEffect, useRef, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { CSSProperties } from 'react';
import { Bacteria, ProcessConfigMode, ProcessInfoRow, StartProcessRequest } from '@/types/grpc';
import { Toast } from 'primereact/toast';
import { useToast } from '@/layout/context/toastcontext';
import { getUniqueProcessesAction, deleteProcessAction, startProcessAction } from '@/app/(main)/api/actions';

const ProcessTable = () => {
    const { showSuccess, showError, showWarn } = useToast();
    const [config, setConfig] = useState<ProcessInfoRow[]>([]);
    const [loading, setLoading] = useState(false);
    const [deleteLoadingId, setDeleteLoadingId] = useState<string | null>(null);
    const [proceedLoadingId, setProceedLoadingId] = useState<string | null>(null);
    const toast = useRef<Toast>(null);

    const deleteProcessRow = async (id: string) => {
        try {
            setDeleteLoadingId(id);
            await deleteProcessAction({id: parseInt(id)});
            
            // Remove the deleted item from the state
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
            console.log('Fetched processes:', response);
            setConfig(response.processesList);
        } catch (error) {
            showError('Proces', 'Došlo je do greške prilikom učitavanja procesa');
            console.error('Error fetching processes:', error);
        } finally {
            setLoading(false);
        }
    };

    const startProcessButton = async (rowData: ProcessInfoRow) => {
        try {
            setProceedLoadingId(rowData.id.toString());
            console.log('Starting process:', rowData);
            
            const bacteria: Bacteria = {
                id: rowData.bacteria.id,
                name: rowData.bacteria.name,
                description: '',
                d0: rowData.bacteria.d0,
                z: rowData.bacteria.z,
            };

            const request: StartProcessRequest = {                
                processConfig: {                                    
                    customTemp: 121.11,
                    finishTemp: 0, // not important for time
                    heatingType: 0,
                    maintainTemp: 116,
                    mode: ProcessConfigMode.TIME,
                    type: 1//rowData.type,
                },
                processInfo: {
                    productName: rowData.productname,
                    batchLTO: '',
                    bacteria: bacteria,
                    targetF: '0',
                    productQuantity: rowData.productquantity,
                    processStart: new Date().toISOString(),
                    processLength: 'Proces nije završen',
                    targetCoolingTime: ( parseFloat(rowData.targetcoolingtime) *60*1000).toString(),
                    targetHeatingTime: (parseFloat(rowData.targetheatingtime) *60*1000).toString(),
                },
            };
            console.log('Proces request', request);        
            
            startProcessAction(request);
            //setModalVisibility(false);
            
            showSuccess('Proces', 'Proces je uspješno pokrenut');
        } catch (error) {
            showError('Proces', 'Došlo je do greške prilikom pokretanja procesa');
            console.error('Error starting process:', error);
        } finally {
            setProceedLoadingId(null);
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
        { field: 'bacteria.name', header: 'Bakterija' },        
    ];   

    const deleteButton = (rowData: ProcessInfoRow) => {
        return (
            <Button 
                icon="pi pi-trash" 
                className="p-button-rounded p-button-danger" 
                onClick={() => deleteProcessRow(rowData.id.toString())}
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
                onClick={() => startProcessButton(rowData)}
                loading={proceedLoadingId === rowData.id.toString()}
                disabled={!!proceedLoadingId}
            />
        );
    };
    
    return (
        <div className="card p-fluid">
            <Toast ref={toast} />
            <DataTable 
                dataKey="id" 
                value={config}                 
                loading={loading}
                tableStyle={{ minWidth: '50rem' }}
            >
                {columns.map(({ field, header }) => (
                    <Column 
                        key={field} 
                        field={field} 
                        header={header} 
                        style={{ width: '10%', textAlign: 'left' as CSSProperties['textAlign'] }} 
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
        </div>
    );
}

export default ProcessTable;