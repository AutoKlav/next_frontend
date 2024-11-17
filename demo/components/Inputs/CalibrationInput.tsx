import React from 'react';
import { InputNumber } from 'primereact/inputnumber';

interface CalibrationInputProps {    
    currentStep: number;
    inputValue: React.MutableRefObject<number>;    
}

const CalibrationInput: React.FC<CalibrationInputProps> = (props) => {
    const {  currentStep, inputValue } = props;
    return (        
        <div className="flex flex-row gap-3">
        <div className="flex flex-column gap-2">
            <label>Upišite vrijednost</label>
            <InputNumber
                key={currentStep} // Unique key to reset input
                defaultValue={inputValue.current} // Clear value on next step
                onChange={(e) => (inputValue.current = e.value ? e.value : 0)}
                mode="decimal"
                showButtons
                className="p-inputtext-md p-1"
                style={{ borderRadius: '13px' }}
            />
        </div>
    </div>
    );
};

export default CalibrationInput;