'use client'
import React, { ReactNode, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useAuth } from './store/use-auth';
import { usePathname, useRouter } from 'next/navigation';

interface AuthContextProps {
    children : ReactNode | ReactNode[]
};

function AuthContext({children}:AuthContextProps) {
   
    const [isClient,setIsClient] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const {user} = useAuth(); 
    const includesAuthUrl = useMemo(()=>pathname.includes("auth"),[pathname])
    
    useEffect(()=>{
        setIsClient(true); 
    },[]) 
    useEffect(()=>{
        if(!isClient)
            return 
        if(includesAuthUrl && user){
            router.push('/')
        }
        if(! includesAuthUrl && pathname!="/" ){
            if(!user)
                router.push("/auth/sign-in")
        }
       
    },[isClient, user, includesAuthUrl, pathname])
   
    if(!isClient)
        return; 
    if(includesAuthUrl) return <AuthWrapper>{children}</AuthWrapper>
    return (
        <>
           {children}
        </>
    );
};

function AuthWrapper({children}:AuthContextProps){
    const {user} = useAuth(); 
    const router = useRouter();
    useEffect(()=>{
        if(user)
            router.push("/")
    },[user?.id])
    if(user)
        return null; 
    return (<>{children}</>)
}


export default AuthContext;