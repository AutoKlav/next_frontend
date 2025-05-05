"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { RenderState } from '@/demo/components/StatusHeader/StatusHeader';

import { getBacteriaAction, getDistinctProcessValuesAction, getFilteredModeValuesAction, getProcessTypesAction, getSensorRelayValuesAction, getStateMachineValuesAction, startProcessAction, stopProcessAction } from '../api/actions';

import { useMutation, useQuery } from '@tanstack/react-query';
import { DataCard } from '@/demo/components/Cards/DataCard';
import ChipStates from '@/demo/components/Chips/ChipList';
import { useToast } from '@/layout/context/toastcontext';
import { checkForErrors, responseParserUtil } from '@/utils/errorUtil';
import { Dialog } from 'primereact/dialog';
import { ProgressBar } from 'primereact/progressbar';
import { Bacteria, HeatingType, ProcessConfigMode, ProcessSuggestions, ProcessType, StartProcessRequest } from '@/types/grpc';
import GeneralStringInput from '@/demo/components/Inputs/GeneralInput/GeneralStringInput';
import GeneralNumberInput from '@/demo/components/Inputs/GeneralInput/GeneralNumberInput';
import StartProcessDropdown from '@/demo/components/Inputs/Dropdown/StartProcessDropdown';
import { ProcessInfoFields } from '@/types/app';
import { getProcessConfigModeById } from '@/utils/typeParserUtil';
import { TabView, TabPanel } from 'primereact/tabview';
import StartBacteriaDropdown from '@/demo/components/Inputs/Dropdown/StartBacteriaDropdown';
import ProcessTable from '@/demo/components/Tables/ProcessTable';

const temperatures = [
    { icon: 'pi-sun', headerName: 'TEMP. AK', value: '', unit: '°C', color: 'red' },
    { icon: 'pi-box', headerName: 'TEMP. GRIJACA', value: '', unit: '°C', color: 'red' },    
    { icon: 'pi-box', headerName: 'TEMP. SRED.', value: '', unit: '°C', color: 'red' },    
    { icon: 'pi-gauge', headerName: 'TLAK AK.', value: '', unit: 'bar', color: 'blue' },
    { icon: 'pi-box', headerName: 'TEMP. SPREM.', value: '', unit: '°C', color: 'red' },    
    { icon: 'pi-cloud', headerName: 'NIVO. SPREM.', value: '', unit: '%', color: 'black' },    
    { icon: 'pi-box', headerName: 'CIJEV PROS', value: '', unit: '°C', color: 'red' },    
    { icon: 'pi-cloud', headerName: 'TLAK PARE', value: '', unit: 'bar', color: 'blue' },        
];

const stateValues = [
    { icon: 'pi-chart-line', headerName: 'D₅', value: '', unit: '', color: 'cyan' },
    { icon: 'pi-chart-bar', headerName: 'F₅', value: '', unit: '', color: 'cyan', decimal: 5 },
    { icon: 'pi-chart-pie', headerName: 'r₅', value: '', unit: '', color: 'cyan', decimal: 5 },
];

const relayMapper = [
    { name: 'fillTankWithWater', label: 'PUNJ. SPREM', value: 0 },
    { name: 'tankHeating', label: 'GR. SPREM', value: 0 },
    { name: 'autoklavFill', label: 'PUNJ. AK', value: 0 },
    { name: 'heating', label: 'GRIJ. AK', value: 0 },
    { name: 'cooling', label: 'HLADENJE', value: 0 },
    { name: 'coolingHelper', label: 'POM. HLADJ', value: 0 },
    { name: 'extensionCooling', label: 'HLADJ PROSI', value: 0 },
    { name: 'waterDrain', label: 'ISP. VODE', value: 0 },
    { name: 'pump', label: 'PUMPA', value: 0 },
    { name: 'increasePressure', label: 'DIZ. TL. AK', value: 0 },
    { name: 'alarmSignal', label: 'ALARM', value: 0 },
];

const DashboardPage = () => {
    const { showSuccess, showError, showWarn } = useToast();
    const [isModalVisible, setModalVisibility] = useState(false);  
    const refetchStateMachineIntervals = 1000; 
    const refetchIntervalRelay = 1000;   
    const debounceInterval = 2000;

    const modeDropdownValues: ProcessType[] = [
        { id: 0, name: 'Ciljni F' },
        { id: 1, name: 'Na Vrijeme' },
    ];
        
    // Sterilizacija / Pasterizacija
    const [typeDropdown, setTypeDropdown] = useState<ProcessType>();
    // Meta f / Meta t
    const [modeDropdown, setModeDropdown] = useState<ProcessType>(modeDropdownValues[1]);
    const [bacteriaDropdown, setBacteriaDropdown] = useState<Bacteria>();
    
    //#region  Modal inputs    
    const [productName, setProductName] = useState('');
    const [productQuantity, setProductQuantity] = useState('');
        
    const [customTemp, setCustomTemp] = useState<number>(0);    
    const [finishTemp, setFinishTemp] = useState<number>(0);
    
    const [maintainTemp, setMaintainTemp] = useState<number>(0);
    
    const [d0, setD0] = useState<number>(0);
    const [z, setZ] = useState<number>(0);

    const targetF = React.useRef<number>(0);
    
    const targetHeatingTime = React.useRef<number>(1);
    const targetCoolingTime = React.useRef<number>(1);
    const batchLTO = React.useRef<string>('');
        
    const fetchedTypes = useRef<ProcessType[]>();
    const fetchedBacteria = useRef<Bacteria[]>();

    //#endregion
    
    const resetInputs = () => {
        
        setProductQuantity('');
        setProductName('');        
        
        //#region modeDropdown        
        setCustomTemp(fetchedTypes.current?.[0]?.customTemp || 0);        
        setFinishTemp(0);
        setMaintainTemp(fetchedTypes.current?.[0]?.maintainTemp || 0);
        setTypeDropdown(fetchedTypes.current?.[0]);
        //setBacteriaDropdown(fetchedBacteria.current[0]);
        //#endregion
        
        //#region typeDropdown
        targetF.current = 0;
        
        setD0(fetchedBacteria.current?.[0]?.d0 || 0);
        setZ(fetchedBacteria.current?.[0]?.z || 0);        

        targetCoolingTime.current = 1;
        targetHeatingTime.current = 1;
        batchLTO.current = '';

        //#endregion
        
    }

    const { mutate: stopProcess } = useMutation({
        mutationFn: stopProcessAction,
        onError: (error) => {
            console.log('Error stopping process:', error);
            console.error('Error stopping process:', error);
            showError('Proces','Greška prilikom zaustavljanja procesa');
        },
        onSuccess: (data) => 
        {
            if(checkForErrors(data)){
                showError('Proces','Greška prilikom dohvaćanja podataka');
                return;
            }

            showSuccess('Proces','Proces se zaustavlja');
        },
    });

    const { data: stateMachineValues } = useQuery(
        { 
            queryKey: ['stateMachineValues'],
            queryFn: () => getStateMachineValuesAction(),            
            refetchInterval: refetchStateMachineIntervals,
            onError: (error) => {
                console.error('Error getting state machine values:', error);
                showError('Proces','Greška prilikom dohvaćanja podataka', 5000);
            },
            onSuccess: (data) => {                
                if(checkForErrors(data)){
                    showError('Proces','Greška prilikom pokretanja procesa', 500);
                    fetchedTypes.current = [];
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
                showError('Proces','Greška prilikom dohvaćanja podataka');
                return;
            }

            const errors = responseParserUtil(data.errorsstring);            
            if (errors[0] !== '') {
                errors.forEach(error => showError('Proces', error, 5000));
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
            console.log('Fetched process types:', fetchedTypes.current);
            setTypeDropdown(data?.processtypesList?.[0]);
            setCustomTemp(fetchedTypes.current?.[0]?.customTemp || 0);
            setFinishTemp(30);
            setMaintainTemp(data?.processtypesList?.[0]?.maintainTemp || 0);
        },
    });

    console.log(customTemp, maintainTemp, finishTemp);
    
    const { mutate: getBacteria } = useMutation({
        mutationFn: getBacteriaAction,
        onError: (error) => {
            console.error('Error stopping process:', error);
            showError('Proces', 'Greška prilikom dohvaćanja podataka');
        },
        onSuccess: (data) => {
            if(checkForErrors(data)){
                showError('Proces', 'Greška prilikom dohvaćanja podataka');
                return;                
            }            
            
            fetchedBacteria.current = data.bacteriaList;            
            setBacteriaDropdown(data?.bacteriaList?.[0]);
            setD0(data?.bacteriaList?.[0]?.d0);
            setZ(data?.bacteriaList?.[0]?.z);
        },
    });
   
    // Fetch process types on component mount
    useEffect(() => {
        processTypes();
        getBacteria();
    }, [processTypes, getBacteria]);

    // Set default values for custom process types    
    useEffect(() => {
        if(typeDropdown?.id === 0 ||
            typeDropdown?.id === 1)
        {            
            setCustomTemp(121.11);            
            setFinishTemp(30);            
            setMaintainTemp(116);            
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

    // Change the mode dropdown based on the selected type
    useEffect(() => {
        if (bacteriaDropdown) {
            setD0(bacteriaDropdown.d0 ?? 0);
            setZ(bacteriaDropdown.z ?? 0);
        }        
    }, [bacteriaDropdown]); // Runs whenever bacteriaDropdown changes

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
            refetchInterval: refetchIntervalRelay,
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

    temperatures[0].value = stateMachineValues?.sensorvalues?.temp?.toString() || 'N/A';
    temperatures[1].value = stateMachineValues?.sensorvalues?.heatertemp?.toString() || 'N/A';
    temperatures[2].value = stateMachineValues?.sensorvalues?.tempk ?.toString() || 'N/A';
    temperatures[3].value = stateMachineValues?.sensorvalues?.pressure ?.toString() || 'N/A';
    temperatures[4].value = stateMachineValues?.sensorvalues?.tanktemp?.toString() || 'N/A';
    temperatures[5].value = stateMachineValues?.sensorvalues?.tankwaterlevel?.toString() || 'N/A';
    temperatures[6].value = stateMachineValues?.sensorvalues?.expansiontemp?.toString() || 'N/A';
    temperatures[7].value = stateMachineValues?.sensorvalues?.steampressure?.toString() || 'N/A';
    
    stateValues[0].value = stateMachineValues?.dr?.toString() || 'N/A';
    stateValues[1].value = stateMachineValues?.fr?.toString() || 'N/A';
    stateValues[2].value = stateMachineValues?.r?.toString() || 'N/A';
    
    const state = stateMachineValues?.state || 0;
    
    relayMapper[0].value = relaySensorValues?.filltankwithwater || 0;
    relayMapper[1].value = relaySensorValues?.tankheating || 0;
    relayMapper[2].value = relaySensorValues?.autoklavfill || 0;
    relayMapper[3].value = relaySensorValues?.heating || 0;
    relayMapper[4].value = relaySensorValues?.cooling || 0;
    relayMapper[5].value = relaySensorValues?.coolinghelper || 0;
    relayMapper[6].value = relaySensorValues?.extensioncooling || 0;
    relayMapper[7].value = relaySensorValues?.waterdrain || 0;
    relayMapper[8].value = relaySensorValues?.pump || 0;
    relayMapper[9].value = relaySensorValues?.increasepressure || 0;
    relayMapper[10].value = relaySensorValues?.alarmsignal || 0;

    const handleStartProcess = () => {        

        if(productName === '' || productQuantity === '') {
            showWarn('Proces','Molimo unesite sve podatke');
            return;
        }

        if(targetHeatingTime.current <= 0){
            showWarn('Proces','Vrijeme sterilizacije mora biti veće od 0');
            return;
        }

        if(targetCoolingTime.current <= 0){
            showWarn('Proces','Vrijeme hlađenja mora biti veće od 0');
            return;
        }

        if(state === 0){            
            if(typeDropdown?.id === 0|| // TODO change this
                typeDropdown?.id === 1)
            {                
                setCustomTemp(typeDropdown?.customTemp || 121.11);                
                setFinishTemp(30);                
                setMaintainTemp(typeDropdown?.maintainTemp || 116);
            }
            const parsedMode = getProcessConfigModeById(modeDropdown?.id);

            const processType = {
                id: typeDropdown?.id || 0,
                customTemp: customTemp,
                maintainTemp: maintainTemp,                
                name: typeDropdown?.name || '',                
            }

            const bacteria: Bacteria = {
                id: bacteriaDropdown?.id || 1,
                name: bacteriaDropdown?.name || '',
                description: '',
                d0: d0,
                z: z,
            };

            const request: StartProcessRequest = {                
                processConfig: {   
                    heatingType: HeatingType.STEAM,
                    mode: parsedMode,                    
                },
                processInfo: {
                    productName: productName,
                    batchLTO: batchLTO.current,
                    bacteria: bacteria,
                    targetF: isNaN(targetF.current) ? '0' : targetF.current.toString(),
                    productQuantity: productQuantity,
                    processStart: new Date().toISOString(),
                    processLength: 'Proces nije završen',
                    targetCoolingTime: (targetCoolingTime.current*60*1000).toString(),
                    targetHeatingTime: (targetHeatingTime.current*60*1000).toString(),
                    processType: processType,
                    finishTemp: finishTemp.toString(),
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
        if(state !== 0){
            showWarn('Proces','Proces je već pokrenut');
            return;
        }

        if(fetchedTypes.current === undefined || fetchedTypes.current.length === 0){
            processTypes();
            showWarn('Proces','Nema dostupnih tipova procesa, molimo pokušajte ponovno');
            return;
        }

        getSuggestions();
        setModalVisibility(true);
    }

    const disabledInput = typeDropdown?.id !== 2;

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
                <Dialog header="Pokretanje procesa" visible={isModalVisible} style={{ width: '90vw' }} onHide={() => {if (!isModalVisible) return; setModalVisibility(false); }} footer={footerContent}>
                <TabView>
                <TabPanel header="Jednostavni unos">
                <div className="flex flex-col items-center">
      
        <ProcessTable />
    </div>
                </TabPanel>
                <TabPanel header="Napredni unos"> 
                    <div className="grid">
                        <div className="col-4">                                    
                            <GeneralStringInput headerName="Naziv produkta" placeholder='Pašteta' inputValue={[productName, setProductName]} suggestions={processSuggestions?.productName}/>                                                        
                            <GeneralStringInput headerName="Broj šarže" placeholder='LTO3242654234' inputValue={batchLTO} suggestions={[]} />                            
                        </div>                
                        <div className="col-4">
                            <GeneralStringInput headerName="Količina" placeholder='500g' inputValue={[productQuantity, setProductQuantity]} suggestions={processSuggestions?.productQuantity}/>                            
                        </div>                        
                        <div className="col-4">
                            <StartProcessDropdown label='Mod' getter={modeDropdown} setter={setModeDropdown} values={modeDropdownValues} />
                            {modeDropdown?.id === ProcessConfigMode.TARGETF ?
                            <>
                                <GeneralNumberInput headerName="Ciljni F" inputValue={targetF} />
                                <GeneralNumberInput headerName="Završna temperatura" inputValue={[finishTemp, setFinishTemp]} />
                            </>
                            :
                            <>
                            <GeneralNumberInput headerName="Vrijeme sterilizacije (min)" inputValue={targetHeatingTime} />                            
                            <GeneralNumberInput headerName="Vrijeme hlađenja (min)" inputValue={targetCoolingTime} />
                            </>
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
                        <div className="col-12">
                            <hr />
                        </div>  
                        <div className="col-4">
                            <StartBacteriaDropdown label='Bakterija' getter={bacteriaDropdown} setter={setBacteriaDropdown} values={fetchedBacteria.current} />
                        </div>                        
                        <div className="col-4">
                            <GeneralNumberInput headerName="D0" disabled={disabledInput} inputValue={[d0, setD0]} />
                            <GeneralNumberInput headerName="Z" disabled={disabledInput} inputValue={[z, setZ]} />                    
                        </div>              
                    </div>
                    </TabPanel>                
                </TabView>
                </Dialog>
                
            </div>
        </div>            
        {/* Display cards */}
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
                        <ProgressBar className='ml-1' color='green' mode="determinate" style={{ height: '10px' }}/> :
                        <ProgressBar color='green' mode="indeterminate" style={{ height: '10px' }}/>
                    }
            </div>
            
            <div className="col-6">
                    <div className='flex flex-column gap-3 ml-2 mr-2'>
                        {relayMapper.slice(0,5) .map((chip, index) => (
                                <ChipStates key={chip.name} {...chip} />
                        ))}
                    </div>                    
            </div>
            <div className="col-5">
            <div className='flex flex-column gap-3 -ml-2 -mr-2 '>
                        {relayMapper.slice(5,relayMapper.length) .map((chip, index) => (
                                <ChipStates key={chip.name} {...chip} />
                        ))}
            </div>
            </div>
            </div>
            </div>
        </div>
        
        {/* Display first column */}
        <div className="col-4">            
                <div className="card border-red-700">
                    <ul className="list-none p-0 m-0">
                        {temperatures.slice(0,4).map((item, index) => (
                            <DataCard key={item.headerName} {...item} />
                        ))}
                    </ul>                    
                </div>
                <div className="card border-cyan-700">
                    <ul className="list-none p-0 m-0">
                        {stateValues.slice(0,2).map((item, index) => (
                            <DataCard key={item.headerName} {...item} />
                        ))}
                    </ul>                                        
                </div>
        </div>
            
        {/* Display second column */}
        <div className="col-4">
            <div className="card border-red-700">                                                                
                <ul className="list-none p-0 m-0">
                    {temperatures.slice(4,8).map((item, index) => (
                        <DataCard key={item.headerName} {...item} />
                    ))}
                </ul>                
            </div>
            <div className="card border-cyan-700">
                <ul className="list-none p-0 m-0">
                    {stateValues.slice(2,3).map((item, index) => (
                        <DataCard key={item.headerName} {...item} />
                    ))}
                </ul>                                        
            </div>
        </div>    
    </div>
    );
};

export default DashboardPage;
