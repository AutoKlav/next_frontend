"use client";

import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { useState } from "react";
import React from 'react';

const EmptyPage = () => {
    const [inputNumberValue, setInputNumberValue] = useState<number | null>(
        null
    );
    return (
        <div className="grid">
            <div className="col-6">
                <div className="card">
                    <div className="field p-fluid">
                        <label htmlFor="username2">Username</label>
                        <InputText id="username2" type="text" className="p-invalid" aria-describedby="username-help" />
                        <small id="username-help" className="p-error">
                            Enter your username to reset your password.
                        </small>
                    </div>
                </div>
            </div>
            <div className="col-6">
                <div className="card">
                    <div className="field p-fluid">
                        <label htmlFor="username3">Username</label>                        
                        <InputNumber
                            value={inputNumberValue}
                            onValueChange={(e) =>
                                setInputNumberValue(e.value ?? null)
                            }
                            showButtons
                            mode="decimal"
                        ></InputNumber>
                        <small id="username-help" className="p-error">
                            Enter your username to reset your password.
                        </small>
                    </div>
                </div>  
            </div>          
        </div>
    );
};

export default EmptyPage;
