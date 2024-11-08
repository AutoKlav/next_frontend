import React from 'react';
import { Chip } from 'primereact/chip';

interface ChipProps {
    label: string;
    icon: string;
    className: string;
}

const ChipStates: React.FC<ChipProps> = (chip) => {
    const { label, icon, className } = chip;
    return (
            <Chip                
                label={label}
                icon={icon}
                className={className}
            />        
    );
};

export default ChipStates;