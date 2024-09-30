"use client";

import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export function SideNav({ navItems }: { navItems: { href: string; label: string }[] }) {
  const pathname = usePathname();

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="fixed left-4 top-20 z-40 lg:hidden">
            <MenuIcon className="size-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0 lg:hidden">
          <nav className="h-full">
            <div className="flex h-16 items-center border-b px-4">
              <h2 className="text-lg font-semibold">{`Administration`}</h2>
            </div>
            <ul className="space-y-2 p-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "block rounded-lg px-3 py-2 text-sm font-medium",
                      pathname === item.href ? "bg-muted text-primary" : "text-muted-foreground hover:bg-muted hover:text-primary"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </SheetContent>
      </Sheet>
      <nav className="bg-background hidden w-64 lg:block">
        <div className="flex h-16 items-center border-b px-4">
          <h2 className="text-lg font-semibold">{`Administration`}</h2>
        </div>
        <ul className="space-y-2 p-4">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "block rounded-lg px-3 py-2 text-sm font-medium",
                  pathname === item.href ? "bg-muted text-primary" : "text-muted-foreground hover:bg-muted hover:text-primary"
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
