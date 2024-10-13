import { cn } from '@/lib/utils';
import React from 'react';
import { ThemeToggle } from './theme-provider';
import Image from 'next/image';
import Link from 'next/link';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface NavbarProps {

};

function Navbar({}:NavbarProps) {
    return (
    <div className=" sticky z-50 top-0  inset-x-0 h-16 ">
        <header className={cn('relative flex flex-row items-center h-full px-2 sm:px-16 md:px-8  transition-all duration-500 border-b-[1px] dark:border-primary py-2 mx-auto max-w-[1500px]',)}>
            <Link href="/" className="relative h-16 w-16">
                <Image src="/assets/logo.png" fill className="w-full h-full" alt="logo" /> 
            </Link>
            <div className="flex-1 flex flex-row items-center justify-end">
                <ThemeToggle /> 
            </div>
        </header>
      </div>
    );
};

export default Navbar;