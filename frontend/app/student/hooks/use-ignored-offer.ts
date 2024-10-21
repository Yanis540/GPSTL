import axios from "axios";
import {SERVER_URL} from "@/env";
import {useMutation} from "react-query";
import {toast} from "sonner";


const ignoredOffer = async (offerId: number, token: string) => {
    const response = await axios.post(`${SERVER_URL}/user/ignored/${offerId}`,
        null,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data;
};

export const useIgnoredOffer = (token: string) => {

    const mutation = useMutation(
        (offerId: number) => ignoredOffer(offerId, token),
        {
            onSuccess: () => {
                toast("Offer ignored", {
                    className: "text-green-500 bg-green-300",
                });
            },
            onError: () => {
                toast(`Error`, {
                    className: "text-red-500 bg-red-300",
                });
            },
        }
    );

    return {
        ignoredOffer: mutation.mutate, // Fonction pour appeler la mutation
        error: mutation.error, // Éventuelles erreurs
    };

};
