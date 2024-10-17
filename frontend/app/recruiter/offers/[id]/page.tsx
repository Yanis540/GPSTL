import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface PageProps {
    params ? : string
};

function Page({}:PageProps) {
    return (
        <div className="">
           Page
           display les candidatures 
        </div>
    );
};

export default Page;