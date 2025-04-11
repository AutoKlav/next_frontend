"use client"
import React, { useRef, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { CSSProperties } from 'react';
import { Bacteria } from '@/types/grpc';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';

interface BacteriaTableProps {
    bacteria: Bacteria[];
}

const BacteriaTable: React.FC<BacteriaTableProps> = ({ bacteria }) => {
    const [config, setConfig] = useState(bacteria);
    const toast = useRef<Toast>(null);
    const [isModalVisible, setModalVisibility] = useState(false);
    
    // Form state
    const [newBacteria, setNewBacteria] = useState({
        name: '',
        description: '',
        d0: 0,
        z: 0
    });

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

    const handleAddBacteria = () => {
        if (!newBacteria.name || newBacteria.d0 <= 0 || newBacteria.z <= 0) {
            toast.current?.show({
                severity: 'error',
                summary: 'Greška',
                detail: 'Molimo popunite sva obavezna polja',
                life: 3000
            });
            return;
        }
        
        const newId = config.length > 0 ? Math.max(...config.map(b => b.id)) + 1 : 1;
    
        setConfig(prevConfig => [
            ...prevConfig,
            {
                id: newId, // Now this is a number
                name: newBacteria.name,
                description: newBacteria.description,
                d0: newBacteria.d0,
                z: newBacteria.z
            }
        ]);

        toast.current?.show({
            severity: 'success',
            summary: 'Success',
            detail: 'Nova bakterija je dodana',
            life: 3000
        });

        setNewBacteria({
            name: '',
            description: '',
            d0: 0,
            z: 0
        });

        setModalVisibility(false);
    };

    const modalFooter = (
        <div>
            <Button label="Odustani" icon="pi pi-times" onClick={() => setModalVisibility(false)} className="p-button-text" />
            <Button label="Spremi" icon="pi pi-check" onClick={handleAddBacteria} />
        </div>
    );

    return (
        <div className="card p-fluid">
            <Toast ref={toast} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2 style={{ textAlign: 'left', margin: 0 }}>Globalne varijable</h2>
                <Button 
                    label="Dodaj bakteriju" 
                    icon="pi pi-plus" 
                    onClick={() => setModalVisibility(true)}
                    className="p-button-sm"
                />
            </div>
            
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

            <Dialog 
                header="Dodaj novu bakteriju" 
                visible={isModalVisible} 
                style={{ width: '50vw' }} 
                onHide={() => setModalVisibility(false)}
                footer={modalFooter}
            >
                <div className="p-fluid grid">
                    <div className="field col-12">
                        <label htmlFor="name">Ime*</label>
                        <InputText 
                            id="name" 
                            value={newBacteria.name} 
                            onChange={(e) => setNewBacteria({...newBacteria, name: e.target.value})} 
                            required 
                        />
                    </div>
                    <div className="field col-12">
                        <label htmlFor="description">Opis</label>
                        <InputText 
                            id="description" 
                            value={newBacteria.description} 
                            onChange={(e) => setNewBacteria({...newBacteria, description: e.target.value})} 
                        />
                    </div>
                    <div className="field col-6">
                        <label htmlFor="d0">d0*</label>
                        <InputNumber 
                            id="d0" 
                            value={newBacteria.d0} 
                            onValueChange={(e) => setNewBacteria({...newBacteria, d0: e.value || 0})} 
                            mode="decimal" 
                            min={0} 
                            required 
                        />
                    </div>
                    <div className="field col-6">
                        <label htmlFor="z">z*</label>
                        <InputNumber 
                            id="z" 
                            value={newBacteria.z} 
                            onValueChange={(e) => setNewBacteria({...newBacteria, z: e.value || 0})} 
                            mode="decimal" 
                            min={0} 
                            required 
                        />
                    </div>
                </div>
            </Dialog>
        </div>
    );
}

export default BacteriaTable;