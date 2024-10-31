"use client";

import { Chip } from 'primereact/chip';

export enum Severity {
    Success = "success",
    Info = "info",
    Warning = "warning",
    Danger = "danger"
}

const firstColumn = (name:string, severity: Severity) => {
    return <div className="col-4">
    <div className="card mb-0">
        <div className="flex justify-content-between mb-3">
            <div>                            
                {RenderState(severity)}
                <div className="text-900 font-medium text-xl">{name}</div>
            </div>                        
        </div>                    
        <span className="text-500">Ime konzerve</span>
    </div>
</div>;
}

const secondColumn = (time:string, severity: Severity) => {
    let subHeader = "Završeno vrijeme";
    if(severity === Severity.Warning) {
        subHeader = "Vrijeme rada";
    }else if(severity === Severity.Success) {
        subHeader = "Vrijeme";
    }else if(severity === Severity.Danger) {
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

const thirdColumn = (time:string, severity: Severity) => {
    let subHeader = "(Procjena) Preostalog vremena";
    if(severity === Severity.Success) {
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
export const RenderState = (severity: Severity) => {
        switch (severity) {
            case Severity.Success:
                return <Chip label="Proces je završio" icon="pi pi-check" className="bg-green-700 text-900 text-xs font-small mb-3" />;
            case Severity.Info:
                return <Chip label="Spremno za početak" icon="pi pi-info-circle" className="bg-blue-500 text-900 text-xs font-small mb-3" />;
            case Severity.Warning:
                return <Chip label="Proces je u izvođenju" icon="pi pi-exclamation-triangle" className="bg-yellow-800 text-900 text-xs font-small mb-3" />;
            case Severity.Danger:
                return <Chip label="Greška u izvođenju" icon="pi pi-times" className="bg-red-700 text-900 text-xs font-small mb-3" />;
            default:
                return null;
        }
    };

const StatusHeader = () => {

    const severity = Severity.Danger;
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