"use client";
import React from 'react';
import { Button } from 'primereact/button';
import { Chip } from 'primereact/chip';
import { RenderState, Severity } from '@/demo/components/StatusHeader/StatusHeader';

import { getStateMachineValuesAction, stopProcessAction } from '../api/actions';

import { useMutation, useQuery } from '@tanstack/react-query';
import { DataCard } from '@/demo/components/Cards/DataCard';
import ChipStates from '@/demo/components/Chips/ChipList';

const temperatures = [
    { icon: 'pi-sun', headerName: 'Temperatura komore', value: '', unit: '°C', color: 'red' },
    { icon: 'pi-box', headerName: 'Temperatura proizvoda', value: '', unit: '°C', color: 'red' },
    { icon: 'pi-cloud', headerName: 'Temperatura pare', value: '', unit: '°C', color: 'red' },
];

const stateValues = [
    { icon: 'pi-chart-line', headerName: 'Dr', value: '', unit: '', color: 'cyan' },
    { icon: 'pi-chart-bar', headerName: 'Fr', value: '', unit: '', color: 'cyan' },
    { icon: 'pi-chart-pie', headerName: 'r', value: '', unit: '', color: 'cyan' },
];

const pressures = [
    { icon: 'pi-gauge', headerName: 'Pritisak komore', value: '', unit: 'bar', color: 'blue' },
    { icon: 'pi-cloud', headerName: 'Pritisak pare', value: '', unit: 'bar', color: 'blue' },    
];

const chipData = [
    { label: 'Pumpa', icon: 'pi pi-check', className: 'bg-green-700 text-white text-900 font-small' },
    { label: 'Grijači', icon: 'pi pi-check', className: 'bg-green-700 text-white text-900 font-small' },
    { label: 'Parni ventil', icon: 'pi pi-circle-off', className: 'bg-gray-500 text-white text-900 font-small' },
    { label: 'Ispusni ventil', icon: 'pi pi-circle-off', className: 'bg-gray-500 text-white text-900 font-small' },
];

const MonitorLayout = () => {
    const { mutate: stopProcess } = useMutation({
        mutationFn: stopProcessAction,
        onError: (error) => {
            console.error('Error stopping process:', error);
        },
        onSuccess: (data) => {
            console.log('Process stopped:', data);
        },
    });

    const handleStopProcess = () => {
        stopProcess();        
    };

    const { data: stateMachineValues } = useQuery(
        { 
            queryKey: ['stateMachineValues'],
            queryFn: () => getStateMachineValuesAction(),            
            refetchInterval: 1000,                        
        },        
    );
        
    temperatures[0].value = stateMachineValues?.temp?.toString() || 'N/A';
    temperatures[1].value = stateMachineValues?.tempk?.toString() || 'N/A';
    //temperatures[2].value = stateMachineValues?. .toString() || 'N/A';

    stateValues[0].value = stateMachineValues?.dr?.toString() || 'N/A';
    stateValues[1].value = stateMachineValues?.fr?.toString() || 'N/A';
    stateValues[2].value = stateMachineValues?.r?.toString() || 'N/A';

    pressures[0].value = stateMachineValues?.pressure?.toString() || 'N/A';
    //pressures[1].value = stateMachineValues?. .toString() || 'N/A';
    
    return (
        <div className="grid p-2">
         <div className="col-6">
            <Button label="Stop" onClick={handleStopProcess} className="p-button-danger" />            
                <div className="card border-red-700">
                    <ul className="list-none p-0 m-0">
                        {temperatures.map((item, index) => (
                            <DataCard key={index} {...item} />
                        ))}
                    </ul>
                </div>
            </div>
            <div className="col-6">
                <div className="card border-cyan-700">
                    <ul className="list-none p-0 m-0">
                        {stateValues.map((item, index) => (
                            <DataCard key={index} {...item} />
                        ))}
                    </ul>
                </div>
            </div>
            <div className="col-6">
                <div className="card border-blue-700">
                    <ul className="list-none p-0 m-0">
                        {pressures.map((item, index) => (
                            <DataCard key={index} {...item} />
                        ))}
                    </ul>
                </div>
            </div>
    <div className="col-6">
        {/* Control Relays */}
        <div className="card f-height border-green-600">
            <div className="grid gap-2">
                <div className="col-4">
                    <div className='flex flex-column gap-3'>
                       {chipData.map((chip, index) => (
                            <ChipStates key={index} {...chip} />
                        ))}
                    </div>
                </div>
                <div className="col-3">                    
                </div>
                <div className="col-4">
                {RenderState(Severity.Success)}
                </div>
            </div>
                </div>
            </div>
        </div>
    );
};

export default MonitorLayout;
