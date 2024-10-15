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
    firstName : z.string().min(1), 
    lastName : z.string().min(1), 
    birthDate: z.date().default(new Date()), //
    email : z.string().email(), 
    password : z.string().min(1), 
    confirmPassword : z.string().min(1), 
    role : z.enum([UserRole.STUDENT,UserRole.RECRUITER]).default(UserRole.STUDENT), 
 
})
//! to complete 
export const studentSchema = userSchema.extend({
    userType: z.literal(UserRole.STUDENT).catch(UserRole.STUDENT), // Spécifie que c'est un étudiant
    // schoolName: z.string().optional(),
    // gradeId: z.number().optional(),
    // fieldId: z.number().optional(),
    schoolName: z.string().catch("SU"),   
    skillIds : z.array(z.number().int()).catch([9, 10]),
    gradeId : z.number().catch(5),
    fieldId : z.number().catch(36), 
});
export const recruiterSchema = userSchema.extend({
    userType: z.literal(UserRole.RECRUITER).catch(UserRole.RECRUITER), // Spécifie que c'est un recruteur
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
interface DataResponse extends User{
    access_token ? :string
    refresh_token ? :string
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
    const router = useRouter(); 
    const {data,isLoading,error,mutateAsync:signup}:useSignUpMutation = useMutation({
        mutationKey:["auth","register"],
        mutationFn:async(props:SignUpSchema)=>{
            const response= await axios.post(SERVER_URL+"/auth/register",{...props,firstname:props.firstName!,lastname:props.lastName!}); 
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
            console.log(err)
            toast(`Unknown error occured`,{className:"text-red-500 bg-red-300"})
        }
    }); 

    const onSubmit = async(data:SignUpSchema)=>{
        try{
            // 
            const parseData = data?.role=="STUDENT"?studentSchema.safeParse(data):recruiterSchema.safeParse(data);
            if(parseData.success == true)
                await signup(data);
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
        control, 
        isLoading
    }
}
