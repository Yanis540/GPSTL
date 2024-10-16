// profile-service.ts

import { User } from './user-types'; // Assurez-vous d'importer l'interface User depuis un fichier approprié

// Simule une base de données ou un API endpoint
const users: User[] = [
  {
    id: 1,
    username: "John Doe",
    email: "john.doe@example.com",
    bio: "I own a computer.",
    school: "Sorbonne Université",
    birthdate: "1990-01-01",
    role: "Student"
  }
];

// Fonction pour obtenir les informations de l'utilisateur
export const getUser = (userId: number): User | undefined => {
  return users.find(user => user.id === userId);
};

// Fonction pour mettre à jour les informations de l'utilisateur
export const updateUser = (userId: number, updatedUser: Partial<User>): User | undefined => {
  const userIndex = users.findIndex(user => user.id === userId);
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...updatedUser };
    return users[userIndex];
  }
  return undefined;
};
