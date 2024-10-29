"use client";

import { Tag } from "primereact/tag";

enum Severity {
    Success = "success",
    Info = "info",
    Warning = "warning",
    Danger = "danger"
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
            return null;
    }
};

const StatusHeader = () => {

    const severity = Severity.Success;

    return (
        <div className="grid">
            <div className="col-4">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            {renderTag(severity)}
                            <div className="text-900 font-medium text-xl">Grah 500g</div>
                        </div>                        
                    </div>                    
                    <span className="text-500">Ime konzerve</span>
                </div>
            </div>
            <div className="col-4">
                <div className="card mb-0 h-full">
                    <div className="mb-3 mt-5">
                        <div>
                            <div className="text-900 font-medium text-xl">01:30:30</div>
                        </div>
                    </div>                    
                    <span className="text-500">Završeno vrijeme</span>
                </div>
            </div>
            <div className="col-4">
                <div className="card mb-0 h-full">                        
                    <div className="mb-3 mt-5">
                        <div>                            
                            <div className="text-900 font-medium text-xl">00:30:00</div>
                        </div>                        
                    </div>                    
                    <span className="text-500">Predviđen kraj</span>
                </div>
            </div>
        </div>
    );
};

export default StatusHeader;