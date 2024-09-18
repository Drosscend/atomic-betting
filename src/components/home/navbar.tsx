import { AtomIcon, MenuIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { auth } from "@/lib/auth";

export async function Navbar() {
  const session = await auth();

  return (
    <header className="flex h-14 items-center justify-between px-4 lg:px-6">
      <Link className="flex items-center justify-center" href="/">
        <AtomIcon className="mr-2 size-6" />
        <span className="font-bold">Atomic Betting</span>
      </Link>
      <nav className="hidden gap-6 md:flex">
        <Link className="text-sm font-medium hover:underline" href="/features">
          {`Fonctionnalités`}
        </Link>
        <Link className="text-sm font-medium hover:underline" href="/faq">
          {`F.A.Q.`}
        </Link>
        <Link className="text-sm font-medium hover:underline" href="/about">
          {`À propos`}
        </Link>
        {session ? (
          <Link className="text-sm font-medium hover:underline" href="/team">
            {`Tableau de bord`}
          </Link>
        ) : (
          <Link className="text-sm font-medium hover:underline" href="/sign-in">
            {`Connexion`}
          </Link>
        )}
      </nav>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="md:hidden">
          <Button variant="ghost" size="icon">
            <MenuIcon className="size-5" />
            <span className="sr-only">{`Ouvrir le menu`}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link href="/features">{`Fonctionnalités`}</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/faq">{`F.A.Q.`}</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/about">{`À propos`}</Link>
          </DropdownMenuItem>
          {session ? (
            <DropdownMenuItem asChild>
              <Link href="/team">{`Tableau de bord`}</Link>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem asChild>
              <Link href="/sign-in">{`Connexion`}</Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
