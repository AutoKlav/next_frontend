import React from 'react';
import { InputNumber } from 'primereact/inputnumber';

interface GeneralNumberInputProps {    
    headerName: string;
    inputValue: React.MutableRefObject<number>;
    placeholder?: string;
    disabled?: boolean;
}

const CalibrationInput: React.FC<GeneralNumberInputProps> = (props) => {
    const {  headerName, inputValue, disabled, placeholder } = props;
    return (        
        <div className="flex flex-row gap-3 mt-3">
        <div className="flex flex-column gap-2">
            <label>{headerName}</label>
            <InputNumber                
                defaultValue={inputValue.current} // Clear value on next step
                onChange={(e) => (inputValue.current = e.value ? e.value : 0)}
                placeholder={placeholder}
                mode="decimal"
                disabled={disabled}
                className="p-inputtext-sm"
                style={{ borderRadius: '13px', width: '110%' }}
            />
        </div>
    </div>
    );
};

export default CalibrationInput;