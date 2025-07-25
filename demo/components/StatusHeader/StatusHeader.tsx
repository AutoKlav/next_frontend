"use client";

export enum Severity {
    Success = 0,
    Info = 0,
    WarningFilling = 2,
    WarningHeating = 3,
    WarningCooling = 4,
    Danger = -1,
}

const firstColumn = (name: string, quantity: string, state: number, heatingEnd: string, coolingEnd: string) => {
    return <div className="col-6">
        <div className="card mb-0">
            <div className="flex justify-content-between mb-3">
                <div>
                    <div className="text-900 font-medium text-xl">{name} {quantity}</div>
                </div>
            </div>
            <span className="text-500">Ime</span>
        </div>
    </div>;
}

const secondColumn = (time: string, state: number) => {
    let subHeader = "Završeno vrijeme";
    if (state === 0 || state === 1 || state === 2 || state === 3 || state === 4 || state === 7 || state === 8) {
        subHeader = "Prošlo vrijeme";
    }
    return <div className="col-6">
        <div className="card mb-0 h-full">
            <div className="flex justify-content-between mb-3">
                <div>
                    <div className="text-900 font-medium text-xl">{time}</div>
                </div>
            </div>
            <span className="text-500">{subHeader}</span>
        </div>
    </div>;
}

export const RenderState = (state: number, heatingEnd: string, coolingEnd: string) => {
    const baseClass =
        "text-lg font-medium mb-3 pl-3 pt-3 pr-2 pb-3 w-full flex items-center justify-between";
    const spanClass = "text-xl";

    switch (state) {
        case 0:
            return (
                <div className={`bg-blue-500 text-900 ${baseClass}`} style={{ borderRadius: "12px" }}>
                    <span className={spanClass}>Proces je spreman za početak</span>
                </div>
            );

        case 1:
            return (
                <div className={`bg-blue-500 text-900 ${baseClass}`} style={{ borderRadius: "12px" }}>
                    <span className={spanClass}>Proces je pokrenut za izvođenje</span>
                </div>
            );

        case 2:
            return (
                <div className={`bg-yellow-800 text-900 ${baseClass}`} style={{ borderRadius: "12px" }}>
                    <span className={spanClass}>Proces je u izvođenju (Punjenje)</span>
                </div>
            );

        case 3:
            return (
                <div className={`bg-yellow-800 text-900 ${baseClass}`} style={{ borderRadius: "12px" }}>
                    <span className={spanClass}>Proces je u izvođenju (Zagrijavanje)</span>
                </div>
            );

        case 4:
            return (
                <div className={`bg-blue-500 text-900 ${baseClass}`} style={{ borderRadius: "12px" }}>
                    <div className="flex flex-col">
                        <span className={spanClass}>
                            Proces je u izvođenju (Sterilizacija)
                            <br />
                            <br />
                            {heatingEnd && <span>Kraj sterilizacije: {heatingEnd}</span>}
                        </span>
                    </div>
                </div>
            );

        case 5:
            return (
                <div className={`bg-blue-500 text-900 ${baseClass}`} style={{ borderRadius: "12px" }}>
                    <span className={spanClass}>
                        Proces je u izvođenju
                        <br />
                        (Punjenje spremnika: pred-hlađenje)
                    </span>
                </div>
            );

        case 6:
            return (
                <div className={`bg-blue-500 text-900 ${baseClass}`} style={{ borderRadius: "12px" }}>
                    <div className="flex flex-col">
                        <span className={spanClass}>
                            Proces je u izvođenju (Hlađenje)
                            <br />
                            <br />
                            {coolingEnd && <span>Kraj hlađenja: {coolingEnd}</span>}
                        </span>
                    </div>
                </div>
            );

        case 7:
            return (
                <div className={`bg-green-700 text-900 ${baseClass}`} style={{ borderRadius: "12px" }}>
                    <span className={spanClass}>Proces je pri kraju</span>
                </div>
            );

        case 8:
            return (
                <div className={`bg-green-800 text-900 ${baseClass}`} style={{ borderRadius: "12px" }}>
                    <span className={spanClass}>Proces je završio</span>
                </div>
            );

        case -1:
            return (
                <div className={`bg-red-700 text-900 ${baseClass}`} style={{ borderRadius: "12px" }}>
                    <span className={spanClass}>Greška u izvođenju</span>
                </div>
            );

        default:
            return (
                <div className={`bg-gray-500 text-900 ${baseClass}`} style={{ borderRadius: "12px" }}>
                    <span className={spanClass}>Nepoznat status</span>
                </div>
            );
    }
};

const StatusHeader = () => {

    const severity = 6;
    const name = "Grah";
    const quantity = "500g";
    const timeSecond = "00:32:00"
    return (
        <div className="grid">
            {firstColumn(name, quantity, severity, "2023-10-01 12:00:00", "2023-10-01 12:30:00")}
            {secondColumn(timeSecond, severity)}
            <div className="classname col-12">
                {RenderState(severity, 'a', 'b')}
            </div>
        </div>
    );
};

export default StatusHeader;