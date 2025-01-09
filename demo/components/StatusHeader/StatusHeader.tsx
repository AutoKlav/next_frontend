"use client";

export enum Severity {
    Success = 0,
    Info = 0,    
    WarningFilling = 2,
    WarningHeating = 3,
    WarningCooling = 4,    
    Danger = -1,
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

export const RenderState = (state: number) => {
    const baseClass =
        "text-lg font-medium mb-3 pl-3 pt-3 pr-2 pb-3 w-full flex items-center justify-center";
    const iconClassMultipleRows = "text-2xl mr-3 ml-1 mt-2";
    const iconClassOneRow = "text-2xl";
    const spanClass = "text-xl";

    switch (state) {
        case 0:
            return (
                <div
                    className={`bg-blue-500 text-900 ${baseClass}`}
                    style={{ borderRadius: "12px" }}
                >
                    <span className={spanClass}>Proces je spreman za početak</span>
                    <div className="flex items-center">
                        <i className={`pi pi-info-circle ${iconClassMultipleRows}`}></i>
                    </div>
                </div>
            );

        case 1:
            return (
                <div
                    className={`bg-blue-300 text-900 ${baseClass}`}
                    style={{ borderRadius: "12px" }}
                >
                    <span className={spanClass}>Proces se pokreće</span>
                    <div className="flex items-center">
                        <i className={`pi pi-spin pi-spinner ${iconClassMultipleRows}`}></i>
                    </div>
                </div>
            );

        case 2:
            return (
                <div
                    className={`bg-yellow-800 text-900 ${baseClass}`}
                    style={{ borderRadius: "12px" }}
                >
                    <span className={spanClass}>Proces je u izvođenju (Punjenje)</span>
                    <div className="flex items-center">
                        <i className={`pi pi-exclamation-triangle ${iconClassMultipleRows}`}></i>
                    </div>
                </div>
            );

        case 3:
            return (
                <div
                    className={`bg-yellow-800 text-900 ${baseClass}`}
                    style={{ borderRadius: "12px" }}
                >
                    <span className={spanClass}>Proces je u izvođenju (Zagrijavanje)</span>
                    <div className="flex items-center flex-col">
                        <i className={`pi pi-exclamation-triangle ${iconClassMultipleRows}`}></i>
                    </div>
                </div>
            );

        case 4:
            return (
                <div
                    className={`bg-blue-500 text-900 ${baseClass}`}
                    style={{ borderRadius: "12px" }}
                >
                    <span className={spanClass}>Proces je u izvođenju (Sterilizacija)</span>
                    <div className="flex items-center flex-col">
                        <i className={`pi pi-cog ${iconClassMultipleRows}`}></i>
                    </div>
                </div>
            );

        case 5:
            return (
                <div
                    className={`bg-blue-500 text-900 ${baseClass}`}
                    style={{ borderRadius: "12px" }}
                >
                    <span className={spanClass}>Proces je u izvođenju (Hlađenje)</span>
                    <div className="flex items-center flex-col">
                        <i className={`pi pi-refresh ${iconClassMultipleRows}`}></i>
                    </div>
                </div>
            );

        case 6:
            return (
                <div
                    className={`bg-green-700 text-900 ${baseClass}`}
                    style={{ borderRadius: "12px" }}
                >
                    <div className="flex items-center justify-between w-full">
                        <span className={spanClass}>Proces je pri kraju</span>
                        <i className={`pi pi-check ml-7 ${iconClassOneRow}`}></i>
                    </div>
                </div>
            );

        case 7:
            return (
                <div
                    className={`bg-green-800 text-900 ${baseClass}`}
                    style={{ borderRadius: "12px" }}
                >
                    <span className={spanClass}>Proces je završio</span>
                    <div className="flex items-center flex-col">
                        <i className={`pi pi-check-circle ml-8 ${iconClassOneRow}`}></i>
                    </div>
                </div>
            );

        case -1:
            return (
                <div
                    className={`bg-red-700 text-900 ${baseClass}`}
                    style={{ borderRadius: "12px" }}
                >
                    <span className={spanClass}>Greška u izvođenju</span>
                    <div className="flex items-center flex-col">
                        <i className={`pi pi-times ml-7 ${iconClassOneRow}`}></i>
                    </div>
                </div>
            );

        default:
            return (
                <div
                    className={`bg-gray-500 text-900 ${baseClass}`}
                    style={{ borderRadius: "12px" }}
                >
                    <span className={spanClass}>Nepoznat status</span>
                    <div className="flex items-center flex-col">
                        <i className={`pi pi-question-circle ml-7 ${iconClassOneRow}`}></i>
                    </div>
                </div>
            );
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