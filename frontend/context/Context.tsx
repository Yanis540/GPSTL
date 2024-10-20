'use client'
import { ThemeProvider } from '@/components/theme-provider';
import React, { ReactNode } from 'react';
import {
    QueryClient,
    QueryClientProvider,
  } from 'react-query'
  import {
    TooltipProvider,
  } from "@/components/ui/tooltip"
  import { Toaster } from "@/components/ui/toaster"
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
            <TooltipProvider>
                {children}
            </TooltipProvider>
        </ThemeProvider>
        <Toaster /> 
    </QueryClientProvider>
    );
};

export default Context;