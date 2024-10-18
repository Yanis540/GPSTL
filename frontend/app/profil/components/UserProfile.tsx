import React, { useState } from 'react';
import { Student, Recruiter, User } from '../use-profil';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface UserProfileProps {
  user: Student | Recruiter | User | null; // Assurez-vous que le type est correct
  isEditing: boolean;
  saveUser: (updatedUser: Partial<User>) => void;
  setIsEditing: (isEditing: boolean) => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user, isEditing, saveUser, setIsEditing }) => {
  const [updatedUser, setUpdatedUser] = useState<User>(user || {} as User);

  const handleInputChange = (field: keyof User, value: string) => {
    setUpdatedUser(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveUser(updatedUser);
    setIsEditing(false);
  };

  return isEditing ? (
    <form onSubmit={handleSave} className="w-full h-48 flex flex-col justify-center space-y-2 p-4">
      <div className="flex justify-between space-x-4">
  <Input
    type="text"
    value={updatedUser?.firstname}
    onChange={(e) => handleInputChange('firstname', e.target.value)}
    placeholder="Prénom"
    className="flex-1 " // Prend tout l'espace disponible
  />
  <Input
    type="text"
    value={updatedUser?.lastname}
    onChange={(e) => handleInputChange('lastname', e.target.value)}
    placeholder="Nom"
    className="flex-1 "// Prend tout l'espace disponible
  />
</div>

      <Input
        type="text"
        value={updatedUser?.email}
        onChange={(e) => handleInputChange('email', e.target.value)}
        placeholder="Email"
        className=""
      />
        
    { updatedUser.role === 'STUDENT' && (
        <>
        <div className="flex justify-between space-x-4">
            <Input
            type="text"
            value={updatedUser?.schoolName}
            onChange={(e) => handleInputChange('schoolName', e.target.value)}
            placeholder="École"
            className="flex-1 "
            />
            <Input
            type="text"
            value={updatedUser?.field?.value}
            onChange={(e) => handleInputChange('field', { value: e.target.value })}
            placeholder="Domaine"
            className="flex-1 "
            />
        </div>
            <Input
            type="text"
            value={updatedUser?.grade?.value}
            onChange={(e) => handleInputChange('grade', { value: e.target.value })}
            placeholder="Niveau"
            className=""
            />
        </>
        )
    }
    </form>
  ) : (
    <div className="w-full h-48 flex flex-col justify-center space-y-2 p-4">
      <h4 className="text-4xl font-semibold ">{user?.firstname} {user?.lastname}</h4>
      <p className="">Contactez-moi : {user?.email}</p>
      <p className="">Né(e) le {new Date(user?.birthdate).toLocaleDateString('fr-FR')}</p>
      {user?.role === 'STUDENT' && (
        <>
          <p className="">Étudiant(e) à {user?.schoolName} en {user?.field?.value}</p>
          <p className="">Niveau : {user?.grade?.value}</p>
        </>
      )}
    </div>
  );
};

export default UserProfile;
