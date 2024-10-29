'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody } from '@/components/ui/table';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { TabHeader, TabRow } from './components/table';
import { useGetCandidaciesByOfferId } from './hooks/useGetCandidaciesByOfferId';
import { useParams } from 'next/navigation';

export default function Dashboard() {
  const [selectedCandidates, setSelectedCandidates] = useState<number[]>([]);
  const [offerId, setOfferId] = useState<number | undefined>(undefined);
  const params = useParams();

  useEffect(() => {
    if (params?.id) {
      setOfferId(parseInt(params.id as string, 10));
    }
  }, [params?.id]);

  const { data, isLoading, error, refresh } = useGetCandidaciesByOfferId(offerId);
  const candidacies = data?.candidacies || [];

  const selectAllCandidates = (isSelected: boolean) => {
    setSelectedCandidates(isSelected ? candidacies.map((c: { id: any }) => c.id) : []);
  };

  if (!offerId) return <p>Loading offer information...</p>;
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

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
                      candidacies={candidacies}
                  />
                  <TableBody>
                    <TabRow
                        selectedCandidates={selectedCandidates}
                        setSelectedCandidates={setSelectedCandidates}
                        candidacies={candidacies}
                    />
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <div className="text-xs text-muted-foreground">
                  Showing <strong>1-{candidacies.length}</strong> of <strong>{candidacies.length}</strong> candidacies
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
  );
}
