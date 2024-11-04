import LineChart from '@/demo/components/Charts/LineChart';
import React from 'react';

export async function getServerSideProps() {
    const res = await fetch('http://localhost:3000/api/getStatus');
    const status = await res.json();
    console.log("Hey", status);
    return {
        props: {
            status,
        },
    };
}

const ChartPage = () => {

    return (
        <div>
            <h1>Status:</h1>
            <LineChart />
        </div>
    );
};

export default ChartPage;
