import React from 'react';
import { getBacteriaAction } from '../../api/actions';
import BacteriaTable from '@/demo/components/Tables/BacteriaTable';

const BacteriaPage = async () => {
    const bacteria = await Promise.all([getBacteriaAction()]);
    return (
        <div className="grid">                        
            <div className='col-12'>
                <BacteriaTable bacteria={bacteria?.[0]?.bacteriaList}/>
            </div>
        </div>
    );
};

export default BacteriaPage;