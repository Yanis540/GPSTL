import axios from "axios";
import {SERVER_URL} from "@/env";
import {useQuery} from "react-query";
import {toast} from "sonner";

export const fetchOffers = async (token: string) => {
    const response = await axios.get(`${SERVER_URL}/offer/available`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const useAllOffers = (token: string) => {
    const { data, isLoading, error } = useQuery<Offer[], Error>(
        "offers",
        () => fetchOffers(token),
        {
            onError: (err) => {
                toast(`Error fetching offers: ${err.message}`, {
                    className: "text-red-500 bg-red-300"
                });
            },
            staleTime: 5 * 60 * 1000, // Les données restent "frais" pendant 5 minutes
            refetchOnWindowFocus: false // Ne pas refetch sur le focus de la fenêtre
        }
    );

    return {
        offers: data, // Données récupérées
        isLoading, // État de chargement
        error // Éventuelles erreurs
    };
};