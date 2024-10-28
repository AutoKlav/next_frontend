"use client";

import CellEditingDemo from '@/demo/components/CellEditingDemo/EditingCell';
import { useState } from "react";
import React from 'react';

const SettingsPage = () => {
    return (
        <div className="grid">            
            <div className='col-12'>
                <CellEditingDemo />
            </div>
        </div>
    );
};

export default SettingsPage;
