"use client"
import React, { useEffect, useRef, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { CSSProperties } from 'react';
import { ProcessInfoList, ProcessInfoRow } from '@/types/grpc';
import { Toast } from 'primereact/toast';
import { useToast } from '@/layout/context/toastcontext';
import { getUniqueProcessesAction, deleteProcessAction } from '@/app/(main)/api/actions';

interface ProcessTableProps {
    
}

const ProcessTable: React.FC<ProcessTableProps> = () => {
    const { showSuccess, showError, showWarn } = useToast();
    const [config, setConfig] = useState<ProcessInfoRow[]>([]);
    const [loading, setLoading] = useState(false);
    const toast = useRef<Toast>(null);

    const deleteProcessRow = async (id: string) => {
        try {
            setLoading(true);
            await deleteProcessAction({id: parseInt(id)});
            
            // Use functional update to ensure we have the latest state
            //setConfig(prevConfig => prevConfig.filter(item => item.id.toString() !== id));
            
            showSuccess('Proces', 'Proces je uspješno izbrisana');
        } catch (error) {
            showError('Proces', 'Došlo je do greške prilikom brisanja bakterije');
            console.error('Error deleting process:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchProcesses = async () => {
        try {
            setLoading(true);
            const response = await getUniqueProcessesAction();
            setConfig(response.processesList);
        } catch (error) {
            showError('Bakterija', 'Došlo je do greške prilikom učitavanja bakterija');
            console.error('Error fetching bacteria:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {        
        fetchProcesses();        
    }, []);

    const columns = [
        { field: 'productname', header: 'Ime' },
        { field: 'productquantity', header: 'Količina' },
        { field: 'targetHeatingTime', header: 'Ciljano vrijeme grijanja' },
        { field: 'targetCoolingTime', header: 'Ciljano vrijeme hlađenja' },        
        { field: 'bacteria.name', header: 'Bakterija' },        
    ];   

    const deleteButton = (rowData: ProcessInfoList) => {
        return (
            <Button 
                icon="pi pi-trash" 
                className="p-button-rounded p-button-danger" 
                //onClick={() => deleteProcessRow(rowData.id.toString())}
                loading={loading}
                disabled={loading}
            />
        );
    };
    
    return (
        <div className="card p-fluid">
            <Toast ref={toast} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2 style={{ textAlign: 'left', margin: 0 }}>Procesi</h2>                
            </div>
            
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
                        style={{ width: '50%', textAlign: 'left' as CSSProperties['textAlign'] }} 
                    />
                ))}
                <Column 
                    body={deleteButton} 
                    headerStyle={{ width: '10%', minWidth: '8rem' }} 
                    bodyStyle={{ textAlign: 'center' }} 
                />
            </DataTable>            
        </div>
    );
}

export default ProcessTable;