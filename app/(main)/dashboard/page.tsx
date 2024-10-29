import { Tag } from 'primereact/tag';
import React from 'react';

const DashboardPage = () => {
    return (
        <div className="grid">
            <div className="col-4">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <Tag className="mb-3" icon="pi pi-check" severity="success" value="Proces je završio"></Tag>
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
            <div className="col-4">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-">
                        <div>
                            <Tag className="mb-3" icon="pi pi-info-circle" severity="info" value="Spremno za početak"></Tag>
                            <div className="text-900 font-medium text-xl">Grah 500g</div>
                        </div>                        
                    </div>                    
                    <span className="text-500">Ime konzerve</span>
                </div>
            </div>
            <div className="col-4">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>                            
                            <Tag className="mb-3" icon="pi pi-exclamation-triangle" severity="warning" value="Proces je u izvođenju"></Tag>
                            <div className="text-900 font-medium text-xl">Grah 500g</div>
                        </div>                        
                    </div>                    
                    <span className="text-500">Ime konzerve</span>
                </div>
            </div>
            <div className="col-4">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>                            
                            <Tag className="mb-3" icon="pi pi-times" severity="danger" value="Greška u izvođenju"></Tag>
                            <div className="text-900 font-medium text-xl">Grah 500g</div>
                        </div>                        
                    </div>                    
                    <span className="text-500">Ime konzerve</span>
                </div>
            </div>            
            </div>       
    );
};

export default DashboardPage;
