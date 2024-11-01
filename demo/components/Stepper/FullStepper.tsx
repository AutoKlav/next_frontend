import React, { useRef, useState } from "react";
import { Button } from 'primereact/button';
import { Steps } from 'primereact/steps';
import { ProgressBar } from 'primereact/progressbar';
import { InputNumber } from "primereact/inputnumber";
import { Toast } from 'primereact/toast';

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
    const y1y2 = useRef<number[]>([]); 
    const x1x2 = useRef<number[]>([4,6]);


    const toast = useRef<Toast>(null);
    console.log('minMaxValues', y1y2.current);
    const items = [
        { label: 'Očitanje najmanje vrijednosti' },
        { label: 'Očitanje najveće vrijednosti' },
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
        if(!inputValue.current) {
            showWarn();
            return;
        }

        setLoading(true);
        let progressValue = 0;

        const interval = setInterval(() => {
            progressValue += 20;
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

                <div className="flex flex-row gap-1">
                    <div className="flex flex-column gap-2">
                        {/* Input Fields */}
                        {currentStep !== 2 ? (
                            <>
                            <label>Upišite najmanju vrijednost</label>
                            <InputNumber                        
                                key={currentStep} // Unique key to reset input
                                defaultValue={inputValue.current} // Clear value on next step
                                onChange={(e) => (inputValue.current = e.value ? e.value : 0)}                        
                                mode="decimal"
                                showButtons
                                className="p-inputtext-md p-1"
                                style={{ borderRadius: '13px' }}>                            
                            </InputNumber>
                            </>
                        ): null}                   
                        
                        </div>                
                        {loading && (
                            <div className="flex flex-column gap-2">
                            <label>Očitana vrijednost</label>
                            <InputNumber 
                                value={1033}
                                readOnly
                                className="p-inputtext-md p-1"
                                style={{ borderRadius: '13px' }} 
                            />
                            </div>                        
                    )}
                </div>                

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
