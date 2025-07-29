/* eslint-disable @next/next/no-img-element */
'use client';
import dynamic from 'next/dynamic';
import { StatusHeader } from '@/demo/components/StatusHeader/StatusHeader';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { getStateMachineValuesAction, getUniqueProcessesAction } from './api/actions';
import { checkForErrors } from '@/utils/errorUtil';
import { formatTime, secondsToHms } from '@/utils/dateUtil';
import { useToast } from '@/layout/context/toastcontext';
import { DataPoint, ProcessInfoRow } from '@/types/grpc';
import { refetchStateMachineIntervals } from '@/constants';

const CanvasOverlay = dynamic(
    () => import('@/demo/components/Overlay/CanvasOverlay'),
    { ssr: false }
);

const Home = () => {
    const { showSuccess, showError, showWarn } = useToast();
    const [config, setConfig] = React.useState<ProcessInfoRow>();

    const fetchProcesses = async () => {
        try {
            const response = await getUniqueProcessesAction();
            console.log('Fetched processes:', response.processesList[0]);
            setConfig(response.processesList[0]); // Assuming you want the first process
        } catch (error) {
            showError('Proces', 'Došlo je do greške prilikom učitavanja procesa');
            console.error('Error fetching processes:', error);
        } finally {

        }
    };

    const { data: stateMachineValues } = useQuery(
        {
            queryKey: ['stateMachineValues'],
            queryFn: () => getStateMachineValuesAction(),
            refetchInterval: refetchStateMachineIntervals,
            onError: (error) => {
                console.error('Error getting state machine values:', error);
                showError('Proces', 'Greška prilikom dohvaćanja podataka', 5000);
            },
            onSuccess: (data) => {
                if (checkForErrors(data)) {
                    showError('Proces', 'Greška prilikom pokretanja procesa', 500);
                    return;
                }
            },
        },
    );

    const state = stateMachineValues?.state || 0;
    //const elapsedTime = Math.floor(secondsToHms(stateMachineValues?.elapsedtime) / 1000); // Convert to seconds
    const elapsedTimeDisplay = secondsToHms(stateMachineValues?.elapsedtime);
    const heatingEnd = formatTime(stateMachineValues?.heatingend) || '';
    const coolingEnd = formatTime(stateMachineValues?.coolingend) || '';

    useEffect(() => {
        fetchProcesses();
    }, []);

    // Example: define static or computed points
    const points: DataPoint[] = [
        { id: 1, x: 100, y: 80 },
        { id: 2, x: 200, y: 150 },
        // add more as needed
    ];

    return (
        <>
            <StatusHeader
                name={config?.productname || '-//-'}
                quantity={config?.productquantity || ''}
                severity={state}
                elapsedTime={state === 0 ? secondsToHms(Number(config?.processlength)) : elapsedTimeDisplay}
                heatingEnd={heatingEnd}
                coolingEnd={coolingEnd}
            />
            {stateMachineValues && <CanvasOverlay points={points} dataValues={stateMachineValues} />}
        </>
    );
};

export default Home;


