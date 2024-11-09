"use client"
import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputNumber } from 'primereact/inputnumber';
import { CSSProperties } from 'react';
import { setVariableAction } from '@/app/(main)/api/actions';
import { SetVariable, Variables } from '@/types/grpc';

interface VariableProps {
    data: Variables;
}

const VariablesTable  = (variables: VariableProps) => {    
    const variable1 = 
        [
            {
                "name": "targetK",
                "value": "6"
            },
            {
                "name": "serialDataTime",
                "value": "3001"
            },
            {
                "name": "stateMachineTick",
                "value": "60001"
            },
            {
                "name": "sterilizationTemp",
                "value": "121"
            },
            {
                "name": "pasterizationTemp",
                "value": "71"
            }
        ] as SetVariable[];

    //setVariableAction(variables[0]);
    //console.log(variables);    
    const [config, setConfig] = useState([
        { id: 'targetK', label: 'Target K', value: variables?.data?.targetk || '0'},
        { id: 'serialDataTime', label: 'Serial Data Time', value: '3000' },
        { id: 'stateMachineTick', label: 'State Machine Tick', value: '60000' },
        { id: 'sterilizationTemp', label: 'Sterilization Temperature', value: '120' },
        { id: 'pasterizationTemp', label: 'Pasterization Temperature', value: '70' }
    ]);

    const columns = [
        { field: 'label', header: 'Parameter', editable: false },
        { field: 'value', header: 'Value', editable: true }
    ];

    const onRowEditComplete = (e: any) => {
        let _config = [...config];
        let { newData, index } = e;
        console.log(e);
        _config[index] = newData;
        const variable = 
        {
            "name": newData.id,
            "value": newData.value.toString()
        } as SetVariable;

        setVariableAction(variable);
        setConfig(_config);
    };

    const cellEditor = (options: any) => {
        return numberEditor(options);
    };

    const numberEditor = (options: any) => {
        return <InputNumber value={options.value} onValueChange={(e) => options.editorCallback(e.value)} onKeyDown={(e) => e.stopPropagation()} />;
    };

    return (
        <div className="card p-fluid">
            <h2 style={{ textAlign: 'left' }}>Globalne varijable</h2>
            <DataTable value={config} editMode="row" dataKey="id" onRowEditComplete={onRowEditComplete} tableStyle={{ minWidth: '50rem' }}>
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