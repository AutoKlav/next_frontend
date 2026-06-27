'use client';

import React from 'react';
import { InputSwitch } from 'primereact/inputswitch';
import { useShowTimeGraphExtraSeries } from '@/utils/graphSettingsUtil';

const GraphSettingsPage = () => {
    const [showExtraSeries, setShowExtraSeries] = useShowTimeGraphExtraSeries();

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>Prikaz grafa</h5>
                    <div className="flex align-items-center gap-3">
                        <InputSwitch checked={showExtraSeries} onChange={(e) => setShowExtraSeries(e.value as boolean)} />
                        <label>Prikaži dodatne vrijednosti (Temperatura sredine, Fr, ΣF₅) na grafovima procesa na vrijeme</label>
                    </div>
                    <p className="mt-3 text-color-secondary">Kada je isključeno, grafovi procesa pokrenutih na vrijeme prikazuju samo temperaturu autoklava i tlak. Procesi na ciljni F uvijek prikazuju sve vrijednosti.</p>
                </div>
            </div>
        </div>
    );
};

export default GraphSettingsPage;
