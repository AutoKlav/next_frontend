import { Tag } from 'primereact/tag';
import React from 'react';

const DashboardPage = () => {
    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                <h5>Icons</h5>
                    <div className="flex flex-wrap gap-2">
                        <Tag icon="pi pi-user" value="Primary"></Tag>
                        <Tag icon="pi pi-check" severity="success" value="Success"></Tag>
                        <Tag icon="pi pi-info-circle" severity="info" value="Info"></Tag>
                        <Tag icon="pi pi-exclamation-triangle" severity="warning" value="Warning"></Tag>
                        <Tag icon="pi pi-times" severity="danger" value="Danger"></Tag>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
