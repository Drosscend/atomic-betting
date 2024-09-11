import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Cta() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{"Prêt à parier ?"}</h2>
            <p className="mx-auto max-w-[600px] text-gray-600 md:text-xl dark:text-gray-400">
              {"Inscrivez - vous maintenant et créez votre premier pari en quelques minutes."}
            </p>
          </div>
          <div className="w-full max-w-sm space-y-2">
            <form className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
              <Input className="max-w-lg flex-1" placeholder="Entrez votre email" type="email" />
              <Button type="submit">{"S'inscrire"}</Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
