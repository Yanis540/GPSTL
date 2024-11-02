import { useQuery, useQueryClient } from "react-query";
import axios, { AxiosRequestConfig } from "axios";
import { useAuth } from "@/context/store/use-auth";
import { SERVER_URL } from "@/env";

interface DataResponse {
    candidacies: Candidacy[];
}

interface UseGetCandidaciesQuery {
    data ?: DataResponse;
    isLoading: boolean;
    error: unknown;
}

export const useGetCandidaciesByOfferId = (offerId: number | undefined): UseGetCandidaciesQuery & { refresh: () => void } => {
    const { user } = useAuth();
    const queryClient = useQueryClient();

    const config :AxiosRequestConfig= {
        headers:{
            Authorization :`Bearer ${user?.tokens?.access?.token}`
        }, 
        
    }

    const { data, isLoading, error } = useQuery({
        queryKey: ["candidacies","offer"],
        queryFn: async () => {
            const response = await axios.get(`${SERVER_URL}/candidacy/offer/${offerId}`, config);
            const data = await response.data
            return data;
        }, 
    });
    const refresh = () => queryClient.refetchQueries({ queryKey: ["candidacies", "offer"] });

    return {
        data:!data?undefined:{candidacies:data},
        isLoading,
        error,
        refresh,
    };
};
