import React from 'react';
import { Dropdown } from 'primereact/dropdown';
import { ProcessType, Bacteria } from '@/types/grpc';

interface StartBacteriaDropdownProps {
    getter: Bacteria | undefined;
    setter: (value: Bacteria) => void;
    values: Bacteria[] | undefined;
    label: string;
}

const StartBacteriaDropdown: React.FC<StartBacteriaDropdownProps> = (props) => {    
    const { getter, setter, values, label } = props;          
    return (
            <div className="flex flex-column gap-2 mt-3">
                <label>{label}</label>
                <Dropdown
                    id="dropdown"
                    options={values}
                    value={getter}
                    onChange={(e) =>  setter(e.value)}
                    optionLabel="name"                    
                    style={{ borderRadius: '6px', height:'44px', width: '90%' }}
                />
            </div>        
    );
};

export default StartBacteriaDropdown;