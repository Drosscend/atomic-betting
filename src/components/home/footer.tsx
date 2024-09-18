import Link from "next/link";

export function Footer() {
  return (
    <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
      <p className="text-center text-xs text-gray-500 sm:text-left">{`© 2024 Atomic Betting. Tous droits réservés.`}</p>
      <nav className="mt-2 flex gap-4 sm:ml-auto sm:mt-0 sm:gap-6">
        <Link className="text-xs hover:underline" href="/policies/terms">
          {`Conditions d'utilisation`}
        </Link>
        <Link className="text-xs hover:underline" href="/policies/privacy">
          {`Politique de confidentialité`}
        </Link>
      </nav>
    </footer>
  );
}
