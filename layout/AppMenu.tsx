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
        {
            label: 'UI Components',
            items: [
                { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', to: '/uikit/formlayout' },
                { label: 'Input', icon: 'pi pi-fw pi-check-square', to: '/uikit/input' },
                { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', to: '/uikit/floatlabel' },
                { label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', to: '/uikit/invalidstate' },
                { label: 'Button', icon: 'pi pi-fw pi-mobile', to: '/uikit/button', class: 'rotated-icon' },
                { label: 'Table', icon: 'pi pi-fw pi-table', to: '/uikit/table' },
                { label: 'Panel', icon: 'pi pi-fw pi-tablet', to: '/uikit/panel' },
                { label: 'Overlay', icon: 'pi pi-fw pi-clone', to: '/uikit/overlay' },
                { label: 'Menu', icon: 'pi pi-fw pi-bars', to: '/uikit/menu', preventExact: true },
                { label: 'Message', icon: 'pi pi-fw pi-comment', to: '/uikit/message' },                
            ]
        },
        {
            label: 'Prime Blocks',
            items: [
                { label: 'Free Blocks', icon: 'pi pi-fw pi-eye', to: '/blocks', badge: 'NEW' },
            ]
        },       
        {
            label: 'Pages',
            icon: 'pi pi-fw pi-briefcase',
            to: '/pages',
            items: [                             
                {
                    label: 'Crud',
                    icon: 'pi pi-fw pi-pencil',
                    to: '/pages/crud'
                },                
            ]
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
