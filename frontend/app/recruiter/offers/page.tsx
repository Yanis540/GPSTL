'use client';
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody } from '@/components/ui/table';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { DashboardHeader, TabCatgoriesHeader } from './components/dashboard.header';
import { TabHeader, TabRow } from './components/table';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import Link from 'next/link';

type PageProps = object;

function Page({ }: PageProps) {
  return (
      <Dashboard />
  );
};

function Dashboard() {
  const handleCreateNewOffer = () => {
    console.log('New offer creation triggered');
  };

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
            <TabCatgoriesHeader newOffer={handleCreateNewOffer} />
            <TabsContent value="all">
              <Card>
                <CardHeader>
                  <CardTitle>Candidacies</CardTitle>
                  <CardDescription>
                    Manage your candidacies and view their status.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TabHeader />
                    <TableBody>
                      <TabRow />
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                    candidacies
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </>
  );
}

export default Page;
