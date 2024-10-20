import React from 'react';
import PublicationsList from './components/PublicationList'
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface PageProps {

};

function Page({}:PageProps) {
    return (
    <>
        <PublicationsList />
      </>
    );
};

export default Page;