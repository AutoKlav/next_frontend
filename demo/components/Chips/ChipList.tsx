import React from 'react';
import { Chip } from 'primereact/chip';

interface ChipProps {
    label: string;
    value:number;
}

const getChipClass = (value: number) => value === 1 
    ? 'bg-green-700 text-white text-900 font-small' 
    : 'bg-gray-500 text-white text-900 font-small';

const getChipIcon = (value: number) => value === 1 
    ? 'pi pi-check' 
    : 'pi pi-circle-off';


const ChipStates: React.FC<ChipProps> = (chip) => {
    const { label } = chip;
    const className = getChipClass(chip.value);
    const icon = getChipIcon(chip.value);
    return (
            <Chip                
                label={label}
                icon={icon}
                className={className}
            />        
    );
};

export default ChipStates;