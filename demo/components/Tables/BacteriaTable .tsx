"use client"
import React, { useRef, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { CSSProperties } from 'react';
import { BacteriaList } from '@/types/grpc';
import { Toast } from 'primereact/toast';

const BacteriaTable = (bacteria: BacteriaList) => {
    const [config, setConfig] = useState([...bacteria.bacteriaList]);
    const toast = useRef<Toast>(null);

    const deleteRow = (id: string) => {
        setConfig(prevConfig => prevConfig.filter(item => item.id.toString() !== id));
        toast.current?.show({ severity: 'warn', summary: 'Deleted', detail: 'Row has been deleted', life: 3000 });
    };

    const columns = [
        { field: 'name', header: 'Ime' },
        { field: 'description', header: 'Opis'},
        { field: 'd0', header: 'd0' },
        { field: 'z', header: 'z' }
    ];   

    const deleteButton = (rowData: any) => {
        return <Button icon="pi pi-trash" className="p-button-rounded" onClick={() => deleteRow(rowData.id)} />;
    };

    return (
        <div className="card p-fluid">
            <Toast ref={toast} />
            <h2 style={{ textAlign: 'left' }}>Globalne varijable</h2>
            <DataTable 
                dataKey="id" 
                value={config}                 
                loading={false}
                tableStyle={{ minWidth: '50rem' }}>
                {columns.map(({ field, header }) => (
                    <Column 
                        key={field} 
                        field={field} 
                        header={header} 
                        style={{ width: '50%', textAlign: 'left' as CSSProperties['textAlign'] }} 
                    />
                ))}
                <Column body={deleteButton} headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }} />
            </DataTable>
        </div>
    );
}

export default BacteriaTable;