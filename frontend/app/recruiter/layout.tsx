import React, { ReactNode } from 'react';
import { Sidebar } from './components/sidebar';

interface LayoutProps {
    children : ReactNode|ReactNode[]
};

function Layout({children}:LayoutProps) {
    return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <Sidebar />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
            {children}
        </div>
    </div>
    );
};

export default Layout;