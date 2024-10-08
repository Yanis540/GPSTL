

import axios, { AxiosRequestConfig } from "axios"
import { SERVER_URL } from "../env"
import { useQuery, useQueryClient } from "react-query"
import { useAuth } from "@/context/store/use-auth"


interface  useGetUserType {
    error: unknown 
    data : {
        user : User 
        error ?:{message:string}
    }|undefined
    isLoading : boolean
    // mutate:UseMutateFunction<any, unknown, void, unknown>
}

const useGetUser = ()=>{
    const {user,set_user} = useAuth();
    const queryClient = useQueryClient()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const config:AxiosRequestConfig<any> = {
        headers:{
            authorization:`Bearer ${user?.tokens?.access?.token??""}`
        }
    }
    const {data,isLoading,error}:useGetUserType  = useQuery({
        queryKey:["user"], 
        queryFn:async()=>{
            const response = await axios.get(SERVER_URL+`/user`,config)
            const data = await response.data
            return data;
        },
        onSuccess:(data)=>{
            if(data?.user)
                set_user({tokens:user?.tokens,...data.user})
        }
    }) 
    const refresh = ()=>queryClient.invalidateQueries({queryKey:["user"]}) 

    return {
        data, 
        isLoading,
        error, 
        refresh
    }
}

export {
    useGetUser
}

