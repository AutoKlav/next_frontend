import React, { useEffect } from 'react';
import { InputNumber } from 'primereact/inputnumber';
import { calculateSlope } from '@/utils/calibrationUtil';

interface CalibrationResultsProps {
    x1x2: number[];
    y1y2: number[];
    sensorName: string | undefined;
    setResult: (results: number[]) => void;
}

const CalibrationResults: React.FC<CalibrationResultsProps> = (props) => {
    const { x1x2, y1y2, sensorName, setResult } = props;
    const result = calculateSlope(x1x2, y1y2);
    const [calibratedMinimum, calibratedMaximum] = result || [0, 0];

    useEffect(() => {
        setResult([calibratedMinimum, calibratedMaximum]);
    }, [x1x2, y1y2, setResult]);

    console.log("X1X2 Calibration", x1x2);
    
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
            <label>Minimalna kalibrirana vrijednost</label>
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
            <label>Maksimalna kalibrirana vrijednost</label>
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