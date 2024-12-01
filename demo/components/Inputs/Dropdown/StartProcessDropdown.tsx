import React from 'react';
import { Dropdown } from 'primereact/dropdown';

interface SensorDropdown {
    id: number;
    name: string;
}

interface StartProcessDropdownProps {
    getter: SensorDropdown;
    setter: (value: SensorDropdown) => void;
    values: SensorDropdown[];
    label: string;
}

const StartProcessDropdown: React.FC<StartProcessDropdownProps> = (props) => {    
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
                    placeholder="Odaberite tip"                                        
                    style={{ borderRadius: '6px', width: '53%', height:'44px' }}
                />
            </div>        
    );
};

export default StartProcessDropdown;