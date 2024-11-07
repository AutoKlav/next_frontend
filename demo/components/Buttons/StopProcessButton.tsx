'use client';

import { stopProcessAction } from '@/app/(main)/api/actions';
import { Button } from 'primereact/button';

const StopProcessButton = () => {
    const handleStopProcess = async () => {
        await stopProcessAction();
    };

    return (
        <Button onClick={handleStopProcess}> Handle stop process</Button>
    );
};

export default StopProcessButton;