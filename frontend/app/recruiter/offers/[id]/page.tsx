'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody } from '@/components/ui/table';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { TabHeader, TabRow } from './tableCandidacies';

export default function Dashboard() {
  const [selectedCandidates, setSelectedCandidates] = useState<number[]>([]);

  const mockCandidateIds = [1, 2, 3];
  const isAllSelected = selectedCandidates.length === mockCandidateIds.length;

  const selectAllCandidates = (isSelected: boolean) => {
    setSelectedCandidates(isSelected ? mockCandidateIds : []);
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
                  <TabHeader selectAll={selectAllCandidates} isAllSelected={isAllSelected} />
                  <TableBody>
                    <TabRow
                        selectedCandidates={selectedCandidates}
                        setSelectedCandidates={setSelectedCandidates}
                    />
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <div className="text-xs text-muted-foreground">
                  Showing <strong>1-3</strong> of <strong>3</strong> candidacies
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
  );
}
