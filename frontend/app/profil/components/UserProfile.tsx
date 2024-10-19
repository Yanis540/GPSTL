import React, { useState, useEffect } from 'react';
import { Student, Recruiter, User } from '../use-profil';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from 'zod';

const userSchema = z.object({
  firstname: z.string().min(1, "Prénom requis"),
  lastname: z.string().min(1, "Nom requis"),
  email: z.string().email("Email invalide"),
  schoolName: z.string().optional(),
  field: z.object({ value: z.string().optional() }).optional(),
  grade: z.object({ value: z.string().optional() }).optional(),
});

interface UserProfileProps {
  user: Student | Recruiter | User | null; // Assurez-vous que le type est correct
  isEditing: boolean;
  updateUser: (updatedUser: Partial<User>) => void;
  setIsEditing: (isEditing: boolean) => void;
  isUpdating: boolean;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user, isEditing, updateUser, setIsEditing, isUpdating}) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // useEffect(() => {
  //   if (isUpdating) {
  //     console.log("AAAAAAAAAAAAAAA :", isUpdating);
  //     handleSave();
  //   }
  // }, [isUpdating]);


  const handleInputChange = (field: keyof User, value: string) => {
    updateUser({ ...user, [field]: value });
    setErrors({}); // Reset errors on input change
  };

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault(); // Empêche le comportement par défaut de soumission du formulaire

    const result = userSchema.safeParse(user); // Validate the updated user

    if (result.success) {
        setIsEditing(false);
    } else {
        const fieldErrors = result.error.flatten().fieldErrors; // Récupérer les erreurs de validation
        setErrors(fieldErrors);
    }
  };


  return isEditing ? (
    <form onSubmit={(e) => e.preventDefault()} className="w-full h-48 flex flex-col justify-center space-y-2 p-4">
      <div className="flex justify-between space-x-4">
        <Input
          type="text"
          value={user?.firstname}
          onChange={(e) => handleInputChange('firstname', e.target.value)}
          placeholder="Prénom"
          className="flex-1 " // Prend tout l'espace disponible
        />
        {errors.firstname && <p className="text-red-500">{errors.firstname}</p>}
        <Input
          type="text"
          value={user?.lastname}
          onChange={(e) => handleInputChange('lastname', e.target.value)}
          placeholder="Nom"
          className="flex-1 "// Prend tout l'espace disponible
        />
        {errors.lastname && <p className="text-red-500">{errors.lastname}</p>}
      </div>

      <Input
        type="text"
        value={user?.email}
        onChange={(e) => handleInputChange('email', e.target.value)}
        placeholder="Email"
        className=""
      />
      {errors.email && <p className="text-red-500">{errors.email}</p>}
    { user.role === 'STUDENT' && (
        <>
        <div className="flex justify-between space-x-4">
            <Input
            type="text"
            value={user?.schoolName}
            onChange={(e) => handleInputChange('schoolName', e.target.value)}
            placeholder="École"
            className="flex-1 "
            />
            
            <Input
            type="text"
            value={user?.field?.value}
            onChange={(e) => handleInputChange('field', { value: e.target.value })}
            placeholder="Domaine"
            className="flex-1 "
            />
        </div>
            <Input
            type="text"
            value={user?.grade?.value}
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
