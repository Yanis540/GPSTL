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
import { UserRole } from "@/types";
import { useState } from "react";

export const userSchema = z.object({
    first_name : z.string().min(1), 
    last_name : z.string().min(1), 
    birthDate: z.date().default(new Date()), //
    email : z.string().email(), 
    password : z.string().min(1), 
    confirmPassword : z.string().min(1), 
    role : z.enum([UserRole.STUDENT,UserRole.RECRUITER]).default(UserRole.STUDENT)   
})
//! to complete 
export const studentSchema = userSchema.extend({
    // userType: z.literal('student'), // Spécifie que c'est un étudiant
    // schoolName: z.string().optional(),
    // gradeId: z.number().optional(),
    // fieldId: z.number().optional(),
});
export const recruiterSchema = userSchema.extend({
    // userType: z.literal('recruiter'), // Spécifie que c'est un recruteur
    // company: z.object({
    //   id: z.number(),
    //   name: z.string().optional(),
    // }), // La compagnie est optionnelle
});
export type StudentSchema = z.infer<typeof studentSchema >
export type RecruiterSchema = z.infer<typeof recruiterSchema >
export const signUpSchema = z.union([studentSchema,recruiterSchema]).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // path of error
}); 
export type SignUpSchema = z.infer<typeof signUpSchema>
interface DataResponse {
    error?: {message: string}, 
    user? : User, 
    tokens ? :AuthCredentials
}
interface useSignUpMutation  {
    data ?: DataResponse
    isLoading : boolean 
    error : unknown 
    mutateAsync : UseMutateAsyncFunction<DataResponse, unknown,SignUpSchema, unknown>
}

export const useSignUp = ()=>{
    const {
        register,
        handleSubmit,
        control, 
        // watch,
        formState: { errors },
    } = useForm<SignUpSchema>({
        resolver : zodResolver(signUpSchema)
    }); 
    const [role,setRole] = useState<UserRole.RECRUITER| UserRole.STUDENT>(UserRole.STUDENT);
    const {set_user} = useAuth(); 
    console.log(errors);
    const router = useRouter(); 
    const {data,isLoading,error,mutateAsync:signup}:useSignUpMutation = useMutation({
        mutationKey:["signup"],
        mutationFn:async({email,password}:SignUpSchema)=>{
            const response= await axios.post(SERVER_URL+"/auth/sign-up",{email,password}); 
            const data = await response.data ; 
            return data ; 
        }, 
        onSuccess:(data:DataResponse)=>{
            const {user,tokens} = data ; 
            if(!user || !tokens) 
                return ; 
            set_user({...user,tokens})
            
        }, 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (err:any)=>{
                toast(`Unknown error occured`,{className:"text-red-500 bg-red-300"})
        }
    }); 

    const onSubmit = async(data:SignUpSchema)=>{
        try{
            // await signup(data);
            console.log("Data : ", data); 
        }
        catch(err){
        }
        
    }

    return {
        register,
        signUp : {
            credentials : handleSubmit(onSubmit), 
        },
        role: {
            value: role, 
            set:setRole
        }, 
        errors, 
        control
    }
}
