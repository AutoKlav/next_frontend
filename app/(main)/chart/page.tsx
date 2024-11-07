import LineChart from '@/demo/components/Charts/LineChart';
import React from 'react';
import { getStatusAction, stateMachineValuesAction } from '../api/actions';

const ChartPage = async () => {
    const actionData = await getStatusAction();    
    const stateMachineValues = await stateMachineValuesAction();
    console.log(stateMachineValues);
    return (
        <div className='grid'>
            <div className='col-4'>
                <h3>Status</h3>
                <div>
                    {actionData?.code} {actionData?.errors} {actionData?.errorsstring}
                </div>
            </div>
            <div className='col-4'>
            <h3>State Machine Values</h3>
            <div>
                <p>Time: {stateMachineValues.time}</p>
                <p>Temperature: {stateMachineValues.temp}</p>
                <p>Temperature (K): {stateMachineValues.tempk}</p>
                <p>Delta Temperature: {stateMachineValues.dtemp}</p>
                <p>Pressure: {stateMachineValues.pressure}</p>
                <p>Dr: {stateMachineValues.dr}</p>
                <p>Fr: {stateMachineValues.fr}</p>
                <p>r: {stateMachineValues.r}</p>
                <p>Sum Fr: {stateMachineValues.sumfr}</p>
                <p>Sum r: {stateMachineValues.sumr}</p>
            </div>
            </div>
            <div className='col-12'>
            <LineChart />
            </div>
        </div>
    );
};

export default ChartPage;
