"use client";

import CellEditingDemo from '@/demo/components/CellEditingDemo/EditingCell';
import ConfigTable from '@/demo/components/CellEditingDemo/GlobalTable';
import React from 'react';

const SettingsPage = () => {
    return (
        <div className="grid">            
            <div className='col-12'>
                <CellEditingDemo />
            </div>
            <div className='col-12'>
                <ConfigTable />
            </div>
        </div>
    );
};

export default SettingsPage;
