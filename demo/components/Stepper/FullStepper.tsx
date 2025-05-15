"use client";
import React, { useRef, useState } from "react";
import { Button } from "primereact/button";
import { Steps } from "primereact/steps";
import { ProgressBar } from "primereact/progressbar";
import { Toast } from "primereact/toast";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/layout/context/toastcontext";
import CalibrationInput from "../Inputs/CalibrationInput"; 
import CalibrationResults from "../Inputs/CalibrationResults"; 
import SensorDropdown from "../Inputs/Dropdown/SensorDropdown";
import { checkForErrors } from "@/utils/errorUtil";
import { getSensorPinValuesAction, updateSensorAction } from "@/app/(main)/api/actions";
import { UpdateSensorRequest } from "@/types/grpc";

enum CalibrationSteps {
    SelectSensor = 0,
    InputMinValue = 1,
    InputMaxValue = 2,
    CalibrationResults = 3,
}

const FullStepper = () => {
    const { showSuccess, showWarn, showError } = useToast();

    const [currentStep, setCurrentStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    const inputValue = useRef(0);
    const errorPresent = useRef<boolean | null>(null);
    const stepRef = useRef(0);

    const selectedSensorRef = useRef<SensorDropdown | null>(null);
    const y1y2 = useRef<number[]>([0, 0]);
    const [x1x2, setX1X2] = useState<number[]>([0, 0]);
    const [result, setResult] = useState([0,0]);

    const updateIndex = (index: number, value: number) => {
        if (index < 0 || index >= x1x2.length) {
            console.warn("Invalid index for updateIndex:", index);
            return;
        }
        console.log("updateIndex ", index, value);
        setX1X2((prevState) => {
            const newState = [...prevState];
            newState[index] = value;
            return newState;
        });
    };
    
    const { mutate: getSensorValuesMutation } = useMutation({
        mutationFn: getSensorPinValuesAction,
        onError: () => {
            showError(
                "Greška",
                "Nije moguće dohvatiti podatke sa senzora. Provjerite konekciju i pokušajte ponovno."
            );
        },
        onSuccess: (data) => {            
            if(checkForErrors(data)){            
                errorPresent.current = true;
                return;
            }
            console.log("Raw Sensor values:", data);
            // Adjust the position logic to avoid overwriting x1x2[0]
            const position = stepRef.current === CalibrationSteps.InputMinValue ? 0 : stepRef.current === CalibrationSteps.InputMaxValue ? 1 : -1;
            if (position >= 0) {
                const sensorId = selectedSensorRef.current?.id;
                const sensorValue = 
                sensorId === "pressure"
                    ? data.pressure
                    : sensorId === "temp"
                    ? data.temp
                    : sensorId === "tempK"
                    ? data.tempk
                    : sensorId === "expansionTemp"
                    ? data.expansiontemp
                    : sensorId === "heaterTemp"
                    ? data.heatertemp
                    : sensorId === "tankTemp"
                    ? data.tanktemp
                    : sensorId === "tankWaterLevel"
                    ? data.tankwaterlevel
                    : sensorId === "steamPressure"
                    ? data.steampressure
                    : 0;
                updateIndex(position, sensorValue);
            }
        },
    });

    const { mutate: setSensorMutation } = useMutation({
        mutationFn: updateSensorAction,
        onError: () => {
            showError(
                "Greška",
                "Nije moguće upisati podatke. Provjerite konekciju i pokušajte ponovno."
            );
        },
        onSuccess: (data) => {            
            if(checkForErrors(data)){            
                errorPresent.current = true;
                return;
            }
            
            showSuccess("Uspjeh", "Podaci su uspješno upisani.");
        },
    });

    const items = [
        { label: "Odabir senzora" },
        { label: "Upis prve vrijednosti" },
        { label: "Upis druge vrijednosti" },
        { label: "Rezultati kalibracije" },
    ];

    const handleNext = () => {        
        if (!selectedSensorRef.current) {
            showWarn("Upozorenje", "Molimo odaberite senzor.");
            return;
        }

        if (currentStep === CalibrationSteps.SelectSensor) {
            setCurrentStep((prevStep) => prevStep + 1);
            return;
        }

        if ((currentStep === CalibrationSteps.InputMinValue || currentStep === CalibrationSteps.InputMaxValue) && inputValue.current == null) {
            showWarn('Upozorenje', 'Molimo unesite vrijednost.');
            return;
        }

        setLoading(true);
        stepRef.current = currentStep; // Sync ref with state
        let progressValue = 0;

        const interval = setInterval(() => {
            if (errorPresent.current) {
                clearInterval(interval);
                setLoading(false);
                setProgress(0);
                showError(
                    "Greška",
                    "Nije moguće dohvatiti podatke sa senzora. Provjerite konekciju i pokušajte ponovno."
                );
                return;
            }
            
            progressValue += 20;
            getSensorValuesMutation();
            setProgress(progressValue);

            if (progressValue >= 100) {
                clearInterval(interval);
                setLoading(false);
                setProgress(0);

                y1y2.current[currentStep - 1] = Number(inputValue.current) || 0;
                inputValue.current = 0;

                if (currentStep < items.length - 1) {
                    setCurrentStep((prevStep) => prevStep + 1);
                    stepRef.current = currentStep + 1; // Sync ref for the next step
                }
            }
        }, 1000);
    };

    const handleBack = () => {
        resetValues();
    };

    const resetValues = () => {
        setCurrentStep(0);
        setProgress(0);
        setLoading(false);
        inputValue.current = 0;
        errorPresent.current = null;
        stepRef.current = 0;
        selectedSensorRef.current = null;
        y1y2.current = [0, 0];
        setX1X2([0, 0]);
    }

    const handleCalibrate = () => {
        if(result.some((r) => isNaN(r))){
            showError('Greška', 'Kalibrirane vrijednosti su nesipravne. Molimo projverite unesene i očitane vrijednosti.', 5000);
            resetValues();
            return;
        }
                
        const updateSensor: UpdateSensorRequest = {
            name: selectedSensorRef.current?.position || 0,
            minValue: result[0],
            maxValue: result[1],
        }
        
        setSensorMutation(updateSensor);
        resetValues();
    }

    return (
        <div className="card p-7 shadow-lg rounded-lg">
            <div className="flex flex-column gap-3">
                <Toast ref={useRef<Toast>(null)} />
                <Steps model={items} activeIndex={currentStep} className="mb-2" />
                <ProgressBar
                    value={Math.round((currentStep + 1) * (100 / items.length) + progress / items.length)}
                    showValue={true}
                    style={{ height: "24px", borderRadius: "50px", color: "white" }}
                    className="mb-3"
                />
                {currentStep === CalibrationSteps.SelectSensor && <SensorDropdown selectedSensorRef={selectedSensorRef} />}
                {(currentStep === CalibrationSteps.InputMinValue || currentStep === CalibrationSteps.InputMaxValue) && (
                    <CalibrationInput currentStep={currentStep} inputValue={inputValue} />
                )}
                {currentStep === CalibrationSteps.CalibrationResults && (
                    <CalibrationResults x1x2={x1x2} y1y2={y1y2.current} sensorName={selectedSensorRef.current?.name} setResult={setResult}/>
                )}
                <div className="flex justify-content-between align-items-center gap-4 mt-4">
                    {currentStep === items.length -1 && (
                        <Button
                            label="Poništi i vrati se na početak"
                            icon="pi pi-arrow-left"
                            className="p-button-secondary w-full md:w-auto p-button-rounded p-2"
                            onClick={handleBack}
                        />
                    )}
                    {currentStep < items.length - 1 && (
                        <Button
                            label="Sljedeći korak"
                            icon="pi pi-arrow-right"
                            iconPos={loading ? "left" : "right"}
                            onClick={handleNext}
                            className="p-button md:w-auto p-button-rounded p-2 ml-auto"
                            loading={loading}
                        />
                    )}
                    {currentStep === items.length - 1 && (
                        <Button
                            label="Kalibriraj i vrati se na početnu stranicu"
                            icon="pi pi-cog"
                            iconPos={loading ? "left" : "right"}
                            onClick={handleCalibrate}
                            className="p-button md:w-auto p-button-rounded p-2 ml-auto"
                            loading={loading}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default FullStepper;
