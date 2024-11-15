import React, { createContext, useContext, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { ToastMessage } from 'primereact/toast';

interface ToastContextProps {
    showSuccess: (summary?: string, detail?: string, life?: number) => void;
    showInfo: (summary?: string, detail?: string, life?: number) => void;
    showWarn: (summary?: string, detail?: string, life?: number) => void;
    showError: (summary?: string, detail?: string, life?: number) => void;
    showToast: (
        severity: ToastMessage['severity'],
        summary?: string,
        detail?: string,
        life?: number
    ) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const toast = useRef<Toast>(null);

    const showToast = (
        severity: ToastMessage['severity'] = 'info',
        summary: string = 'Message',
        detail: string = 'Message Detail',
        life: number = 3000
    ) => {
        toast.current?.show({
            severity,
            summary,
            detail,
            life,
        });
    };

    const showSuccess = (summary: string = 'Success Message', detail: string = 'Message Detail', life: number = 3000) => {
        showToast('success', summary, detail, life);
    };

    const showInfo = (summary: string = 'Info Message', detail: string = 'Message Detail', life: number = 3000) => {
        showToast('info', summary, detail, life);
    };

    const showWarn = (summary: string = 'Warning', detail: string = 'Please check the details', life: number = 3000) => {
        showToast('warn', summary, detail, life);
    };

    const showError = (summary: string = 'Error', detail: string = 'Something went wrong', life: number = 3000) => {
        showToast('error', summary, detail, life);
    };

    return (
        <ToastContext.Provider
            value={{
                showSuccess,
                showInfo,
                showWarn,
                showError,
                showToast,
            }}
        >
            {children}
            <Toast ref={toast} />
        </ToastContext.Provider>
    );
};

export const useToast = (): ToastContextProps => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

