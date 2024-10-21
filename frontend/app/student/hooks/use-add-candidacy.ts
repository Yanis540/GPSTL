/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { toast } from "sonner";
import { useMutation } from "react-query";
import axios from "axios";
import { SERVER_URL } from "@/env";

// Fonction pour ajouter une candidature
const addCandidacy = async (offerId: number, token: string) => {
    const response = await axios.post(`${SERVER_URL}/candidacy`,
        { offer: {id: offerId} },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data;
};

// Hook pour gérer l'ajout de candidature
export const useAddCandidacy = (token: string) => {
    const mutation = useMutation(
        (offerId: number) => addCandidacy(offerId, token),
        {
            onSuccess: () => {
                toast("Candidacy added successfully!", {
                    className: "text-green-500 bg-green-300",
                });
            },
            onError: () => {
                toast(`Error adding candidacy`, {
                    className: "text-red-500 bg-red-300",
                });
            },
        }
    );

    return {
        addCandidacy: mutation.mutate, // Fonction pour appeler la mutation
        error: mutation.error, // Éventuelles erreurs
    };
};
