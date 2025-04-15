"use client"
import React, { useEffect, useRef, useState } from 'react';
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
import { createBacteriaAction, deleteBacteriaAction, getBacteriaAction } from '@/app/(main)/api/actions';

interface BacteriaTableProps {
    bacteria?: Bacteria[];
}

const BacteriaTable: React.FC<BacteriaTableProps> = ({ bacteria }) => {
    const { showSuccess, showError, showWarn } = useToast();
    const [config, setConfig] = useState<Bacteria[]>([]);
    const [loading, setLoading] = useState(false);
    const toast = useRef<Toast>(null);
    const [isModalVisible, setModalVisibility] = useState(false);
    
    // Form state
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const d0 = useRef<number>(0);
    const z = useRef<number>(0);

    const deleteBacteriaRow = async (id: string) => {
        try {
            setLoading(true);
            await deleteBacteriaAction({id: parseInt(id)});
            
            // Use functional update to ensure we have the latest state
            setConfig(prevConfig => prevConfig.filter(item => item.id.toString() !== id));
            
            showSuccess('Bakterija', 'Bakterija je uspješno izbrisana');
        } catch (error) {
            showError('Bakterija', 'Došlo je do greške prilikom brisanja bakterije');
            console.error('Error deleting bacteria:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchBacteria = async () => {
        try {
            setLoading(true);
            const response = await getBacteriaAction();
            setConfig(response.bacteriaList);
        } catch (error) {
            showError('Bakterija', 'Došlo je do greške prilikom učitavanja bakterija');
            console.error('Error fetching bacteria:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {        
        fetchBacteria();        
    }, []);

    const columns = [
        { field: 'name', header: 'Ime' },
        { field: 'description', header: 'Opis'},
        { field: 'd0', header: 'd0' },
        { field: 'z', header: 'z' }
    ];   

    const deleteButton = (rowData: Bacteria) => {
        return (
            <Button 
                icon="pi pi-trash" 
                className="p-button-rounded p-button-danger" 
                onClick={() => deleteBacteriaRow(rowData.id.toString())}
                loading={loading}
                disabled={loading}
            />
        );
    };

    const handleAddBacteria = async () => {
        if (!name || d0.current <= 0 || z.current <= 0) {
            showError('Bakterija', 'Molimo popunite sva obavezna polja');
            return;
        }
        
        try {
            setLoading(true);
            const newId = config.length > 0 ? Math.max(...config.map(b => b.id)) + 1 : 1;
            const bacteria: Bacteria = {
                id: newId,
                name: name,
                description: description,
                d0: d0.current,
                z: z.current
            };
            
            await createBacteriaAction(bacteria);
            
            // Use functional update
            setConfig(prevConfig => [...prevConfig, bacteria]);
            showSuccess('Bakterija', 'Nova bakterija je uspješno dodana');

            // Reset form
            setName('');
            setDescription('');
            d0.current = 0;
            z.current = 0;
            setModalVisibility(false);
        } catch (error) {
            showError('Bakterija', 'Došlo je do greške prilikom dodavanja bakterije');
            console.error('Error adding bacteria:', error);
        } finally {
            setLoading(false);
        }
    };

    const modalFooter = (
        <div>
            <Button 
                label="Odustani" 
                icon="pi pi-times" 
                onClick={() => setModalVisibility(false)} 
                className="p-button-text" 
                disabled={loading}
            />
            <Button 
                label="Spremi" 
                icon="pi pi-check" 
                onClick={handleAddBacteria} 
                loading={loading}
                disabled={loading}
            />
        </div>
    );

    return (
        <div className="card p-fluid">
            <Toast ref={toast} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2 style={{ textAlign: 'left', margin: 0 }}>Bakterije</h2>
                <div style={{ textAlign: 'right' }}>
                    <Button 
                        label="Dodaj bakteriju" 
                        icon="pi pi-plus" 
                        onClick={() => setModalVisibility(true)}
                        className="p-button-sm"
                        disabled={loading}
                    />
                </div>
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

            <Dialog 
                header="Dodaj novu bakteriju" 
                visible={isModalVisible} 
                style={{ width: '50vw' }} 
                onHide={() => !loading && setModalVisibility(false)}
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
                            inputValue={d0}
                            disabled={loading}
                        />
                    </div>
                    <div className="col-6">
                        <GeneralNumberInput 
                            headerName="z*" 
                            inputValue={z}
                            disabled={loading}
                        />
                    </div>
                </div>
            </Dialog>
        </div>
    );
}

export default BacteriaTable;