import React from 'react';
import { Dropdown } from 'primereact/dropdown';

interface SensorDropdown {
    id: number;
    name: string;
}

interface StartProcessDropdownProps {
    typeDropdown: SensorDropdown;
    setTypeDropdown: (value: SensorDropdown) => void;
    typeDropdownValues: SensorDropdown[];
}

const StartProcessDropdown: React.FC<StartProcessDropdownProps> = (props) => {    
    const { typeDropdown, setTypeDropdown, typeDropdownValues } = props;   
    
    return (
        <div className="flex flex-column gap-3">
            <label>Odaberite tip</label>
                <Dropdown
                    id="dropdown"
                    options={typeDropdownValues}
                    value={typeDropdown}
                    onChange={(e) =>  setTypeDropdown(e.value)}
                    optionLabel="name"
                    placeholder="Odaberite tip"                                        
                    style={{ borderRadius: '6px', width: '53%', height:'44px' }}
                />
        </div>
    );
};

export default StartProcessDropdown;