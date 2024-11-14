import { Dropdown } from 'primereact/dropdown';
import React from 'react';

const SensorDropdown = () => {   

    const sensors = [        
        {id: 'temp', name: 'Temperatura'},
        {id: 'tempK', name: 'Temperatura konzerve'},
        {id: 'pressure', name: 'Tlak'}
    ];

    return (
        <div className="flex flex-column gap-3">
        <label>Odaberite senzor</label>
        <Dropdown
            id="dropdown"
            options={sensors.map((sensor) => ({ name: sensor.name, value: sensor.id }))}
            //value={value10}
            //onChange={(e) => setValue10(e.value)}
            className="p-inputtext-md p-1"
            style={{ borderRadius: '13px' , width: '20%'}}
            optionLabel="name"
        />
        </div>
        
    );
}

export default SensorDropdown;