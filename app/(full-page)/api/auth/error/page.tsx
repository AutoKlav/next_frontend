/* eslint-disable @next/next/no-img-element */
'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';

const ErrorPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const errorType = searchParams.get('error');
    const [errorMessage, setErrorMessage] = useState('Došlo je do greške.');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Set appropriate error message based on error type
        if (errorType === 'CredentialsSignin') {
            setErrorMessage('Pogrešno korisničko ime ili lozinka. Molimo pokušajte ponovo.');
        } else if (errorType === 'AccessDenied') {
            setErrorMessage('Nemate ovlaštenje za pristup ovoj stranici.');
        }
    }, [errorType]);

    // Prevent rendering until mounted to avoid hydration mismatch
    if (!mounted) {
        return null;
    }

    return (
        <div className="bg-gray-900 flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
            <div className="flex flex-column align-items-center justify-content-center">
                <div
                    style={{
                        borderRadius: '56px',
                        padding: '0.3rem',
                        background: 'linear-gradient(180deg, rgba(91, 39, 193, 0.6) 10%, rgba(0, 0, 0, 0) 30%)',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                >
                    <div className="w-full surface-900 py-8 px-5 sm:px-8 flex flex-column align-items-center border-round-3xl"
                        style={{ borderRadius: '53px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)' }}>
                        <div className="flex justify-content-center align-items-center bg-purple-600 border-circle" style={{ height: '3.2rem', width: '3.2rem' }}>
                            <i className="pi pi-fw pi-exclamation-circle text-2xl text-white"></i>
                        </div>
                        <h1 className="text-100 font-bold text-5xl mb-2 mt-3">
                            {errorType === 'CredentialsSignin' ? 'Pogrešna prijava' : 'Greška'}
                        </h1>
                        <div className="text-400 mb-5 mt-2 text-center" style={{ maxWidth: '400px' }}>{errorMessage}</div>

                        <div className="flex flex-wrap gap-3 justify-content-center mt-3">
                            <Button
                                icon="pi pi-sign-in"
                                label="Pokušajte ponovo"
                                onClick={() => router.push('/')}
                                className="p-button-help"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;