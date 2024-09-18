import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";

export async function Hero() {
  const session = await auth();

  return (
    <section className="from-primary/20 to-background flex min-h-screen items-center justify-center bg-gradient-to-b">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center space-y-6 text-center">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">{`Atomic Betting`}</h1>
            <p className="mx-auto max-w-[700px] text-base text-gray-600 sm:text-lg md:text-xl dark:text-gray-400">
              {`Pariez à l'échelle atomique. Créez des paris privés, rejoignez des équipes et gagnez des Atomic Credits.`}
            </p>
          </div>
          <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Link href={session?.user ? "/team" : "/sign-in"}>
              <Button size="lg" className="w-full sm:w-auto">
                {session?.user ? `Tableau de bord` : `Commencer`}
              </Button>
            </Link>
            <Link href="/features">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                {`En savoir plus`}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
