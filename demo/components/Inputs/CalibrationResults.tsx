import React from 'react';
import { InputNumber } from 'primereact/inputnumber';

interface CalibrationResultsProps {
    maxCalibratedValue: number;
    minCalibratedValue: number;
}

const CalibrationResults: React.FC<CalibrationResultsProps> = (props) => {
    const { maxCalibratedValue, minCalibratedValue } = props;
    return (
        <div className="flex flex-row gap-2">
        <div className="flex flex-column gap-2">
            <label>Minimalna kalibrirana vrijednost</label>
            <InputNumber 
                value={maxCalibratedValue}
                readOnly
                className="p-inputtext-md p-1"
                style={{ borderRadius: '13px' }} 
            />
        </div>
        <div className="flex flex-column gap-2">
            <label>Maksimalna kalibrirana vrijednost</label>
            <InputNumber 
                value={minCalibratedValue}
                readOnly
                className="p-inputtext-md p-1"
                style={{ borderRadius: '13px' }} 
            />
        </div>
    </div>            
    );
}

export default CalibrationResults;