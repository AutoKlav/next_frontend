"use client";
import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Chip } from 'primereact/chip';
import { RenderState, Severity } from '@/demo/components/StatusHeader/StatusHeader';

import { getStateMachineValuesAction, stopProcessAction } from '../api/actions';
import { stopProcess } from '@/services/grpc';
import { useMutation } from '@tanstack/react-query';

interface DataCardProps {
    icon: string;
    headerName: string;
    value: string;
    unit: string;
    color: string;
}

const DataCard: React.FC<DataCardProps> = ({ icon, headerName, value, unit, color }) => {
    return (
        <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
            <div className="flex flex-column">
                <div className='flex flex-row items-center gap-2'>
                    <i className={`pi ${icon} text-2xl text-${color}-500 mb-2`}></i>
                    <span className="text-900 font-small mb-2">{headerName}</span>
                </div>
                <div className="flex justify-between items-center bg-gray-900 p-2" style={{ borderRadius: '10px' }}>
                    <input
                        type="text"
                        value={value}
                        readOnly
                        className={`text-${color}-500 text-2xl font-bold border-none bg-transparent`}
                    />
                    <span className={`text-${color}-500 text-2xl font-bold`}>{unit}</span>
                </div>
            </div>
        </li>
    );
};

const temperatures = [
    { icon: 'pi-sun', headerName: 'Temperatura komore', value: '121.5', unit: '°C', color: 'red' },
    { icon: 'pi-box', headerName: 'Temperatura proizvoda', value: '118.2', unit: '°C', color: 'red' },
    { icon: 'pi-cloud', headerName: 'Temperatura pare', value: '125.3', unit: '°C', color: 'red' },
];

const stateValues = [
    { icon: 'pi-chart-line', headerName: 'Dr', value: '12.5', unit: '', color: 'cyan' },
    { icon: 'pi-chart-bar', headerName: 'Fr', value: '0.8', unit: '', color: 'cyan' },
    { icon: 'pi-chart-pie', headerName: 'r', value: '0.9', unit: '', color: 'cyan' },
];

const pressures = [
    { icon: 'pi-gauge', headerName: 'Pritisak komore', value: '2.1', unit: 'bar', color: 'blue' },
    { icon: 'pi-cloud', headerName: 'Pritisak pare', value: '2.3', unit: 'bar', color: 'blue' },    
];


const MonitorLayout = () => {
    const { isLoading, isError, mutate: stopProcess } = useMutation({
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
                        <Chip label="Pumpa" icon="pi pi-check" className="bg-green-700 text-white text-900 font-small" />
                        <Chip label="Grijači" icon="pi pi-check" className="bg-green-700 text-white text-900 font-small" />
                        <Chip label="Parni ventil" icon="pi pi-circle-off" className="bg-gray-500 text-white text-900 font-small" />
                        <Chip label="Ispusni ventil" icon="pi pi-circle-off" className="bg-gray-500 text-white text-900 font-small" />
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
