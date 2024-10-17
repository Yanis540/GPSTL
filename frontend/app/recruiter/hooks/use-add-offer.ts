/* eslint-disable @typescript-eslint/no-unused-vars */
import { z } from "zod"
import { toast } from "sonner";
import {useForm} from 'react-hook-form'
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseMutateAsyncFunction, useMutation } from "react-query";
import axios, { AxiosRequestConfig } from "axios"; 
import { useAuth } from "@/context/store/use-auth";
import { SERVER_URL } from "@/env";
export const addOfferSchema = z.object({
    name : z.string().min(1), 
    salary : z.number().int()
    .positive()
    .min(1, { message: "Salary should be at least 1" }),
    rhythm : z.string().min(1), 
    description: z.string().min(2), 
    publicationDate: z.date().catch(new Date())
})
export type AddOfferSchema= z.infer<typeof addOfferSchema>
interface DataResponse {
    offer: Offer
}
interface useAddOfferMutation  {
    data ?: DataResponse
    isLoading : boolean 
    error : unknown 
    mutateAsync : UseMutateAsyncFunction<DataResponse, unknown,AddOfferSchema, unknown>
}


export const useAddOffer = (callback?:(offer:Offer)=>void)=>{
    const {
        register,
        handleSubmit,
        // watch,
        formState: { errors },
    } = useForm<AddOfferSchema>({
        resolver : zodResolver(addOfferSchema)
    }); 
    const {user} = useAuth();
    const router = useRouter(); 
    const config :AxiosRequestConfig= {
        headers:{
            Authorization :`Bearer ${user?.tokens?.access?.token}`
        }
    }
    const {isLoading,mutateAsync:add}:useAddOfferMutation = useMutation({
        mutationKey:["offers","add"],
        mutationFn:async(props:AddOfferSchema)=>{
            const response= await axios.post(SERVER_URL+"/offers/add",{...props},config); 
            const data = await response.data ; 
            return data ; 
        }, 
        onSuccess:(data:DataResponse)=>{
            console.log(data);
            toast("New offer added"); 
            if(!callback ) 
                router.refresh();
            else 
                callback(data?.offer)             
        }, 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (err:any)=>{
            toast(`Unknown error occured`,{className:"text-red-500 bg-red-300"})
        }
    }); 
    const onSubmit = async(data:AddOfferSchema)=>{
        try{
            // await add(data);
            console.log(data)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            // set_user(({...data,name:"Yanis",id:1233}) as any ); 
        }
        catch(err){

        }
        
    }

    return {
        register,
        add :  handleSubmit(onSubmit), 
        isLoading,
        errors
    }
}