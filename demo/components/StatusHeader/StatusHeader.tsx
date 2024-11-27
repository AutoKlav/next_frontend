"use client";

import { Chip } from 'primereact/chip';

export enum Severity {
    Success = "success",
    Info = "info",
    WarningFilling = "warning",
    WarningHeating = "warning",
    WarningCooling = "warning",    
    Danger = "danger"
}

const firstColumn = (name:string, state: number) => {
    return <div className="col-4">
    <div className="card mb-0">
        <div className="flex justify-content-between mb-3">
            <div>                            
                {RenderState(state)}
                <div className="text-900 font-medium text-xl">{name}</div>
            </div>                        
        </div>                    
        <span className="text-500">Ime konzerve</span>
    </div>
</div>;
}

const secondColumn = (time:string, state: number) => {
    let subHeader = "Završeno vrijeme";
    if(state === 2) {
        subHeader = "Vrijeme rada";
    }else if(state === 5 || state === 6) {
        subHeader = "Vrijeme";
    }else if(state === -1) {
        subHeader = "Vrijeme";
    }
    return  <div className="col-4">
                <div className="card mb-0 h-full">
                    <div className="mb-3 mt-5">
                        <div>
                            <div className="text-900 font-medium text-xl">{time}</div>
                        </div>
                    </div>
                    <span className="text-500">{subHeader}</span>
                </div>
            </div>;
}

const thirdColumn = (time:string, state: number) => {
    let subHeader = "(Procjena) Preostalog vremena";
    if(state === 5 || state === 6) {
        subHeader = "Total F";
    }
    return <div className="col-4">
                <div className="card mb-0 h-full">                        
                    <div className="mb-3 mt-5">
                        <div>                            
                            <div className="text-900 font-medium text-xl">{time}</div>
                        </div>                        
                    </div>                    
                    <span className="text-500">{subHeader}</span>
                </div>
            </div>;
}
export const RenderState = (state:number) => {
    switch (state) {
        case 0:
            return <Chip key={'0'} label="Proces je spreman za početak" icon="pi pi-info-circle" className="bg-blue-500 text-900 text-sm font-medium mb-3" />;
        case 2:
            return <Chip key={'1'} label="Proces je u izvođenju (Punjenje)" icon="pi pi-exclamation-triangle" className="bg-yellow-800 text-900 text-sm font-medium mb-3" />;
        case 3:
            return <Chip key={'2'} label="Proces je u izvođenju (Zagrijavanje)" icon="pi pi-exclamation-triangle" className="bg-yellow-800 text-900 text-sm font-medium mb-3" />;
        case 4:
            return <Chip key={'3'} label="Proces je u izvođenju (Hlađenje)" icon="pi pi-exclamation-triangle" className="bg-yellow-800 text-900 text-sm font-medium mb-3" />;
        case 5:
            return <Chip key={'6'} label="Proces je pri kraju" icon="pi pi-check" className="bg-green-700 text-900 text-sm font-medium mb-3" />;
        case 6:
            return <Chip key={'6'} label="Proces je završio" icon="pi pi-check" className="bg-green-700 text-900 text-sm font-medium mb-3" />;
        case -1:
            return <Chip key={'5'} label="Greška u izvođenju" icon="pi pi-times" className="bg-red-700 text-900 text-sm font-medium mb-3" />;
        default:
            return null;
    }
};

const StatusHeader = () => {

    const severity = -1;
    const name = "Grah 500g";
    const timeSecond = "00:30:00";
    const timeThird = "00:30:00";
    return (
        <div className="grid">
            {firstColumn(name, severity)}            
            {secondColumn(timeSecond, severity)}
            {thirdColumn(timeThird, severity)}            
        </div>        
    );
};

export default StatusHeader;