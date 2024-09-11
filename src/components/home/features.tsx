import { Trophy, Users, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Features() {
  return (
    <section className="w-full bg-gray-100 py-12 md:py-24 lg:py-32 dark:bg-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter text-gray-900 sm:text-5xl dark:text-gray-100">{"Fonctionnalités"}</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          <Card>
            <CardHeader>
              <Users className="mb-2 size-8" />
              <CardTitle>{"Équipes privées"}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Créez ou rejoignez des équipes privées pour parier entre amis, collègues ou camarades de classe.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Zap className="mb-2 size-8" />
              <CardTitle>{"Paris personnalisés"}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{"Créez des paris sur mesure pour n'importe quel événement, du plus sérieux au plus farfelu."}</p>
            </CardContent>
          </Card>
          <Card className="sm:col-span-2 lg:col-span-1">
            <CardHeader>
              <Trophy className="mb-2 size-8" />
              <CardTitle>{"Atomic Credits"}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{"Pariez et gagnez des Atomic Credits, notre monnaie virtuelle exclusive et sans risque."}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
