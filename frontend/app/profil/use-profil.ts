import { useState, useEffect } from 'react';
import axios from 'axios';
import { SERVER_URL } from "@/env";

// Interface utilisateur
export interface User {
  id: number;
  firstname: string;
  lastname : string;
  email: string;
  birthdate: string;
  role: string;
  photo : string;
  description: string;
}

export interface Referential {
  id: number;
  type: string;
  value: string;
}


export interface Student extends User {
  schoolName: string;
  field: Referential;
  grade: Referential;
  skills: Referential[];
  monthlyCurrentCandidacy: number;
}

export interface Recruiter extends User {
  companyId: number;
}


// Fonction pour récupérer les informations de l'utilisateur via l'API
const getUser = async (userId: number): Promise<User | Student | Recruiter | undefined> => {
  try {
    const response = await axios.get(`${SERVER_URL}/user/${userId}`);
    if (response.data.role === 'STUDENT') {
      return response.data as Student;
    }
    if (response.data.role === 'RECRUITER') {
      return response.data as Recruiter;
    }
    return response.data as User;
    
  } catch (error) {
    console.error('Erreur lors de la récupération des données utilisateur:', error);
  }
  return undefined;
};

// Fonction pour mettre à jour les informations de l'utilisateur via l'API
const updateUser = async (userId: number, updatedUser: Partial<User>): Promise<User | undefined> => {
  try {
    if (updatedUser.role === 'STUDENT') {
      const response = await axios.put(`${SERVER_URL}/user/student/${userId}`, updatedUser);
      return response.data;
    }
    else  {
      const response = await axios.put(`${SERVER_URL}/user/recruiter/${userId}`, updatedUser);
      return response.data;
    }

    // const response = await axios.put(`${SERVER_URL}/api/users/${userId}`, updatedUser);
    // return response.data;
  } catch (error) {
    console.error('Erreur lors de la mise à jour des données utilisateur:', error);
  }
  return undefined;
};

// Hook personnalisé pour gérer les informations du profil utilisateur
export const useProfil = () => {
  const [user, setUser] = useState<User | Student | Recruiter | undefined>(undefined);

  // Récupérer les informations utilisateur lors du chargement
  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await getUser(2); // Récupère l'utilisateur avec l'ID 1 (exemple)
      setUser(fetchedUser);
      console.log("usr recupere : " ,fetchedUser);
    };
    fetchUser();
  }, []);

  // Sauvegarder les modifications de l'utilisateur
  const saveUser = async (updatedUser: Partial<User | Student | Recruiter>) => {
    if (user) {
      console.log("User avant mise à jour:", user);
      console.log("Données mises à jour:", updatedUser);
      
      const savedUser = await updateUser(user.id, updatedUser);
      
      if (savedUser) {
        setUser(savedUser);
        console.log("User après mise à jour:", savedUser);

      } else {
        console.error("Erreur lors de la mise à jour");
      }
    }
  };
  

  return { user, saveUser };
};



























// // use-profile.ts

// import { useState, useEffect } from 'react';
// import { getUser, updateUser } from './profil-service';
// import { User } from './user-types'; // Assurez-vous d'importer l'interface User depuis un fichier approprié

// const userId = 1; // Id de l'utilisateur (remplacez-le par le bon id selon votre logique)

// export const useProfil = () => {
//   const [user, setUser] = useState<User | undefined>(undefined);

//   useEffect(() => {
//     const fetchedUser = getUser(userId);
//     setUser(fetchedUser);
//   }, []);

//   const saveUser = (updatedData: Partial<User>) => {
//     const updatedUser = updateUser(userId, updatedData);
//     if (updatedUser) {
//       setUser(updatedUser);
//     }
//   };

//   return {
//     user,
//     saveUser
//   };
// };