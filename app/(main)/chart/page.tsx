import LineChart from '@/demo/components/Charts/LineChart';
import React from 'react';
import { getStatusAction } from '../actions/statusAction';

const ChartPage = async () => {
    const actionData = await getStatusAction();
    console.log(actionData);
    return (
        <div>
            <h1>Status: {actionData.code} {actionData.errors} {actionData.errorsstring}</h1>
            <LineChart />
        </div>
    );
};

export default ChartPage;
