import React from 'react';
import { InputText } from 'primereact/inputtext';

interface GeneralStringInputProps {    
    headerName: string;   
    inputValue: React.MutableRefObject<string | undefined>;
    
}

const GeneralStringInput: React.FC<GeneralStringInputProps> = (props) => {
    const {  headerName, inputValue } = props;
    
    return (        
        <div className="flex flex-row gap-3 mt-3">
        <div className="flex flex-column gap-2">
            <label>{headerName}</label>
            <InputText
                defaultValue={inputValue.current} // Clear value on next step
                onChange={(e) => (inputValue.current = e.target.value)}
                className="p-inputtext-md p-2"
                style={{ borderRadius: '10px' }}
            />
        </div>
    </div>
    );
};

export default GeneralStringInput;