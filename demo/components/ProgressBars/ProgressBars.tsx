import React from 'react';

const ProgressBars = () => {
    return (
        <div className='grid'>
        <div className="col-6">        
            <div className="card">
            <div className="flex justify-content-between align-items-center mb-5">
                <h5>Stanja releja</h5>
            </div>
            <ul className="list-none p-0 m-0">
                <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                    <div>
                        <span className="text-900 font-medium mr-2 mb-1 md:mb-0">Zagrijavanje</span>                        
                    </div>
                    <div className="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                        <div className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style={{ height: '8px' }}>
                            <div className="bg-red-500 h-full" style={{ width: '0%' }} />
                        </div>
                        <span className="ml-3 font-medium">Isklj.</span>
                    </div>
                </li>
                <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                    <div>
                        <span className="text-900 font-medium mr-2 mb-1 md:mb-0">Pumpa</span>                        
                    </div>
                    <div className="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                        <div className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style={{ height: '8px' }}>
                            <div className="bg-cyan-500 h-full" style={{ width: '0%' }} />
                        </div>
                        <span className="ml-3 font-medium">Isklj.</span>
                    </div>
                </li>
                <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                    <div>
                        <span className="text-900 font-medium mr-2 mb-1 md:mb-0">Punjenje vodom</span>
                        
                    </div>
                    <div className="mt-2 md:mt-0 flex align-items-center">
                        <div className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style={{ height: '8px' }}>
                            <div className="bg-teal-500 h-full" style={{ width: '100%' }} />
                        </div>
                        <span className="ml-3 font-medium">Uklj.</span>
                    </div>
                </li>
                <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                    <div>
                        <span className="text-900 font-medium mr-2 mb-1 md:mb-0">Hlađenje</span>                        
                    </div>
                    <div className="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                        <div className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style={{ height: '8px' }}>
                            <div className="bg-cyan-500 h-full" style={{ width: '0%' }} />
                        </div>
                        <span className="ml-3 font-medium">Isklj.</span>
                    </div>
                </li>                
                <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                    <div>
                        <span className="text-900 font-medium mr-2 mb-1 md:mb-0">Bypass</span>                        
                    </div>
                    <div className="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                        <div className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style={{ height: '8px' }}>
                            <div className="bg-teal-500 h-full" style={{ width: '100%' }} />
                        </div>
                        <span className="ml-3 font-medium">Uklj.</span>
                    </div>
                </li>                
                <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                    <div>
                        <span className="text-900 font-medium mr-2 mb-1 md:mb-0">Unutarnji pritisak</span>                        
                    </div>
                    <div className="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                        <div className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style={{ height: '8px' }}>
                            <div className="bg-teal-500 h-full" style={{ width: '100%' }} />
                        </div>
                        <span className="ml-3 font-medium">Uklj.</span>
                    </div>
                </li>                
            </ul>
            </div>
        </div>
        <div className="col-12 xl:col-6">        
            <div className="card">
            <div className="flex justify-content-between align-items-center mb-5">
                <h5>Vrijednosti senzora</h5>
                <h6 className="text-600 mt-1">Stanje: [STATE]</h6>
            </div>
            <ul className="list-none p-0 m-0">
                <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                    <div>
                        <span className="text-900 font-medium mr-2 mb-1 md:mb-0">Temperatura Autoklava</span>
                        
                    </div>
                    <div className="mt-2 md:mt-0 flex align-items-center">
                        <div className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style={{ height: '8px' }}>
                            <div className="bg-teal-500 h-full" style={{ width: '50%' }} />
                        </div>
                        <span className="ml-3 font-medium">50</span>
                    </div>
                </li>
                <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                    <div>
                        <span className="text-900 font-medium mr-2 mb-1 md:mb-0">Temperatura konzerve</span>                        
                    </div>
                    <div className="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                        <div className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style={{ height: '8px' }}>
                            <div className="bg-teal-500 h-full" style={{ width: '46%' }} />
                        </div>
                        <span className="ml-3 font-medium">16</span>
                    </div>
                </li>
                <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                    <div>
                        <span className="text-900 font-medium mr-2 mb-1 md:mb-0">Pritisak</span>                        
                    </div>
                    <div className="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                        <div className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style={{ height: '8px' }}>
                            <div className="bg-teal-500 h-full" style={{ width: '67%' }} />
                        </div>
                        <span className="ml-3 font-medium">67</span>
                    </div>
                </li>
                <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                    <div>
                        <span className="text-900 font-medium mr-2 mb-1 md:mb-0">Dr</span>                        
                    </div>
                    <div className="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                        <div className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style={{ height: '8px' }}>
                            <div className="bg-teal-500 h-full" style={{ width: '35%' }} />
                        </div>
                        <span className="ml-3 font-medium">35</span>
                    </div>
                </li>
                <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                    <div>
                        <span className="text-900 font-medium mr-2 mb-1 md:mb-0">Fr</span>
                    </div>
                    <div className="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                        <div className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style={{ height: '8px' }}>
                            <div className="bg-teal-500 h-full" style={{ width: '75%' }} />
                        </div>
                        <span className="ml-3 font-medium">75</span>
                    </div>
                </li>
                <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                    <div>
                        <span className="text-900 font-medium mr-2 mb-1 md:mb-0">r</span>                        
                    </div>
                    <div className="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                        <div className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style={{ height: '8px' }}>
                            <div className="bg-teal-500 h-full" style={{ width: '40%' }} />
                        </div>
                        <span className="ml-3 font-medium">40</span>
                    </div>
                </li>
                <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                    <div>
                        <span className="text-900 font-medium mr-2 mb-1 md:mb-0">sumFr</span>                        
                    </div>
                    <div className="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                        <div className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style={{ height: '8px' }}>
                            <div className="bg-teal-500 h-full" style={{ width: '40%' }} />
                        </div>
                        <span className="ml-3 font-medium">40</span>
                    </div>
                </li>
                <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                    <div>
                        <span className="text-900 font-medium mr-2 mb-1 md:mb-0">sumr</span>
                    </div>
                    <div className="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                        <div className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style={{ height: '8px' }}>
                            <div className="bg-teal-500 h-full" style={{ width: '40%' }} />
                        </div>
                        <span className="ml-3 font-medium">40</span>
                    </div>
                </li>
            </ul>
            </div>
        </div>
        </div>        
    );
};

export default ProgressBars;