"use client"
import React, { useRef, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { CSSProperties } from 'react';
import { Bacteria } from '@/types/grpc';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import GeneralStringInput from '@/demo/components/Inputs/GeneralInput/GeneralStringInput';
import GeneralNumberInput from '@/demo/components/Inputs/GeneralInput/GeneralNumberInput';
import { useToast } from '@/layout/context/toastcontext';

interface BacteriaTableProps {
    bacteria: Bacteria[];
}

const BacteriaTable: React.FC<BacteriaTableProps> = ({ bacteria }) => {
    const { showSuccess, showError, showWarn } = useToast();
    const [config, setConfig] = useState(bacteria);
    const toast = useRef<Toast>(null);
    const [isModalVisible, setModalVisibility] = useState(false);
    
    // Form state using refs for numbers to match DashboardPage pattern
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const d0 = useRef<number>(0);
    const z = useRef<number>(0);

    const deleteRow = (id: string) => {
        setConfig(prevConfig => prevConfig.filter(item => item.id.toString() !== id));
        showSuccess('Bakterija', 'Bakterija je izbrisana');
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
        if (!name || d0.current <= 0 || z.current <= 0) {
            showError('Bakterija', 'Molimo popunite sva obavezna polja');
            return;
        }
        
        const newId = config.length > 0 ? Math.max(...config.map(b => b.id)) + 1 : 1;
    
        setConfig(prevConfig => [
            ...prevConfig,
            {
                id: newId,
                name: name,
                description: description,
                d0: d0.current,
                z: z.current
            }
        ]);

        showSuccess('Bakterija', 'Nova bakterija je dodana');

        // Reset form
        setName('');
        setDescription('');
        d0.current = 0;
        z.current = 0;

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
                <div style={{ textAlign: 'right' }}>
                    <Button 
                        label="Dodaj bakteriju" 
                        icon="pi pi-plus" 
                        onClick={() => setModalVisibility(true)}
                        className="p-button-sm"
                    />
                </div>
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
                <div className="grid">
                    <div className="col-6">
                        <GeneralStringInput 
                            headerName="Ime*" 
                            placeholder="Unesite ime bakterije"
                            inputValue={[name, setName]}
                            suggestions={[]}
                        />
                    </div>
                    <div className="col-6">
                        <GeneralStringInput 
                            headerName="Opis" 
                            placeholder="Unesite opis bakterije"
                            inputValue={[description, setDescription]}
                            suggestions={[]}
                        />
                    </div>
                    <div className="col-6">
                        <GeneralNumberInput 
                            headerName="d0*" 
                            inputValue={z}
                        />
                    </div>
                    <div className="col-6">
                        <GeneralNumberInput 
                            headerName="z*" 
                            inputValue={d0}
                        />
                    </div>
                </div>
            </Dialog>
        </div>
    );
}

export default BacteriaTable;