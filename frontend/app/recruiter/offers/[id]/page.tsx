'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody } from '@/components/ui/table';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { TabHeader, TabRow } from './components/table';
import { mockCandidacies, Candidacy } from './data/mockCandidacies';

export default function Dashboard() {
  const [selectedCandidates, setSelectedCandidates] = useState<number[]>([]);

  const candidacies: Candidacy[] = mockCandidacies;
  const selectAllCandidates = (isSelected: boolean) => {
    setSelectedCandidates(isSelected ? candidacies.map(c => c.id) : []);
  };

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