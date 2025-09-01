/* eslint-disable @next/next/no-img-element */

import React, { useContext } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import { AppMenuItem } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { getStateMachineValuesAction } from '@/app/(main)/api/actions';

const AppMenu = () => {
    const { layoutConfig } = useContext(LayoutContext);

    const { data: stateMachineValues } = useQuery(
        {
            queryKey: ['stateMachineValues'],
            queryFn: () => getStateMachineValuesAction(),
            refetchInterval: 5000,
            onError: (error) => {
                console.error('Error getting state machine values:', error);
            },
            onSuccess: (data) => {

            },
        },
    );

    const state = stateMachineValues?.state;

    const model: AppMenuItem[] = [
        {
            label: '',
            items: [
                { label: 'Početna', icon: 'pi pi-fw pi-home', to: '/' },
                { label: 'Nadzorna ploca', icon: 'pi pi-fw pi-th-large', to: '/dashboard' },
                { label: 'Graf za inspekciju', icon: 'pi pi-fw pi-star', to: '/chart/0' },
                { label: 'Graf ulaznih vrijednosti', icon: 'pi pi-fw pi-chart-bar', to: '/values_chart/0' },
                { label: 'Povijest', icon: 'pi pi-fw pi-calendar', to: '/history' },
                // Conditionally render Postavke menu item based on state
                ...(state === 0 ? [
                    {
                        label: 'Postavke',
                        icon: 'pi pi-fw pi-cog',
                        items: [
                            {
                                label: 'Kalibracija senzora',
                                icon: 'pi pi-fw pi-wrench',
                                to: '/settings/calibration'
                            },
                            {
                                label: 'Globalne varijable',
                                icon: 'pi pi-fw pi-sliders-h',
                                to: '/settings/globals'
                            },
                            {
                                label: 'Bakterije',
                                icon: 'pi pi-fw pi-bolt',
                                to: '/settings/bacteria'
                            },
                        ]
                    }
                ] : [])
            ],
        },
    ];

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;