import React, { useRef, useState } from 'react';
import { Dropdown } from 'primereact/dropdown';

interface SensorDropdown {
    id: string;
    name: string;
    position: number;
}

interface SensorDropdownProps {
    selectedSensorRef: React.MutableRefObject<SensorDropdown | null>;
}

const SensorDropdown: React.FC<SensorDropdownProps> = (props) => {
    const { selectedSensorRef } = props;

    const [selectedSensor, setSelectedSensor] = useState<string | null>(null);

    const sensors: SensorDropdown[] = [
        { id: 'temp', position: 0, name: 'Temperatura Autoklava' },
        { id: 'tempK', position: 1, name: 'Temperatura Konzerve' },
        { id: 'expansionTemp', position: 2, name: 'Temperatura Ekspanzije' },
        { id: 'heaterTemp', position: 3, name: 'Temperatura Grijača' },
        { id: 'tankTemp', position: 4, name: 'Temperatura Tanka' },
        { id: 'tankWaterLevel', position: 5, name: 'Nivo Vode u Tanku' },
        { id: 'steamPressure', position: 6, name: 'Pritisak Pare' },
        { id: 'pressure', position: 7, name: 'Pritisak' },      
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