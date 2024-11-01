import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Steps } from 'primereact/steps';
import { ProgressBar } from 'primereact/progressbar';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from "primereact/inputtext";

const FullStepper = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [value, setValue] = useState('');

    const items = [
        { label: 'Očitanje najmanje vrijednosti' },
        { label: 'Očitanje najveće vrijednosti' },
        { label: 'Rezultat kalibracije' }
    ];

    const handleNext = () => {
        if (currentStep < items.length - 1) {
            setCurrentStep((prevStep) => prevStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep((prevStep) => prevStep - 1);
        }
    };

    // Dynamic placeholder and label text based on step
    const stepContent = [
        "Upiši najmanju vrijednost",
        "Upiši najveću vrijednost",
        "Rezultat kalibracije prikazan ovdje"
    ];

    return (
        <div className="card p-7 shadow-lg rounded-lg">
            <div className="flex flex-column gap-3">
                
                {/* Step Indicator */}
                <Steps model={items} activeIndex={currentStep} className="mb-2" />
                
                {/* Progress Bar */}
                <ProgressBar value={(currentStep + 1) * (100 / items.length)} showValue={false} className="mb-3" />

                {/* Input Field */}
                <FloatLabel className="mt-2">
                    <InputText 
                        id={`step-input-${currentStep}`} 
                        value={value}
                        type="number"
                        onChange={(e) => setValue(e.target.value)} 
                        className="p-inputtext-lg p-3"
                        style={{ borderRadius: '13px' }} 
                    />
                    <label htmlFor={`step-input-${currentStep}`}>{stepContent[currentStep]}</label>
                </FloatLabel>

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
                            iconPos="right" 
                            onClick={handleNext} 
                            className="p-button  md:w-auto p-button-rounded p-2 ml-auto"
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default FullStepper;
