"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CompletedBets } from "./_components/completed-bets";
import { OngoingBets } from "./_components/ongoing-bets";

export default function BetsPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-3xl font-bold">Mes Paris</h1>
      <Tabs defaultValue="ongoing" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="ongoing">Paris en cours</TabsTrigger>
          <TabsTrigger value="completed">Paris terminés</TabsTrigger>
        </TabsList>
        <TabsContent value="ongoing">
          <OngoingBets />
        </TabsContent>
        <TabsContent value="completed">
          <CompletedBets />
        </TabsContent>
      </Tabs>
    </div>
  );
}
