"use client";
import React from 'react';
import { Button } from 'primereact/button';
import { RenderState, Severity } from '@/demo/components/StatusHeader/StatusHeader';

import { getSensorRelayValuesAction, getStateMachineValuesAction, setVariableAction, startProcessAction, stopProcessAction, updateSensorAction } from '../api/actions';

import { useMutation, useQuery } from '@tanstack/react-query';
import { DataCard } from '@/demo/components/Cards/DataCard';
import ChipStates from '@/demo/components/Chips/ChipList';
import { useToast } from '@/layout/context/toastcontext';
import { checkForErrors } from '@/utils/errorUtil';

const temperatures = [
    { icon: 'pi-sun', headerName: 'Temperatura komore', value: '', unit: '°C', color: 'red' },
    { icon: 'pi-box', headerName: 'Temperatura proizvoda', value: '', unit: '°C', color: 'red' },    
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
    { name: 'heating', label: 'Grijači', value: 0 },
    { name: 'bypass', label: 'Bypass', value: 0 },
    { name: 'waterfill', label: 'Pumpa vode', value: 0 },
    { name: 'pump', label: 'Pumpa', value: 0 },
    { name: 'inpressure', label: 'Ulazni tlak', value: 0 },
    { name: 'cooling', label: 'Hlađenje', value: 0 },
];

const DashboardPage = () => {
    const { showSuccess, showError, showWarn } = useToast();

    const { mutate: stopProcess } = useMutation({
        mutationFn: stopProcessAction,
        onError: (error) => {
            console.error('Error stopping process:', error);
            showError('Proces','Greška prilikom zaustavljanja procesa');
        },
        onSuccess: (data) => {
            if(checkForErrors(data)){
                showError('Proces','Greška prilikom zaustavljanja procesa');
                return;
            }

            showSuccess('Proces','Proces je uspješno zaustavljen');
        },
    });

    const { data: stateMachineValues } = useQuery(
        { 
            queryKey: ['stateMachineValues'],
            queryFn: () => getStateMachineValuesAction(),            
            refetchInterval: 1000,
            onError: (error) => {
                console.error('Error getting state machine values:', error);
                showError('Proces','Greška prilikom dohvaćanja podataka');
            },
            onSuccess: (data) => {                
                if(checkForErrors(data)){
                    showError('Proces','Greška prilikom pokretanja procesa', 500);
                    return;
                }
            },
        },        
    );

    const { mutate: startProcess } = useMutation({
        mutationFn: startProcessAction,
        onError: (error) => {
            console.error('Error stopping process:', error);
        },
        onSuccess: (data) => {
            if(checkForErrors(data)){
                showError('Proces','Greška prilikom pokretanja procesa');
                return;
            }

            showSuccess('Proces','Proces je uspješno pokrenut');
        },
    });

    const { data: relaySensorValues } = useQuery(
        { 
            queryKey: ['relaySensorValues'],
            queryFn: () => getSensorRelayValuesAction(),
            refetchInterval: 1000,
            onError: (error) => {
                console.error('Error getting relay sensor values:', error);
                showError('Relej','Greška prilikom dohvaćanja podataka');
            },
            onSuccess: (data) => {
                if(checkForErrors(data)){
                    showError('Relej','Greška prilikom dohvaćanja releja', 500);
                    return;                    
                }                
            },
        },
    );
    
    temperatures[0].value = stateMachineValues?.temp?.toString() || 'N/A';
    temperatures[1].value = stateMachineValues?.tempk?.toString() || 'N/A';
    
    stateValues[0].value = stateMachineValues?.dr?.toString() || 'N/A';
    stateValues[1].value = stateMachineValues?.fr?.toString() || 'N/A';
    stateValues[2].value = stateMachineValues?.r?.toString() || 'N/A';

    pressures[0].value = stateMachineValues?.pressure?.toString() || 'N/A';
    //pressures[1].value = stateMachineValues?. .toString() || 'N/A';

    const state = stateMachineValues?.state || 0;
    
    chipData[0].value = relaySensorValues?.waterFill || 0;
    chipData[1].value = relaySensorValues?.heating || 0;
    chipData[2].value = relaySensorValues?.bypass || 0;
    chipData[3].value = relaySensorValues?.pump || 0;
    chipData[4].value = relaySensorValues?.inPressure || 0;
    chipData[5].value = relaySensorValues?.cooling || 0;

    const handleStartProcess = () => {
        if(state === 0){
            startProcess();
            return;
        }

        showWarn('Proces','Proces je već pokrenut');
    };

    const handleStopProcess = () => {
        stopProcess();        
    };

    const handleSetVariable = (minValue: number, maxValue: number) => {
        updateSensorAction();
    }    
    
    return (
        <div className="grid p-2">
         <div className="col-6">
            <Button label="Pokreni proces" onClick={handleStartProcess} className="p-button-success" />
            <Button label="Zaustavi proces" onClick={handleStopProcess} className="p-button-danger" />            
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
                {RenderState(state)}
                </div>
            </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
