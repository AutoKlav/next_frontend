"use client"
import React, { useRef, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputNumber } from 'primereact/inputnumber';
import { CSSProperties } from 'react';
import { setVariableAction } from '@/app/(main)/api/actions';
import { SetVariable, Variables } from '@/types/grpc';
import { useMutation } from '@tanstack/react-query';
import { Toast } from 'primereact/toast';

interface VariableProps {
    data: Variables;
}

const VariablesTable  = (variables: VariableProps) => {
    const [config, setConfig] = useState([
        { id: 'targetK', label: 'Target K', value: variables?.data?.targetk || '0'},
        { id: 'serialDataTime', label: 'Serial Data Time', value: variables?.data?.serialdatatime || '0' },
        { id: 'stateMachineTick', label: 'State Machine Tick', value: variables?.data?.statemachinetick || '0' },
        { id: 'sterilizationTemp', label: 'Sterilization Temperature', value: variables?.data?.sterilizationtemp || '0' },
        { id: 'pasterizationTemp', label: 'Pasterization Temperature', value: variables?.data?.pasterizationtemp || '0' }
    ]);

    const toast = useRef<Toast>(null);

    const columns = [
        { field: 'label', header: 'Parameter', editable: false },
        { field: 'value', header: 'Value', editable: true }
    ];

    const {isLoading, mutate: setVariableMutation} = useMutation(setVariableAction, {
        onSuccess: (response) => {           
            if (response.response.errorsstring.includes('14 UNAVAILABLE')) {                
                toast.current?.show({ severity: 'error', summary: 'Greška', detail: 'Neuspješno postavljanje vrijednosti. Backend nije u funkciji.' });
                return;
            }            
            
            setConfig((prevConfig) => {
                let _config = [...prevConfig];
                let { newData, index } = response;
                _config[index] = newData;
                return _config;
            });            
        }
    });

    const onRowEditComplete = (e: any) => {
        let _config = [...config];
        let { newData, index } = e;
        _config[index] = newData;
        
        if(newData.value < 0){                                    
            toast.current?.show({ severity: 'error', summary: 'Greška', detail: 'Vrijednost mora biti veća od 0.' });
            return;
        }

        const variable = 
        {
            "name": newData.id,
            "value": newData.value.toString()
        } as SetVariable;    
        
        setVariableMutation({newData, index, variable });
    };

    const cellEditor = (options: any) => {
        return numberEditor(options);
    };

    const numberEditor = (options: any) => {
        return <InputNumber value={options.value} onValueChange={(e) => options.editorCallback(e.value)} onKeyDown={(e) => e.stopPropagation()} />;
    };

    return (
        <div className="card p-fluid">
            <Toast ref={toast} />
            <h2 style={{ textAlign: 'left' }}>Globalne varijable</h2>
            <DataTable 
                dataKey="id" 
                editMode="row" 
                value={config} 
                onRowEditComplete={onRowEditComplete}
                loading={isLoading}
                tableStyle={{ minWidth: '50rem' }}>
                {columns.map(({ field, header, editable }) => {
                    const columnProps = {
                        field: field,
                        header: header,
                        style: { width: '50%', textAlign: field === 'value1' ? 'center' as CSSProperties['textAlign'] : 'left' as CSSProperties['textAlign'] },
                        editor: editable ? (options: any) => cellEditor(options) : undefined
                    };

                    return <Column key={field} {...columnProps} />;
                })}
                <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
            </DataTable>
        </div>
    );
}

export default VariablesTable;