/* eslint-disable @next/next/no-img-element */
'use client';
import { StatusHeader } from '@/demo/components/StatusHeader/StatusHeader';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { getStateMachineValuesAction, getUniqueProcessesAction } from './api/actions';
import { checkForErrors } from '@/utils/errorUtil';
import { formatTime, secondsToHms } from '@/utils/dateUtil';
import { useToast } from '@/layout/context/toastcontext';
import { ProcessInfoRow } from '@/types/grpc';
import { refetchStateMachineIntervals } from '@/constants';

const Home = () => {
    const { showSuccess, showError, showWarn } = useToast();
    const [config, setConfig] = React.useState<ProcessInfoRow>();

    const fetchProcesses = async () => {
        try {
            const response = await getUniqueProcessesAction();
            console.log('Fetched processes:', response.processesList[0]);
            setConfig(response.processesList[0]);
        } catch (error) {
            showError('Proces', 'Došlo je do greške prilikom učitavanja procesa');
            console.error('Error fetching processes:', error);
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
    const elapsedTimeDisplay = secondsToHms(stateMachineValues?.elapsedtime);
    const heatingEnd = formatTime(stateMachineValues?.heatingend) || '';
    const coolingEnd = formatTime(stateMachineValues?.coolingend) || '';

    useEffect(() => {
        fetchProcesses();
    }, []);

    return (
        <>
            <StatusHeader
                name={config?.productname || '-//-'}
                quantity={config?.productquantity || ''}
                severity={state}
                elapsedTime={state === 0 ? secondsToHms(Number(config?.processlength)) : elapsedTimeDisplay}
                heatingEnd={heatingEnd}
                coolingEnd={coolingEnd}
                stateMachineValues={stateMachineValues}
            />
        </>
    );
};

export default Home;