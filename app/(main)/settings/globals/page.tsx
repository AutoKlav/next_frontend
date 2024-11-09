import React from 'react';
import VariablesTable from '@/demo/components/CellEditingDemo/GlobalTable';
import { getVariablesAction } from '../../api/actions';

const GlobalsPage = async () => {
    const [variables] = await Promise.all([getVariablesAction()]);
    
    return (
        <div className="grid">                        
            <div className='col-12'>
                <VariablesTable data={variables} />
            </div>
        </div>
    );
};

export default GlobalsPage;