import { useQuery, useQueryClient } from "react-query";
import axios, { AxiosRequestConfig } from "axios"; 
import { useAuth } from "@/context/store/use-auth";
import { SERVER_URL } from "@/env";

type DataResponse = {offers:Offer[]}
interface useGetRecruiterOffersQuery  {
    data ?: DataResponse
    isLoading : boolean 
    error : unknown 
}

export const useGetRecruiterOffers = ()=>{
    const {user} = useAuth();
    const queryClient = useQueryClient()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const config:AxiosRequestConfig<any> = {
        headers:{
            authorization:`Bearer ${user?.tokens?.access?.token??""}`
        }
    }
    const {data,isLoading,error}:useGetRecruiterOffersQuery  = useQuery({
        queryKey:["offer","all","recruiter","offers",user?.id], 
        queryFn:async()=>{
            const response = await axios.get(SERVER_URL+`/offer/all/recruiter/offers/${user?.id}`,config)
            const data = await response.data
            return {offers:data};
        },
       
    }) 
    const refresh = ()=>queryClient.invalidateQueries({queryKey:["offer","all","recruiter","offers",user?.id]}) 

    return {
        data, 
        isLoading,
        error, 
        refresh
    }

}