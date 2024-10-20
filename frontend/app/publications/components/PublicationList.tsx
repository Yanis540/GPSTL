// components/PublicationsList.tsx
'use client';

import React from 'react';
import Publication from './Publication';
import { publicationsData } from '@/mockData/publications';
import { useRouter } from 'next/navigation';

const PublicationsList: React.FC = () => {
  const router = useRouter();

  const handleClick = (id: number) => {

    router.push(`/publications/${id}`);
  };

  return (
    <div className="relative *:p-8 md:w-[50%] mx-auto   rounded-lg shadow-inner">
      <h1 className="text-2xl font-bold mb-4">Publications</h1>
      
      {publicationsData.map((publication) => (
        <Publication 
          key={publication.id} 
          publication={publication} 
          onClick={() => handleClick(publication.id)} 
        />
      ))}
    </div>
  );
};

export default PublicationsList;