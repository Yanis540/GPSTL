/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { toast } from "sonner";
import { useQuery } from "react-query";
import axios from "axios";
import { SERVER_URL } from "@/env";

export const fetchCandidacies = async () => {
    const user = JSON.parse(<string>localStorage.getItem("store-auth"));
    const token = user?.state?.user?.tokens?.access?.token;

    if (!token) {
        throw new Error('Token not found');
    }

    // Ajout de l'en-tête Authorization avec le token Bearer
    const response = await axios.get(`${SERVER_URL}/candidacy/student`, {
        headers: {
            Authorization: `Bearer ${token}`, // Bearer token ajouté ici
        },
    });
    return response.data;
};

export const useCandidacies = () => {
    const { data, isLoading, error } = useQuery<Candidacy[], Error>(
        "candidacies",
        fetchCandidacies,
        {
            onError: (err) => {
                toast(`Error fetching candidacies: ${err.message}`, {
                    className: "text-red-500 bg-red-300"
                });
            },
            staleTime: 5 * 60 * 1000, // Les données restent "frais" pendant 5 minutes
            refetchOnWindowFocus: false // Ne pas refetch sur le focus de la fenêtre
        }
    );

    return {
        candidacies: data, // Données récupérées
        isLoading, // État de chargement
        error // Éventuelles erreurs
    };
};
