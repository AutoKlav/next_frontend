'use client';
import { LayoutProvider } from '../layout/context/layoutcontext';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';

import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";

import '../styles/layout/layout.scss';
import '../styles/demo/Demos.scss';
import AuthProvider from './(full-page)/api/context/AuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastProvider } from '@/layout/context/toastcontext';

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    const queryClient = new QueryClient();

    return (
        <html lang="hr" suppressHydrationWarning>
            <head>
                <meta name="apple-mobile-web-app-title" content="Autoklav" />
                <link id="theme-css" href={`/themes/lara-dark-purple/theme.css`} rel="stylesheet"></link>
            </head>
            <body>
                <PrimeReactProvider>
                    <LayoutProvider>
                        <AuthProvider>
                            <QueryClientProvider client={queryClient}>
                                <ToastProvider>
                                    {children}
                                </ToastProvider>
                            </QueryClientProvider>
                        </AuthProvider>
                    </LayoutProvider>
                </PrimeReactProvider>
            </body>
        </html>
    );
}
