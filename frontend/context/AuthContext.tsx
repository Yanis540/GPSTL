'use client'
import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import { useAuth } from './store/use-auth';
import { usePathname, useRouter } from 'next/navigation';
import { UserRole } from '@/types';

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
    if(includesAuthUrl) return <LoginWrapper>{children}</LoginWrapper>
    return (
        <AuthWrapper>
           {children}
        </AuthWrapper>
    );
};

function LoginWrapper({children}:AuthContextProps){
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

function AuthWrapper({children}:AuthContextProps){
    const {user} = useAuth(); 
    const router = useRouter();
    const pathname = usePathname();
    const protected_routes = ["profil","recruiter","student","candidacy"]
    useEffect(()=>{
        if(pathname=="/")
            return 
        if(!user && protected_routes.some(r=>pathname.includes(r))){
            router.push("/auth/sign-in")
        }
        if(user && user.role != UserRole.RECRUITER && pathname.startsWith("/recruiter")){
            router.push("/")
        }
        if(user && user.role != UserRole.STUDENT && pathname.startsWith("/student")){
            router.push("/")
        }
    },[user?.id, pathname])
    if(!user)
        return null; 
    if(user?.role != UserRole.RECRUITER && pathname.startsWith("/recruiter"))
        return null; 
    if(user?.role != UserRole.STUDENT && pathname.startsWith("/student"))
        return null; 
    return (<>{children}</>)
}


export default AuthContext;