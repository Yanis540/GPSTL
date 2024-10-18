/* eslint-disable @typescript-eslint/no-empty-object-type */
'use client'
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,

} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  
} from "@/components/ui/tabs"

import { DashboardHeader, TabCatgoriesHeader } from './components/dashboard.header';
import { TabHeader, TabRow } from './components/table';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import Link from 'next/link';
import { useGetRecruiterOffers } from './hooks/use-get-recruiter-offers';

interface PageProps {

};

function Page({ }: PageProps) {
  return (
    <Dashboard />
  );
};

function Dashboard() {
  const {data} = useGetRecruiterOffers();
  console.log(data)
  // const offer  = {
  //   id : 1, 
  //   name : "Full stack web developper", 
    
  //   publicationDate : "2023-07-12 10:42 AM"

  // } 
  // const [offer]

  const offers = 
    data?.offers.map((o)=>({
      ...o,img : {
        url :"https://companieslogo.com/img/orig/CAP.PA-9b4110b0.png?t=1720244491"
      }, 
      status : "active",
      numberOfCandidates : 25, 
  })as RecruiterOfferData)

  return (
    <>
        <DashboardHeader>
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </BreadcrumbList>
          </Breadcrumb>
        </DashboardHeader>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <TabCatgoriesHeader  />
            <TabsContent value="all">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Offers</CardTitle>
                  <CardDescription>
                    Manage your offers and view their performance.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TabHeader />
                    <TableBody>
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      {offers?.map((offer:any,i:number)=>(
                        <TabRow key={i} offer={offer as RecruiterOfferData} />
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                    offers
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
    </>
  )
}

export default Page;