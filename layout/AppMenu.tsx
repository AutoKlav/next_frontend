/* eslint-disable @next/next/no-img-element */

import React, { useContext } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import Link from 'next/link';
import { AppMenuItem } from '@/types';

const AppMenu = () => {
    const { layoutConfig } = useContext(LayoutContext);

    const model: AppMenuItem[] = [
        {
            label: '',
            items: [                
                { label: 'Početna', icon: 'pi pi-fw pi-home', to: '/' },
                { label: 'Nadzorna ploca', icon: 'pi pi-fw pi-th-large', to: '/dashboard' },
                { label: 'Graf', icon: 'pi pi-fw pi-chart-bar', to: '/chart' },                
                { label: 'Povijest', icon: 'pi pi-fw pi-calendar', to: '/history' },                
                {
                    label: 'Postavke',
                    icon: 'pi pi-fw pi-cog',
                    items: [
                        {
                            label: 'Kalibracija senzora',
                            icon: 'pi pi-fw pi-wrench', // Changed icon
                            to: '/settings/calibration'
                        },
                        {
                            label: 'Globalne varijable',
                            icon: 'pi pi-fw pi-sliders-h', // Changed icon
                            to: '/settings/globals'
                        },
                    ]
                }
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
