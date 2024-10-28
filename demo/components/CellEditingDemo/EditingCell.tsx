import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';

export default function RowEditingDemo() {
    const [products, setProducts] = useState([
        { id: 'temp', label: 'Temperatura Autoklava', pinName: 10, minValue: 0, maxValue: 150 },
        { id: 'tempK', label: 'Temperatura konzerve', pinName: 11, minValue: 0, maxValue: 150 },
        { id: 'pressure', label: 'Tlak', pinName: 12, minValue: 0, maxValue: 3 },
        { id: 'waterFill', label: 'Punjenje vodom', pinName: 'IO_0', minValue: 0, maxValue: 1 },
        { id: 'heating', label: 'Grijanje', pinName: 'IO_1', minValue: 0, maxValue: 1 },
        { id: 'bypass', label: 'Zaobilaznica', pinName: 'IO_2', minValue: 0, maxValue: 1 },
        { id: 'pump', label: 'Pumpa', pinName: 'IO_3', minValue: 0, maxValue: 1 },
        { id: 'inPressure', label: 'Ulazni tlak', pinName: 'IO_4', minValue: 0, maxValue: 1 },
        { id: 'cooling', label: 'Hlađenje', pinName: 'IO_5', minValue: 0, maxValue: 1 }
    ]);

    const columns = [
        { field: 'label', header: 'Akcija', editable: false },
        { field: 'pinName', header: 'Ime pina', editable: true },
        { field: 'minValue', header: 'Najmanja vrijednost', editable: true },
        { field: 'maxValue', header: 'Najveća vrijednost', editable: true }
    ];

    const onRowEditComplete = (e: any) => {
        let _products = [...products];
        let { newData, index } = e;

        _products[index] = newData;

        setProducts(_products);
    };

    const cellEditor = (options: any) => {
        if (options.field === 'minValue' || options.field === 'maxValue') return numberEditor(options);
        else return textEditor(options);
    };

    const textEditor = (options: any) => {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} onKeyDown={(e) => e.stopPropagation()} />;
    };

    const numberEditor = (options: any) => {
        return <InputNumber value={options.value} onValueChange={(e) => options.editorCallback(e.value)} onKeyDown={(e) => e.stopPropagation()} />;
    };

    return (
        <div className="card p-fluid">
            <h2 style={{ textAlign: 'left' }}>Kalibracija senzora</h2>
            <DataTable value={products} editMode="row" dataKey="id" onRowEditComplete={onRowEditComplete} tableStyle={{ minWidth: '50rem' }}>
                {columns.map(({ field, header, editable }) => {
                    const columnProps = {
                        key: field,
                        field: field,
                        header: header,
                        style: { width: '25%', textAlign: field !== 'label' && field !=='pinName' ? 'center' : 'left' },
                        editor: editable ? (options: any) => cellEditor(options) : undefined
                    };

                    return <Column {...columnProps} />;
                })}
                <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
            </DataTable>
        </div>
    );
}