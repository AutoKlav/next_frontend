/* eslint-disable @next/next/no-img-element */

import React, { useContext } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import { AppMenuItem } from '@/types';

const AppMenu = () => {
    const { layoutConfig } = useContext(LayoutContext);

    const model: AppMenuItem[] = [
        {
            label: '',
            items: [                
                { label: 'Početna', icon: 'pi pi-fw pi-home', to: '/' },
                { label: 'Nadzorna ploca', icon: 'pi pi-fw pi-th-large', to: '/dashboard' },
                { label: 'Graf za inspekciju', icon: 'pi pi-fw pi-star', to: '/chart/0' },              
                { label: 'Graf ulaznih vrijednosti', icon: 'pi pi-fw pi-chart-bar', to: '/values_chart/0' },                  
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
                        {
                            label: 'Bacteria',
                            icon: 'pi pi-fw pi-bolt', // Bacteria icon   
                            to: '/settings/bacteria'
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
