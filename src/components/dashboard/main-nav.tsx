import Link from "next/link";
import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function MainNav({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <Link href="/dashboard" className="hover:text-primary text-sm font-medium transition-colors">
        Dashboard
      </Link>
    </nav>
  );
}
