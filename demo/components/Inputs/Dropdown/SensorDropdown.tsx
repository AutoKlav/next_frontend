import React, { useRef, useState } from 'react';
import { Dropdown } from 'primereact/dropdown';

interface SensorDropdown {
    id: string;
    name: string;
}

interface SensorDropdownProps {
    selectedSensorRef: React.MutableRefObject<SensorDropdown | null>;
}

const SensorDropdown: React.FC<SensorDropdownProps> = (props) => {
    const { selectedSensorRef } = props;

    const [selectedSensor, setSelectedSensor] = useState<string | null>(null);

    const sensors: SensorDropdown[] = [
        { id: 'temp', name: 'Temperatura' },
        { id: 'tempk', name: 'Temperatura konzerve' },
        { id: 'pressure', name: 'Tlak' }
    ];

    const handleChange = (e: { value: string }) => {
        const selected = sensors.find(sensor => sensor.id === e.value) || null;
        selectedSensorRef.current = selected;        
        setSelectedSensor(e.value);
    };

    return (
        <div className="flex flex-column gap-3">
            <label>Odaberite senzor</label>
            <Dropdown
                id="dropdown"
                options={sensors.map((sensor) => ({ name: sensor.name, value: sensor.id }))}
                onChange={handleChange}
                value={selectedSensor}
                className="p-inputtext-md p-1"
                style={{ borderRadius: '8px', width: '28%', height:'45px' }}
                optionLabel="name"
            />
        </div>
    );
};

export default SensorDropdown;