// use-profile.ts

import { useState, useEffect } from 'react';
import { getUser, updateUser } from './profil-service';
import { User } from './user-types'; // Assurez-vous d'importer l'interface User depuis un fichier approprié

const userId = 1; // Id de l'utilisateur (remplacez-le par le bon id selon votre logique)

export const useProfil = () => {
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    const fetchedUser = getUser(userId);
    setUser(fetchedUser);
  }, []);

  const saveUser = (updatedData: Partial<User>) => {
    const updatedUser = updateUser(userId, updatedData);
    if (updatedUser) {
      setUser(updatedUser);
    }
  };

  return {
    user,
    saveUser
  };
};
