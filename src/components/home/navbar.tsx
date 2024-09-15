import { AtomIcon } from "lucide-react";
import Link from "next/link";

export function Navbar() {
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
        {/*<Link className="text-sm font-medium underline-offset-4 hover:underline" href="#">*/}
        {/*  Tarifs*/}
        {/*</Link>*/}
        <Link className="text-sm font-medium underline-offset-4 hover:underline" href="/about">
          À propos
        </Link>
      </nav>
    </header>
  );
}
