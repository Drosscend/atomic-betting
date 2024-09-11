import Link from "next/link";

export function Footer() {
  return (
    <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
      <p className="text-xs text-gray-500">{"© 2024 Atomic Betting. Tous droits réservés."}</p>
      <nav className="flex gap-4 sm:ml-auto sm:gap-6">
        <Link className="text-xs underline-offset-4 hover:underline" href="#">
          {"Conditions d'utilisation"}
        </Link>
        <Link className="text-xs underline-offset-4 hover:underline" href="#">
          {"Politique de confidentialité"}
        </Link>
      </nav>
    </footer>
  );
}
