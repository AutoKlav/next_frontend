interface DataCardProps {
    icon: string;
    headerName: string;
    value: string;
    unit: string;
    color: string;
}

export const DataCard: React.FC<DataCardProps> = (dataProps: DataCardProps) => {
    const { icon, headerName, value, unit, color } = dataProps;

    return (
        <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
            <div className="flex flex-column">
                <div className='flex flex-row items-center gap-2'>
                    <i className={`pi ${icon} text-2xl text-${color}-500 mb-2`}></i>
                    <span className="text-900 font-small mb-2">{headerName}</span>
                </div>
                <div className="flex justify-between items-center bg-gray-900 p-2" style={{ borderRadius: '10px' }}>
                    <input
                        type="text"
                        value={value}
                        readOnly
                        className={`text-${color}-500 text-2xl font-bold border-none bg-transparent`}
                    />
                    <span className={`text-${color}-500 text-2xl font-bold`}>{unit}</span>
                </div>
            </div>
        </li>
    );
};