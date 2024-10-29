import { useQuery, useQueryClient } from "react-query";
import axios, { AxiosRequestConfig } from "axios";
import { useAuth } from "@/context/store/use-auth";
import { SERVER_URL } from "@/env";

type Candidacy = {
    id: number;
    studentId: number;
    offerId: number;
    status: string;
    dateOfCandidacy: string;
    dateOfResponse?: string;
    studentPhoto?: string;
    studentName: string;
};

interface DataResponse {
    candidacies: Candidacy[];
}

interface UseGetCandidaciesQuery {
    data?: DataResponse;
    isLoading: boolean;
    error: unknown;
}

export const useGetCandidaciesByOfferId = (offerId: number | undefined): UseGetCandidaciesQuery & { refresh: () => void } => {
    const { user } = useAuth();
    const queryClient = useQueryClient();

    const config: AxiosRequestConfig = {
        headers: {
            authorization: `Bearer ${user?.tokens?.access?.token || ""}`,
        },
    };

    const { data, isLoading, error } = useQuery({
        queryKey: ["candidacies", offerId],
        queryFn: async () => {
            if (typeof offerId !== "number") {
                throw new Error("Invalid offerId: Must be a number but its a " + typeof offerId);
            }
            const response = await axios.get(`${SERVER_URL}/candidacy/offer/${offerId}`, config);
            return { candidacies: response.data };
        },
        enabled: !!user?.tokens?.access?.token && typeof offerId === "number",
    });

    const refresh = () => queryClient.refetchQueries({ queryKey: ["candidacies", offerId] });

    return {
        data,
        isLoading,
        error,
        refresh,
    };
};
