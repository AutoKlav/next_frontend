"use client";
import React, { use, useRef, useState } from "react";
import { Button } from 'primereact/button';
import { Steps } from 'primereact/steps';
import { ProgressBar } from 'primereact/progressbar';
import { Toast } from 'primereact/toast';
import CalibrationInput from "../Inputs/CalibrationInput";
import CalibrationResults from "../Inputs/CalibrationResults";
import SensorDropdown from "../Inputs/SensorDropdown";
import { useMutation } from "@tanstack/react-query";
import { getStateMachineValuesAction } from "@/app/(main)/api/actions";

const calculateLineEquation = (x1x2: number[], y1y2: number[]) => {
    if (x1x2.length !== 2 || y1y2.length !== 2) {
        console.error('Invalid input arrays. Both arrays must contain exactly two elements.');
        return;
    }

    const [x1, x2] = x1x2;
    const [y1, y2] = y1y2;

    const m = (y2 - y1) / (x2 - x1);
    const b = y1 - m * x1;

    console.log(`Line equation: y = ${m}x + ${b}`);
};

const FullStepper = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const inputValue = useRef(0);
    const sensorValuesArray = useRef<number[]>([]);

    const selectedSensorRef = useRef<SensorDropdown | null>(null);   
    
    const y1y2 = useRef<number[]>([0,0]); 
    const x1x2 = useRef<number[]>([0,0]);

    const { mutate: getSensorValuesMutation } = useMutation({
        mutationFn: getStateMachineValuesAction,
        onError: (error) => {
            console.error('Error fetching sensor values:', error);
        },
        onSuccess: (data) => {
            console.log('Sensor values:', data);
            if(selectedSensorRef.current?.id === 'pressure'){                
                if(x1x2.current[currentStep] < data.pressure){
                    x1x2.current[currentStep] = data.pressure;
                }
            }
            else if(selectedSensorRef.current?.id === 'temp'){
                if(x1x2.current[currentStep] < data.temp){
                    x1x2.current[currentStep] = data.temp;
                }
            }
            else if(selectedSensorRef.current?.id === 'tempk'){
                if(x1x2.current[currentStep] < data.tempk){
                    x1x2.current[currentStep] = data.tempk;
                }
            }
            console.log('Values ', x1x2.current);
        },
    });

    const toast = useRef<Toast>(null);
    
    const items = [
        { label: 'Odabir senzora' },
        { label: 'Upis najmanje vrijednosti' },
        { label: 'Upis najveće vrijednosti' },
        { label: 'Rezultati kalibracije' }
    ];

    const showWarn = () => {
        toast.current?.show({
            severity: 'warn',
            summary: 'Vrijednost nije unesena',
            detail: 'Molimo unesite vrijednost',
            life: 3000
        });
    };

    const handleNext = () => {

        // Value is not selected        
        if(!selectedSensorRef.current){
            showWarn();
            return;
        }
        
        // there is no progress bar loading on the first step, so we can skip setInterval
        if(currentStep == 0){
            setCurrentStep((prevStep) => prevStep + 1);
            return;            
        }

        if((currentStep==1 || currentStep==2) && !inputValue.current) {
            showWarn();
            return;
        }

        setLoading(true);
        let progressValue = 0;

        const interval = setInterval(() => {
            progressValue += 20;
            getSensorValuesMutation();
            setProgress(progressValue);
            if (progressValue >= 100) {
                clearInterval(interval);
                setLoading(false);
                setProgress(0);

                y1y2.current[currentStep] = Number(inputValue.current) || 0;
                
                // Clear the input after saving
                inputValue.current = 0; 

                if (currentStep < items.length - 1) {
                    setCurrentStep((prevStep) => prevStep + 1);
                }
            }
        }, 1000);
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep((prevStep) => prevStep - 1);
        }
    };

    return (        
        <div className="card p-7 shadow-lg rounded-lg">
            <div className="flex flex-column gap-3">
                <Toast ref={toast} />
                {/* Step Indicator */}
                <Steps model={items} activeIndex={currentStep} className="mb-2" />
                
                {/* Progress Bar */}
                <ProgressBar 
                    value={Math.round((currentStep + 1) * (100 / items.length) + progress / items.length)} 
                    showValue={true}  
                    style={{ height: '24px', borderRadius: '50px', color: 'white' }} 
                    className="mb-3" 
                />
                {currentStep === 0 ? (
                    <SensorDropdown selectedSensorRef={selectedSensorRef}/>
                ): null}

                {currentStep === 1 || currentStep === 2 ? (

                    <CalibrationInput currentStep={currentStep} inputValue={inputValue} loading={loading} />                            
                ) : null }
                {currentStep === 3 ? (
                    <CalibrationResults minCalibratedValue={1023} maxCalibratedValue={1000} />                
                ) : null }

                {/* Navigation Buttons */}
                <div className="flex justify-content-between align-items-center gap-4 mt-4">
                    {currentStep !== 0 && (
                        <Button 
                            label="Back" 
                            icon="pi pi-arrow-left" 
                            className="p-button-secondary w-full md:w-auto p-button-rounded p-2"
                            onClick={handleBack}                       
                        />
                    )}
                    
                    {currentStep < items.length - 1 && (
                        <Button 
                            label="Next" 
                            icon="pi pi-arrow-right" 
                            iconPos={loading ? "left" : "right"} 
                            onClick={handleNext} 
                            className="p-button  md:w-auto p-button-rounded p-2 ml-auto"
                            loading={loading}                            
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default FullStepper;
