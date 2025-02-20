import Link from 'next/link';
import { classNames } from 'primereact/utils';
import React, { forwardRef, useContext, useImperativeHandle, useRef, useState } from 'react';
import { AppTopbarRef } from '@/types';
import { LayoutContext } from './context/layoutcontext';
import { Badge } from 'primereact/badge';
import styled, { keyframes, css } from 'styled-components';

// Keyframes for subtle bell animation
const gentleBellShake = keyframes`
    0% { transform: rotate(0); }
    25% { transform: rotate(-20deg); }
    50% { transform: rotate(20deg); }
    75% { transform: rotate(-20deg); }
    100% { transform: rotate(0); }
`;

// Styled component for the bell icon with conditional animation
const AnimatedBell = styled.i<{ $isactive: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #e05858; // Light red color
    font-size: 2rem; // Increased size
    transform-origin: center;
    ${({ $isactive }) =>
        $isactive &&
        css`
            animation: ${gentleBellShake} 1s infinite; // Subtle shaking animation
        `}
`;

// Keyframes for a gentle badge pulse animation
const pulse = keyframes`
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.1); // Slight pulse effect
    }
    100% {
        transform: scale(1);
    }
`;

// Styled component for the badge with subtle animation
const AnimatedBadge = styled(Badge)`
    animation: ${pulse} 1.5s infinite; // Slower, subtle pulse
    background-color: rgba(255, 102, 102, 1) !important; // Light red
    color: white !important; // White text for visibility
`;

const AppTopbar = forwardRef<AppTopbarRef>((props, ref) => {
    const { layoutState, onMenuToggle, showProfileSidebar } = useContext(LayoutContext);
    const menubuttonRef = useRef(null);
    const topbarmenuRef = useRef(null);
    const topbarmenubuttonRef = useRef(null);

    const [isBellActive, setBellActive] = useState(false); // State to control animation

    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
        topbarmenu: topbarmenuRef.current,
        topbarmenubutton: topbarmenubuttonRef.current
    }));

    return (
        <div className="layout-topbar">
            <Link href="/" className="layout-topbar-logo">
                <img className="ml-5 rounded-full" src={`/layout/images/logo.png`} width="200px" height={'45px'} style={{ borderRadius: '15px' }} />
            </Link>

            <button ref={topbarmenubuttonRef} type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={showProfileSidebar}>
                <i className="pi pi-ellipsis-v" />
            </button>

            <div ref={topbarmenuRef} className={classNames('layout-topbar-menu', { 'layout-topbar-menu-mobile-active': layoutState.profileSidebarVisible })}>
                {/* Bell Button */}
                <button
                    type="button"
                    className="p-link layout-topbar-button"
                    onClick={() => setBellActive(!isBellActive)} // Toggle animation state
                >
                    {/* Centered Bell Icon */}
                    <AnimatedBell className="pi pi-bell" $isactive={isBellActive} />
                    {/* Animated Badge */}
                    <AnimatedBadge value={1} severity="danger" className="ml-2" />
                </button>
                <Link href="/api/auth/signout">
                    <button type="button" className="p-link layout-topbar-button">
                        <i className="pi pi-sign-out"></i>
                        <span>Sign Out</span>
                    </button>
                </Link>
            </div>
        </div>
    );
});

AppTopbar.displayName = 'AppTopbar';

export default AppTopbar;