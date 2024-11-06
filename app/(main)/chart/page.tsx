import LineChart from '@/demo/components/Charts/LineChart';
import React from 'react';
import { getStatusAction, stateMachineValuesAction } from '../api/actions';

const ChartPage = async () => {
    const actionData = await getStatusAction();    
    const stateMachineValues = await stateMachineValuesAction();
    console.log(stateMachineValues);
    return (
        <div>
            <h1>Status: {actionData?.code} {actionData?.errors} {actionData?.errorsstring}</h1>
            <div>
                <h2>Chart {stateMachineValues.r}</h2>
                <p>Time: {stateMachineValues.time}</p>
                <p>Temperature: {stateMachineValues.temp}</p>
                <p>Temperature (K): {stateMachineValues.tempK}</p>
                <p>Delta Temperature: {stateMachineValues.dTemp}</p>
                <p>Pressure: {stateMachineValues.pressure}</p>
                <p>Dr: {stateMachineValues.Dr}</p>
                <p>Fr: {stateMachineValues.Fr}</p>
                <p>r: {stateMachineValues.r}</p>
                <p>Sum Fr: {stateMachineValues.sumFr}</p>
                <p>Sum r: {stateMachineValues.sumr}</p>
            </div>
            <LineChart />
        </div>
    );
};

export default ChartPage;
