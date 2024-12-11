import React, { useState } from 'react';
import { InputNumber } from 'primereact/inputnumber';

interface GeneralNumberInputProps {    
    headerName: string;
    // support both useState and useRef 
    inputValue: React.MutableRefObject<number> | [number, React.Dispatch<React.SetStateAction<number>>];
    placeholder?: string;
    disabled?: boolean;
}

const GeneralNumberInput: React.FC<GeneralNumberInputProps> = (props) => {
    const { headerName, inputValue, disabled, placeholder } = props;

    // Determine if inputValue is useRef or useState
    const value = Array.isArray(inputValue) ? inputValue[0] : inputValue.current;
    const setValue = Array.isArray(inputValue) ? inputValue[1] : (val: number) => (inputValue.current = val);

    return (        
        <div className="flex flex-row gap-3 mt-3">
            <div className="flex flex-column gap-2">
                <label>{headerName}</label>
                <InputNumber
                    useGrouping={false} // Avoid using commas for thousands
                    value={value} // Use value from state or ref
                    onChange={(e) => setValue(e.value ?? 0)} // Update useState or useRef accordingly
                    placeholder={placeholder}
                    mode="decimal"
                    disabled={disabled}
                    className="p-inputtext-sm"
                    style={{ borderRadius: '13px', width: '115%' }}
                />
            </div>
        </div>
    );
};

export default GeneralNumberInput;