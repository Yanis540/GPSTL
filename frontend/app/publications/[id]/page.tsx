'use client';

import React from 'react';
// import { useRouter } from 'next/router';
import { publicationsData } from '@/mockData/publications';
import Comments from '@/components/Comments';
import { useParams } from 'next/navigation';

const PublicationDetails: React.FC = () => {
  // const router = useRouter();
  const { id } = useParams();
  console.log(id);
  const publication = publicationsData.find((p) => p.id === Number(id));

  if (!publication) {
    return <div>Publication not found.</div>;
  }

  return (
    <div className="flex-1 p-8 mx-auto rounded-lg  md:w-[50%]  h-[calc(100vh-4rem)] ">
      <div className="bg-background shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground">{publication.title}</h2>
        <p className="text-gray-700 dark:text-gray-500">{publication.description}</p>
        <Comments comments={publication.comments!} />
      </div>
    </div>
  );
};

export default PublicationDetails;