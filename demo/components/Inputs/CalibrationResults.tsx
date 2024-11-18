import React from 'react';
import { InputNumber } from 'primereact/inputnumber';

interface CalibrationResultsProps {
    x1x2: number[];
    y1y2: number[];
    sensorName: string | undefined;
}

// Helper function to calculate line equation (optional, for reference)
const calculateLineEquation = (x1x2: number[], y1y2: number[]) => {
    if (x1x2.length !== 2 || y1y2.length !== 2) {
        console.error("Invalid input arrays. Both arrays must contain exactly two elements.");
        return;
    }

    // Input from sensor
    const [x1, x2] = x1x2;

    // Input from user
    const [y1, y2] = y1y2;

    // Calculate line equation
    const m = (y2 - y1) / (x2 - x1);
    const b = y1 - m * x1;
    console.log(`Line equation: y = ${m}x + ${b}`);
    
    const calibratedMinimum = m*x1+b;
    const calibratedMaximum = m*x2+b;
    return [calibratedMinimum, calibratedMaximum];
};

const CalibrationResults: React.FC<CalibrationResultsProps> = (props) => {
    const { x1x2, y1y2, sensorName } = props;
    const result = calculateLineEquation(x1x2, y1y2);
    const [calibratedMinimum, calibratedMaximum] = result || [0, 0];
    
    return (
        <>
        <h3>{sensorName}</h3>
        <div className="flex flex-row gap-2">
        <div className="flex flex-column gap-2">
            <label>Unesena minimalna vrijednost</label>
            <InputNumber 
                value={y1y2[0]}
                readOnly
                className="p-inputtext-md p-1"
                style={{ borderRadius: '13px' }} 
            />
            <label>Očitana minimalna vrijednost</label>
            <InputNumber 
                value={x1x2[0]}
                readOnly
                className="p-inputtext-md p-1"
                style={{ borderRadius: '13px' }} 
            />
            <label>Kalibrirana minimalna vrijednost</label>
            <InputNumber 
                value={calibratedMinimum}
                readOnly
                className="p-inputtext-md p-1"
                style={{ borderRadius: '13px' }} 
            />
        </div>
        <div className="flex flex-column gap-2">
            <label>Unesena maksimalna vrijednost</label>
            <InputNumber 
                value={y1y2[1]}
                readOnly
                className="p-inputtext-md p-1"
                style={{ borderRadius: '13px' }} 
            />
            <label>Očitana maksimalna vrijednost</label>
            <InputNumber 
                value={x1x2[1]}
                readOnly
                className="p-inputtext-md p-1"
                style={{ borderRadius: '13px' }} 
            />
            <label>Kalibrirana kalibrirana vrijednost</label>
            <InputNumber 
                value={calibratedMaximum}
                readOnly
                className="p-inputtext-md p-1"
                style={{ borderRadius: '13px' }} 
            />
        </div>
    </div>
    </>
    );
}

export default CalibrationResults;