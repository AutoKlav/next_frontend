import LineChart from '@/demo/components/Charts/LineChart';
import React from 'react';
import { getStatusAction, getStateMachineValuesAction, getVariablesAction } from '../api/actions';

const ChartPage = async () => {
    const variables = await getVariablesAction();
    const [statusData, stateMachineValues] = await Promise.all([getStatusAction(), getStateMachineValuesAction()]);    
    
    return (
        <div className='grid'>
            <div className='col-4'>
                <h3>Status</h3>
                <div>
                    {statusData?.code} {statusData?.errors} {statusData?.errorsstring}
                </div>
                <h3>Variables</h3>
                <div>
                    <p>Target K: {variables.targetk}</p>
                    <p>Serial Data Time: {variables.serialdatatime}</p>
                    <p>State Machine Tick: {variables.statemachinetick}</p>
                    <p>Sterilization Temp: {variables.sterilizationtemp}</p>
                    <p>Pasterization Temp: {variables.pasterizationtemp}</p>                    
                </div>
                {/* <StopProcessButton /> */}
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
