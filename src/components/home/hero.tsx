import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="from-primary/20 to-background flex h-screen items-center justify-center bg-gradient-to-b">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">{"Atomic Betting"}</h1>
            <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl dark:text-gray-400">
              {"Pariez à l'échelle atomique. Créez des paris privés, rejoignez des équipes et gagnez des Atomic Credits."}
            </p>
          </div>
          <div className="space-x-4">
            <Link href={"/sign-in"}>
              <Button size="lg">{"Commencer"}</Button>
            </Link>
            <Link href={"/features"}>
              <Button size="lg" variant="outline">
                {"En savoir plus"}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
