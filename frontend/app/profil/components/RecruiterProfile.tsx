import React, { use } from 'react';
import { Button } from "@/components/ui/button";
import { Recruiter } from "../use-profil";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { z } from 'zod';

const recruiterSchema = z.object({
  photo: z.string().url("URL de l'image invalide"),
  description: z.string().min(1, "La description est requise"),
});

interface RecruiterProfileProps {
    recruiter: Recruiter;
    isEditing: boolean;
    updateUser: (updatedUser: Partial<Recruiter>) => void;
    setIsEditing: (isEditing: boolean) => void;
    saveUser: (updatedUser: Partial<Recruiter>) => void;
  }
  
export  const RecruiterProfile: React.FC<RecruiterProfileProps> = ({ recruiter, isEditing, updateUser, setIsEditing, saveUser }) => {
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  // const handleSave = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   saveUser(recruiter);
  //   setIsEditing(false);
  //   setIsUpdating(true);
  // }

  const handleInputChange = (field: keyof Recruiter, value: string) => {
    updateUser({ ...recruiter, [field]: value });
    setErrors({}); // Reset errors on input change
  };

  const handleFieldChange = (field: keyof Recruiter, value: any) => {
    handleInputChange(field, value);
  }
  
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault(); // Empêche le comportement par défaut de soumission du formulaire

    const result = recruiterSchema.safeParse(recruiter); // Validate the updated recruiter

    if (result.success) {
        setIsEditing(false);
        saveUser(recruiter);
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
              value={recruiter.photo}
              placeholder="picture's url"
              className="border p-2 w-full "
              onChange={(e) => handleInputChange('photo', e.target.value)}
            />           
            <Textarea 
              defaultValue={recruiter.description} 
              placeholder="Description" 
              className="border p-2 w-full h-32 resize-none " 
              onChange={(e) => handleInputChange('description', e.target.value)}
            />
            <div className="flex justify-between">
              <Button type="button" onClick={() => {setIsEditing(false);}}>Annuler</Button>
              <Button type="submit">Sauvegarder</Button>
            </div>
          </form>
        ) : (
          <div className="space-y-4 text-center w-full text-xl">
            <p className="break-words text-left ml-5">{recruiter?.description}</p>
          </div>
        )}
      </>
    );
  };
  