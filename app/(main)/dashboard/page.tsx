"use client";
import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { RenderState } from '@/demo/components/StatusHeader/StatusHeader';

import { getSensorRelayValuesAction, getStateMachineValuesAction, setVariableAction, startProcessAction, stopProcessAction, updateSensorAction } from '../api/actions';

import { useMutation, useQuery } from '@tanstack/react-query';
import { DataCard } from '@/demo/components/Cards/DataCard';
import ChipStates from '@/demo/components/Chips/ChipList';
import { useToast } from '@/layout/context/toastcontext';
import { checkForErrors } from '@/utils/errorUtil';
import { Dialog } from 'primereact/dialog';
import { ProgressBar } from 'primereact/progressbar';
import { StartProcessRequest } from '@/types/grpc';
import GeneralStringInput from '@/demo/components/Inputs/GeneralInput/GeneralStringInput';
import GeneralNumberInput from '@/demo/components/Inputs/GeneralInput/GeneralNumberInput';
import { Dropdown } from 'primereact/dropdown';
import StartProcessDropdown from '@/demo/components/Inputs/Dropdown/StartProcessDropdown';

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

const relayMapper = [
    { name: 'cooling', label: 'Hlađenje', value: 0 },
    { name: 'heating', label: 'Grijači', value: 0 },
    { name: 'pump', label: 'Pumpa', value: 0 },
    { name: 'bypass', label: 'Bypass', value: 0 },
    { name: 'inpressure', label: 'Ulazni tlak', value: 0 },
    { name: 'waterfill', label: 'Pumpa vode', value: 0 },
];

const DashboardPage = () => {
    const { showSuccess, showError, showWarn } = useToast();
    const [isModalVisible, setModalVisibility] = useState(false);    

    const typeDropdownValues = [
        { id: 0, name: 'Sterilizacija' },
        { id: 1, name: 'Pasterizacija' },
        { id: 2, name: 'Prilagođeno' },
    ];

    const modeDropdownValues = [
        { id: 0, name: 'Meta f' },
        { id: 1, name: 'Meta t' },
    ];

    const [typeDropdown, setTypeDropdown] = useState(typeDropdownValues[0]);
    const [modeDropdown, setModeDropdown] = useState(modeDropdownValues[0]);
    
    //#region  Modal inputs    
    const productName = React.useRef<string>('');
    const bacteria = React.useRef<string>('');
    const description = React.useRef<string>('');
    const productQuantity = React.useRef<string>('');

    const customTemp = React.useRef<number>(0);
    const finishTemp = React.useRef<number>(0);
    const maintainPressure = React.useRef<number>(0);
    const maintainTemp = React.useRef<number>(0);
    const targetF = React.useRef<number>(0);
    const targetTime = React.useRef<number>(0);
    //#endregion
    
    const resetInputs = () => {
        productName.current = '';
        bacteria.current = '';
        description.current = '';
        productQuantity.current = '';
        customTemp.current = 0;
        finishTemp.current = 0;
        maintainPressure.current = 0;
        maintainTemp.current = 0;
        targetF.current = 0;
        targetTime.current = 0;
    }

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
    
    relayMapper[0].value = relaySensorValues?.cooling || 0;
    relayMapper[1].value = relaySensorValues?.heating || 0;
    relayMapper[2].value = relaySensorValues?.pump || 0;
    relayMapper[3].value = relaySensorValues?.bypass || 0;
    relayMapper[4].value = relaySensorValues?.inpressure || 0;
    relayMapper[5].value = relaySensorValues?.waterfill || 0;

    const handleStartProcess = () => {        
        if(state === 0){
            const request: StartProcessRequest = {
                processConfig: {
                    customTemp: customTemp.current,
                    finishTemp: finishTemp.current,
                    maintainPressure: maintainPressure.current,
                    maintainTemp: maintainTemp.current,
                    mode: modeDropdown.id,
                    targetF: targetF.current,
                    targetTime: targetTime.current,
                    type: typeDropdown.id,
                },
                processInfo: {
                    productName: productName.current,
                    bacteria: bacteria.current,
                    description: description.current,
                    productQuantity: productQuantity.current,
                    processStart: new Date().toISOString(),
                    processLength: 'ex',
                },
            };

            resetInputs();
            startProcess(request);
            setModalVisibility(false);           
            return;
        }
        
        setModalVisibility(false);            
        showWarn('Proces','Proces je već pokrenut');
    };

    const handleSetVariable = (minValue: number, maxValue: number) => {
        updateSensorAction();
    }
    
    const footerContent = (
        <div>
            <Button label="Odustani" icon="pi pi-times" onClick={() => setModalVisibility(false)} className="p-button-text" />
            <Button label="Unesi podatke" icon="pi pi-check" onClick={handleStartProcess} autoFocus />
        </div>
    );    
    
    return (
        <div className="grid p-2">
            <Dialog header="Unos podataka" visible={isModalVisible} style={{ width: '50vw' }} onHide={() => {if (!isModalVisible) return; setModalVisibility(false); }} footer={footerContent}>
                <p className="m-0">
                    <div className="grid p-2">
                        <Dialog header="Unos podataka" visible={isModalVisible} style={{ width: '50vw' }} onHide={() => {if (!isModalVisible) return; setModalVisibility(false); }} footer={footerContent}>
                            <div className="grid">
                                <div className="col-6">
                                    <GeneralStringInput headerName="Unesite naziv produkta" inputValue={productName} />
                                    <GeneralStringInput headerName="Unesite naziv bakterije" inputValue={bacteria} />
                                    <GeneralStringInput headerName="Unesite opis" inputValue={description} />
                                    <StartProcessDropdown label='Odaberite tip' getter={typeDropdown} setter={setTypeDropdown} values={typeDropdownValues} />
                                    <StartProcessDropdown label='Odaberite mod' getter={modeDropdown} setter={setModeDropdown} values={modeDropdownValues} />
                                </div>
                                <div className="col-6">
                                    <GeneralStringInput headerName="Unesite količinu" inputValue={productQuantity} />                                    
                                    <GeneralNumberInput headerName="Unesite održavanje tlaka" inputValue={maintainPressure} />
                                    {typeDropdown.id === 2 && (
                                        <>
                                            <GeneralNumberInput headerName="Unesite ciljnu temperaturu" inputValue={customTemp} />
                                            <GeneralNumberInput headerName="Unesite završnu temperaturu" inputValue={finishTemp} />
                                            <GeneralNumberInput headerName="Unesite održavanje temperature" inputValue={maintainTemp} />
                                        </>
                                    )}
                                </div>
                            </div>
                        </Dialog>
                    </div>
                </p>
            </Dialog>            
        <div className="col-4">
            {/* Control Relays */}            
            <div className="card f-height border-green-600">
            <div className="grid gap-2">
            <div className="col-12">
                {RenderState(state)}
                {/* Display progress or empty bar */}
                {state === 0 ?
                    <ProgressBar value={0} color='green' mode="determinate" style={{ height: '10px' }}/> :
                    <ProgressBar color='green' mode="indeterminate" style={{ height: '10px' }}/>
                }
            </div>
            <div className="flex flex-row justify-content-between gap-3 ml-3 mr-3">
            <Button label="Pokreni proces" onClick={() => setModalVisibility(true)} className="p-button-success" />
            <Button label="Zaustavi proces" onClick={() => stopProcess()} className="p-button-danger" />                        
            </div>

            <div className="col-6">                    
                    <div className='flex flex-column gap-3 ml-2 mr-2'>
                        {relayMapper.slice(0,4) .map((chip, index) => (
                                <ChipStates key={index} {...chip} />
                        ))}
                    </div>                    
            </div>
            <div className="col-5">
            <div className='flex flex-column gap-3 -ml-2 -mr-2 '>
                        {relayMapper.slice(4,6) .map((chip, index) => (
                                <ChipStates key={index} {...chip} />
                        ))}
                    </div>
            </div>
            </div>
            </div>
        </div>
         <div className="col-4">            
                <div className="card border-red-700">
                    <ul className="list-none p-0 m-0">
                        {temperatures.map((item, index) => (
                            <DataCard key={index} {...item} />
                        ))}
                    </ul>                    
                    <ul className="list-none p-0 m-0">
                        {pressures.map((item, index) => (
                            <DataCard key={index} {...item} />
                        ))}
                    </ul>
                </div>
            </div>
            
            <div className="col-4">
                <div className="card border-cyan-700">
                <ul className="list-none p-0 m-0">
                        {stateValues.map((item, index) => (
                            <DataCard key={index} {...item} />
                        ))}
                    </ul>
                </div>
            </div>    
    </div>
    );
};

export default DashboardPage;
