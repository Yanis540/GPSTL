'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody } from '@/components/ui/table';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { TabHeader, TabRow } from './components/table';
import { useGetCandidaciesByOfferId } from './hooks/useGetCandidaciesByOfferId';
import { useParams } from 'next/navigation';
import { Icons } from '@/components/icons';

export default function Dashboard() {
  const [selectedCandidates, setSelectedCandidates] = useState<number[]>([]);
  const params = useParams();
  const offerId = params.id as unknown  as number; 
  

  const { data, isLoading, error } = useGetCandidaciesByOfferId(offerId );
  console.log(data)
  const selectAllCandidates = (isSelected: boolean) => {
    setSelectedCandidates(isSelected  && data?.candidacies? data?.candidacies.map((c: { id: number }) => c.id) : []);
  };

  if (isLoading || !data) return <div className="flex-1 flex flex-col items-center justify-center "><Icons.spinner className="text-primary h-16 w-16" /></div>;
  if (error) return <div className="flex-1 flex flex-col items-center justify-center "><h2 className=" text-primary font-bold text-2xl md:text-4xl ">Error loading data</h2></div>;
  return (
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Tabs defaultValue="all">
          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>Candidacies</CardTitle>
                <CardDescription>Manage your candidacies and view their status.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TabHeader
                      selectAll={selectAllCandidates}
                      selectedCandidates={selectedCandidates}
                      candidacies={data?.candidacies}
                  />
                  <TableBody>
                    <TabRow
                        selectedCandidates={selectedCandidates}
                        setSelectedCandidates={setSelectedCandidates}
                        candidacies={data?.candidacies}
                    />
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <div className="text-xs text-muted-foreground">
                  Showing <strong>1-{data?.candidacies?.length}</strong> of <strong>{data?.candidacies?.length}</strong> candidacies
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
  );
}
