/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'


import { toast } from "sonner";
import {useForm} from 'react-hook-form'
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import {z} from "zod"
import { UseMutateAsyncFunction, useMutation } from "react-query";
import axios, { AxiosError } from "axios"; 
import { useAuth } from "@/context/store/use-auth";
import { SERVER_URL } from "@/env";
import { useEffect } from "react";

export const signInSchema = z.object({
    email : z.string().email(), 
    password : z.string().min(1), 
})
export type SignInSchema = z.infer<typeof signInSchema>
interface DataResponse extends User{
    access_token ? :string
    refresh_token ? :string
}
interface useLoginMutation  {
    data ?: DataResponse
    isLoading : boolean 
    error : unknown 
    mutateAsync : UseMutateAsyncFunction<DataResponse, unknown,SignInSchema, unknown>
}

export const useSignIn = ()=>{
    const {
        register,
        handleSubmit,
        // watch,
        formState: { errors },
    } = useForm<SignInSchema>({
        resolver : zodResolver(signInSchema)
    }); 
    const {set_user,user} = useAuth();
    const router = useRouter(); 
    const {data,isLoading,error,mutateAsync:login}:useLoginMutation = useMutation({
        mutationKey:["auth","authenticate"],
        mutationFn:async({email,password}:SignInSchema)=>{
            const response= await axios.post(SERVER_URL+"/auth/authenticate",{email,password}); 
            const data = await response.data ; 
            return data ; 
        }, 
        onSuccess:(data:DataResponse)=>{
            const {access_token,refresh_token,...user} = data ; 
            if(!user || !access_token || !refresh_token) 
                return ; 
            set_user({...user,
                tokens:{
                    access:{token:access_token!},
                    refresh:{token:refresh_token!}
                }
            })
            
        }, 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (err:any)=>{
                toast(`Unknown error occured`,{className:"text-red-500 bg-red-300"})
        }
    }); 
    const onSubmit = async(data:SignInSchema)=>{
        try{
            await login(data);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            // set_user(({...data,name:"Yanis",id:1233}) as any ); 
        }
        catch(err){

        }
        
    }

    return {
        register,
        signIn : {
            credentials : handleSubmit(onSubmit), 
        },
        isLoading,
        errors
    }
}
