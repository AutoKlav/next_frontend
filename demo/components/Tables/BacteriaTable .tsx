"use client"
import React, { useRef, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputNumber } from 'primereact/inputnumber';
import { CSSProperties } from 'react';
import { setVariableAction } from '@/app/(main)/api/actions';
import { BacteriaList, SetVariable, } from '@/types/grpc';
import { useMutation } from '@tanstack/react-query';
import { Toast } from 'primereact/toast';

const BacteriaTable  = (bacteria: BacteriaList) => {
    const [config, setConfig] = useState([
        ...bacteria.bacteriaList
    ]);

    const toast = useRef<Toast>(null);
    console.log(bacteria);
    const columns = [
        { field: 'name', header: 'Ime', editable: false },
        { field: 'description', header: 'Opis', editable: false },
        { field: 'd0', header: 'd0', editable: false },
        { field: 'z', header: 'z', editable: false }
    ];   

    return (
        <div className="card p-fluid">
            <Toast ref={toast} />
            <h2 style={{ textAlign: 'left' }}>Globalne varijable</h2>
            <DataTable 
                dataKey="id" 
                editMode="row" 
                value={config}                 
                loading={false}
                tableStyle={{ minWidth: '50rem' }}>
                {columns.map(({ field, header }) => {
                    const columnProps = {
                        field: field,
                        header: header,
                        style: { width: '50%', textAlign: 'left' as CSSProperties['textAlign'] },
                    };

                    return <Column key={field} {...columnProps} />;
                })}
                <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
            </DataTable>
        </div>
    );
}

export default BacteriaTable;