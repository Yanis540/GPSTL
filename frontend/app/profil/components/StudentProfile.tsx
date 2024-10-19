import React from 'react';
import { Button } from "@/components/ui/button";
import { Student } from "../use-profil";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { z } from 'zod';

const studentSchema = z.object({
  photo: z.string().url("URL de l'image invalide"),
  description: z.string().min(1, "La description est requise"),
});


interface StudentProfileProps {
  user: Student;
  isEditing: boolean;
  updateUser: (updatedUser: Partial<Student>) => void;
  setIsEditing: (isEditing: boolean) => void;
  saveUser: (updatedUser: Partial<Student>) => void;
}

export const StudentProfile: React.FC<StudentProfileProps> = ({ user, isEditing, updateUser, setIsEditing, saveUser }) => {
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  const handleInputChange = (field: keyof Student, value: string) => {
    updateUser({ ...user, [field]: value });
    setErrors({}); // Reset errors on input change
  };

  const handleFieldChange = (field: keyof Student, value: any) => {
    handleInputChange(field, value);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault(); // Empêche le comportement par défaut de soumission du formulaire

    const result = studentSchema.safeParse(user); // Validate the updated student

    if (result.success) {
        setIsEditing(false);
        saveUser(user);
    } else {
        const fieldErrors = result.error.flatten().fieldErrors; // Récupérer les erreurs de validation
        setErrors(fieldErrors);
    }
};



  return (
    <>
      {isEditing ? (
        <form onSubmit={handleSave} className="space-y-4">
          <Input
            type="text"
            value={user.photo}
            placeholder="picture's url"
            className="border p-2 w-full "
            onChange={(e) => handleFieldChange('photo', e.target.value)}
            />
            {errors.photo && <p className="text-red-500">{errors.photo}</p>}
          
          <Textarea
            value={user.description}
            placeholder="Description"
            className="border p-2 w-full h-32 resize-none "
            onChange={(e) => handleFieldChange('description', e.target.value)}
          />
          {errors.description && <p className="text-red-500">{errors.description}</p>}
          <div className="flex justify-between">
            <Button type="button" onClick={() => {setIsEditing(false);}}>Annuler</Button>
            <Button type="submit">Sauvegarder</Button>
          </div>
        </form>
      ) : (
        <div className="flex justify-between w-full p-2">
            <div className="text-left  space-y-2 p-4 mr-2">
                <p><u>Compétences</u></p>
                <ul className="list-disc pl-5">
                {user?.skills.map((skill, index) => (
                    <li key={index} className="whitespace-nowrap">{skill?.value}</li>
                ))}
                </ul>
            </div>
            <div className="flex flex-col  space-y-2 flex-grow pt-2.5 ml-7">
                <p className="flex text-left space-y-2 pl-4">{user?.description}</p>
            </div>
        </div>
      )}
    </>
  );
};
