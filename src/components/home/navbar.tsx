import { AtomIcon } from "lucide-react";
import Link from "next/link";
import { auth } from "@/lib/auth";

export async function Navbar() {
  const session = await auth();
  return (
    <header className="flex h-14 items-center justify-between px-4 lg:px-6">
      <Link className="flex items-center justify-center" href="/">
        <AtomIcon className="mr-2 size-6" />
        <span className="font-bold">Atomic Betting</span>
      </Link>
      <nav className="flex gap-4 sm:gap-6">
        <Link className="text-sm font-medium underline-offset-4 hover:underline" href="/features">
          Fonctionnalités
        </Link>
        <Link className="text-sm font-medium underline-offset-4 hover:underline" href="/faq">
          F.A.Q.
        </Link>
        <Link className="text-sm font-medium underline-offset-4 hover:underline" href="/about">
          À propos
        </Link>
        {session ? (
          <Link className="text-sm font-medium underline-offset-4 hover:underline" href="/team">
            Tableau de bord
          </Link>
        ) : (
          <Link className="text-sm font-medium underline-offset-4 hover:underline" href="/sign-in">
            Connexion
          </Link>
        )}
      </nav>
    </header>
  );
}
