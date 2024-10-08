'use client'
import { ThemeProvider } from '@/components/theme-provider';
import React, { ReactNode } from 'react';
import {
    QueryClient,
    QueryClientProvider,
  } from 'react-query'
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ContextProps {
    children: ReactNode | ReactNode[] | undefined
};

function Context({children}:ContextProps) {
    const queryClient = new QueryClient()

    return (
    <QueryClientProvider client={queryClient}>           
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            {children}
        </ThemeProvider>
    </QueryClientProvider>
    );
};

export default Context;