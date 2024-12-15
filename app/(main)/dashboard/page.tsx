"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { RenderState } from '@/demo/components/StatusHeader/StatusHeader';

import { getDistinctProcessValuesAction, getFilteredModeValuesAction, getProcessTypesAction, getSensorRelayValuesAction, getStateMachineValuesAction, startProcessAction, stopProcessAction } from '../api/actions';

import { useMutation, useQuery } from '@tanstack/react-query';
import { DataCard } from '@/demo/components/Cards/DataCard';
import ChipStates from '@/demo/components/Chips/ChipList';
import { useToast } from '@/layout/context/toastcontext';
import { checkForErrors } from '@/utils/errorUtil';
import { Dialog } from 'primereact/dialog';
import { ProgressBar } from 'primereact/progressbar';
import { ProcessConfigMode, ProcessConfigType, ProcessSuggestions, ProcessType, StartProcessRequest } from '@/types/grpc';
import GeneralStringInput from '@/demo/components/Inputs/GeneralInput/GeneralStringInput';
import GeneralNumberInput from '@/demo/components/Inputs/GeneralInput/GeneralNumberInput';
import StartProcessDropdown from '@/demo/components/Inputs/Dropdown/StartProcessDropdown';
import { ProcessInfoFields } from '@/types/app';
import { getProcessConfigModeById, getProcessConfigTypeById } from '@/utils/typeParserUtil';

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
    const refetchInterval = 10000;    
    const debounceInterval = 2000;

    const modeDropdownValues: ProcessType[] = [
        { id: 0, name: 'Target F' },
        { id: 1, name: 'Target T' },
    ];

    // Sterilizacija / Pasterizacija
    const [typeDropdown, setTypeDropdown] = useState<ProcessType>();
    // Meta f / Meta t
    const [modeDropdown, setModeDropdown] = useState<ProcessType>(modeDropdownValues[0]);
    
    //#region  Modal inputs    
    const [productName, setProductName] = useState('');
    const [productQuantity, setProductQuantity] = useState('');
        
    const [bacteria, setBacteria] = useState('');
    const [description, setDescription] = useState('');
        
    const [customTemp, setCustomTemp] = useState<number>(0);    
    const [finishTemp, setFinishTemp] = useState<number>(0);
    
    const [maintainPressure, setMaintainPressure] = useState<number>(0);  
    const [maintainTemp, setMaintainTemp] = useState<number>(0);
    
    const targetF = React.useRef<number>(0);
    const targetTime = React.useRef<number>(0);

    const fetchedTypes = useRef<ProcessType[]>();

    //#endregion
    
    const resetInputs = () => {
        
        setProductQuantity('');
        setProductName('');
        setBacteria('');        
        setDescription('');
        
        //#region modeDropdown        
        setCustomTemp(fetchedTypes.current?.[0]?.customtemp || 0);        
        setFinishTemp(fetchedTypes.current?.[0]?.finishtemp || 0);
        setMaintainPressure(fetchedTypes.current?.[0]?.maintainpressure || 0);        
        setMaintainTemp(fetchedTypes.current?.[0]?.maintaintemp || 0);
        setTypeDropdown(fetchedTypes.current?.[0]);
        //#endregion
        
        //#region typeDropdown
        targetF.current = 0;
        targetTime.current = 0;
        //#endregion
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

            showSuccess('Proces','Proces se zaustavlja');
        },
    });

    const { data: stateMachineValues } = useQuery(
        { 
            queryKey: ['stateMachineValues'],
            queryFn: () => getStateMachineValuesAction(),            
            refetchInterval: refetchInterval,
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

    const { mutate: nameAndQuantityFilterMode } = useMutation({
        mutationFn: getFilteredModeValuesAction,
        onError: (error) => {
            console.error('Error stopping process:', error);
            showError('Proces', 'Greška prilikom dohvaćanja podataka');
        },
        onSuccess: (data) => {
            if(checkForErrors(data)){
                showError('Proces', 'Greška prilikom dohvaćanja podataka');
                return;                
            }
            
            if(data?.processlengthvaluesList?.length > 0)
            {
                // Array can contain strings, convert to numbers and filter out NaN values
                const latestValidNumber = data?.processlengthvaluesList 
                    .map(val => Number(val))
                    .filter(val => !isNaN(val))
                    [0]; // Pick first most updated element from list
                
                targetTime.current = latestValidNumber;
            }
            else {
                targetTime.current = 0;
            }

            if(data?.targetfvaluesList?.length > 0){
                const value = Number(data?.targetfvaluesList[0]);
                targetF.current = isNaN(value) ? 0 : value;
            }
            else{
                targetF.current = 0;
            }
        },
    });
    
    const { mutate: processTypes } = useMutation({
        mutationFn: getProcessTypesAction,
        onError: (error) => {
            console.error('Error stopping process:', error);
            showError('Proces', 'Greška prilikom dohvaćanja podataka');
        },
        onSuccess: (data) => {
            if(checkForErrors(data)){
                showError('Proces', 'Greška prilikom dohvaćanja podataka');
                return;                
            }
                        
            fetchedTypes.current = data.processtypesList;            
            setTypeDropdown(data?.processtypesList?.[0]);            
        },
    });
    
    // Fetch process types on component mount
    useEffect(() => {
        processTypes();
    }, []);

    // Set default values for custom process types
    useEffect(() => {
        
        if(typeDropdown?.id === ProcessConfigType.STERILIZATION ||
            typeDropdown?.id === ProcessConfigType.PASTERIZATION)
        {            
            setCustomTemp(typeDropdown?.customtemp || 0);            
            setFinishTemp(typeDropdown?.finishtemp || 0);            
            setMaintainTemp(typeDropdown?.maintaintemp || 0);            
            setMaintainPressure(typeDropdown?.maintainpressure || 0);
        }
    }, [typeDropdown]);
    
    // Debounce the name and quantity filter mode after changed
    useEffect(() => {
        const handler = setTimeout(() => {
            nameAndQuantityFilterMode({
                productName: productName,
                productQuantity: productQuantity
            });
        }, debounceInterval); // 3 seconds debounce

        // Cleanup the timeout if productName or productQuantity changes before the timeout completes
        return () => {
            clearTimeout(handler);
        };
    }, [productName, productQuantity, nameAndQuantityFilterMode]);

    const { mutateAsync: getDistinctProcessValues } = useMutation(getDistinctProcessValuesAction);

    const [processSuggestions, setProcessSuggestions] = useState<ProcessSuggestions>({
        productName: [],
        productQuantity: [],
        bacteria: [],
        description: [],
    });

    const getSuggestions = async () => {
        try {
            const results = await Promise.all([
                getDistinctProcessValues(ProcessInfoFields.ProductName),
                getDistinctProcessValues(ProcessInfoFields.ProductQuantity),
                getDistinctProcessValues(ProcessInfoFields.Bacteria),
                getDistinctProcessValues(ProcessInfoFields.Description),
            ]);
    
             // Map results to corresponding keys
            const structuredResults: ProcessSuggestions = {
                productName: results[0]?.valuesList ?? [],
                productQuantity: results[1]?.valuesList ?? [],
                bacteria: results[2]?.valuesList ?? [],
                description: results[3]?.valuesList ?? [],
            };
            
            setProcessSuggestions(structuredResults);            
        } catch (error) {
            console.error('An error occurred during the process:', error);
            showError('Proces', 'Greška prilikom dohvaćanja podataka');
        }
    }

    const { data: relaySensorValues } = useQuery(
        { 
            queryKey: ['relaySensorValues'],
            queryFn: () => getSensorRelayValuesAction(),
            refetchInterval: refetchInterval,
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

        if(productName === '' || productQuantity === '' || bacteria === '' || description === '') {
            showWarn('Proces','Molimo unesite sve podatke');
            return;
        }

        if(state === 0){            
            if(typeDropdown?.id === ProcessConfigType.STERILIZATION ||
                typeDropdown?.id === ProcessConfigType.PASTERIZATION)
            {                
                setCustomTemp(typeDropdown?.customtemp || 0);                
                setFinishTemp(typeDropdown?.finishtemp || 0);                
                setMaintainTemp(typeDropdown?.maintaintemp || 0);
                setMaintainPressure(typeDropdown?.maintainpressure || 0);
            }
            const parsedType = getProcessConfigTypeById(typeDropdown?.id);
            const parsedMode = getProcessConfigModeById(modeDropdown?.id);

            const request: StartProcessRequest = {                
                processConfig: {                                    
                    customTemp: customTemp,
                    finishTemp: finishTemp,
                    maintainPressure: maintainPressure,
                    maintainTemp: maintainTemp,
                    mode: parsedMode,
                    targetTime: isNaN(targetTime.current) ? 0 : targetTime.current,
                    type: parsedType,
                },
                processInfo: {
                    productName: productName,
                    bacteria: bacteria,
                    targetF: isNaN(targetF.current) ? '0' : targetF.current.toString(),
                    description: description,
                    productQuantity: productQuantity,
                    processStart: new Date().toISOString(),
                    processLength: 'Proces nije završen',
                },
            };
            console.log('Proces request', request);        

            resetInputs();
            startProcess(request);
            setModalVisibility(false);           
            return;
        }
        
        setModalVisibility(false);            
        showWarn('Proces','Proces je već pokrenut');
    };
    
    const handleOpenDialog = () => {
        getSuggestions();
        setModalVisibility(true);
    }

    const disabledInput = typeDropdown?.id !== ProcessConfigType.CUSTOM;

    const footerContent = (
        <div>
            <Button label="Odustani" icon="pi pi-times" onClick={() => setModalVisibility(false)} className="p-button-text" />
            <Button label="Unesi podatke" icon="pi pi-check" onClick={handleStartProcess} autoFocus />
        </div>
    );

    return (
        <div className="grid p-2">
            <div className="m-0">
            <div className="grid p-2">
                <Dialog header="Unos podataka" visible={isModalVisible} style={{ width: '60vw' }} onHide={() => {if (!isModalVisible) return; setModalVisibility(false); }} footer={footerContent}>
                    <div className="grid">
                        <div className="col-4">                                    
                            <GeneralStringInput headerName="Naziv produkta" placeholder='Pašteta' inputValue={[productName, setProductName]} suggestions={processSuggestions?.productName}/>
                            <GeneralStringInput headerName="Naziv bakterije" placeholder='Salmonella' inputValue={[bacteria, setBacteria]} suggestions={processSuggestions?.bacteria}/>                    
                        </div>                
                        <div className="col-4">
                            <GeneralStringInput headerName="Količina" placeholder='500g' inputValue={[productQuantity, setProductQuantity]} suggestions={processSuggestions?.productQuantity}/>                                    
                            <GeneralStringInput headerName="Opis" placeholder='Sterilizacija mlijeka za eliminaciju patogenih organizama' inputValue={[description, setDescription]} suggestions={processSuggestions?.description}/>                    
                        </div>                        
                        <div className="col-4">
                            <StartProcessDropdown label='Mod' getter={modeDropdown} setter={setModeDropdown} values={modeDropdownValues} />
                            {modeDropdown?.id === ProcessConfigMode.TARGETF ?
                                <GeneralNumberInput headerName="Ciljni F" disabled={disabledInput} inputValue={targetF} />
                            :
                                <GeneralNumberInput headerName="Ciljno vrijeme (s)" disabled={disabledInput} inputValue={targetTime} />
                            }
                        </div>
                        <div className="col-12">
                            <hr />
                        </div>
                        <div className="col-4">
                            <StartProcessDropdown label='Tip' getter={typeDropdown} setter={setTypeDropdown} values={fetchedTypes.current} />
                        </div>                        
                        <div className="col-4">
                            <GeneralNumberInput headerName="Prilagođena temperatura" disabled={disabledInput} inputValue={[customTemp, setCustomTemp]} />
                            <GeneralNumberInput headerName="Održavanje temperature" disabled={disabledInput} inputValue={[maintainTemp, setMaintainTemp]} />                    
                        </div>                        
                        <div className="col-4">
                            <GeneralNumberInput headerName="Završna temperatura" disabled={disabledInput} inputValue={[finishTemp, setFinishTemp]} />
                            <GeneralNumberInput headerName="Održavanje tlaka" disabled={disabledInput} inputValue={[maintainPressure, setMaintainPressure]} />
                        </div>               
                    </div>
                </Dialog>
            </div>
        </div>            
        <div className="col-4">
            {/* Control Relays */}            
            <div className="card f-height border-green-600">
            <div className="grid gap-2">            
            <div className="col-12">
                {RenderState(state)}
                {/* Display progress or empty bar */}                
            </div>
            <div className="flex flex-row justify-content-between gap-3 ml-3 mr-3">
            <Button label="Pokreni proces" onClick={handleOpenDialog} className="p-button-success" />
            <Button label="Zaustavi proces" onClick={() => stopProcess()} className="p-button-danger" />                        
            </div>
            <div className='col-12'>
                {state === 0 ?
                        <ProgressBar className='ml-1' value={0} color='green' mode="determinate" style={{ height: '10px' }}/> :
                        <ProgressBar color='green' mode="indeterminate" style={{ height: '10px' }}/>
                    }
            </div>
            
            <div className="col-6">
                    <div className='flex flex-column gap-3 ml-2 mr-2'>
                        {relayMapper.slice(0,4) .map((chip, index) => (
                                <ChipStates key={chip.name} {...chip} />
                        ))}
                    </div>                    
            </div>
            <div className="col-5">
            <div className='flex flex-column gap-3 -ml-2 -mr-2 '>
                        {relayMapper.slice(4,6) .map((chip, index) => (
                                <ChipStates key={chip.name} {...chip} />
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
                            <DataCard key={item.headerName} {...item} />
                        ))}
                    </ul>                    
                    <ul className="list-none p-0 m-0">
                        {pressures.map((item, index) => (
                            <DataCard key={item.headerName} {...item} />
                        ))}
                    </ul>
                </div>
            </div>
            
            <div className="col-4">
                <div className="card border-cyan-700">
                <ul className="list-none p-0 m-0">
                        {stateValues.map((item, index) => (
                            <DataCard key={item.headerName} {...item} />
                        ))}
                    </ul>
                </div>
            </div>    
    </div>
    );
};

export default DashboardPage;
