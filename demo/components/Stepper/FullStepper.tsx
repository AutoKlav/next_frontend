import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Steps } from 'primereact/steps';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from "primereact/inputtext";

const FullStepper = () => {
    const [currentStep, setCurrentStep] = useState(0); // Starting at the first step
    const [value, setValue] = useState('');

    const items = [
        {
            label: 'Očitanje najmanje vrijednosti'
        },
        {
            label: 'Očitanje najveće vrijednosti'
        },
        {
            label: 'Rezultat kalibracije'
        }
    ];

    const handleNext = () => {
        if (currentStep < items.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <div className="card">
            <div style={{ flexBasis: '50rem' }} className="flex flex-column gap-4">
                <Steps model={items} activeIndex={currentStep} />

                <FloatLabel className="mt-3">
                    <InputText 
                        id="username" 
                        value={value} 
                        onChange={(e) => setValue(e.target.value)} 
                    />
                    <label htmlFor="username">Upiši najmanju vrijednost</label>
                </FloatLabel>

                {/* Conditional rendering for buttons */}
                <div className="flex justify-content-between align-items-center gap-2">
                    {currentStep > 0 && (
                        <Button 
                            label="Back" 
                            severity="secondary" 
                            icon="pi pi-arrow-left" 
                            onClick={handleBack} 
                        />
                    )}
                    {currentStep < items.length - 1 && (
                        <Button 
                            label="Next" 
                            icon="pi pi-arrow-right" 
                            iconPos="right" 
                            onClick={handleNext} 
                            className="ml-auto" 
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default FullStepper;
