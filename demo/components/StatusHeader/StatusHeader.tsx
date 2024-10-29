"use client";

import { Tag } from "primereact/tag";

enum Severity {
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
                {renderTag(severity)}
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
const renderTag = (severity: Severity) => {
    switch (severity) {
        case Severity.Success:
            return <Tag className="mb-3" icon="pi pi-check" severity="success" value="Proces je završio"></Tag>;
            
        case Severity.Info:
             return <Tag className="mb-3" icon="pi pi-info-circle" severity="info" value="Spremno za početak"></Tag>;
        case Severity.Warning:
            return <Tag className="mb-3" icon="pi pi-exclamation-triangle" severity="warning" value="Proces je u izvođenju"></Tag>;
            
        case Severity.Danger:
            return <Tag className="mb-3" icon="pi pi-times" severity="danger" value="Greška u izvođenju"></Tag>;
                
            
        default:
            return <div className="col-4">
                Wrong severity
                </div>;

    }
};

const StatusHeader = () => {

    const severity = Severity.Success;
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