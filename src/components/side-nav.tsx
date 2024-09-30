"use client";

import { MenuIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SideNav({ navItems }: { navItems: { href: string; label: string }[] }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <Button variant="outline" size="icon" className="fixed left-4 top-20 z-40 lg:hidden" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        {isSidebarOpen ? <XIcon className="size-4" /> : <MenuIcon className="size-4" />}
      </Button>
      <nav
        className={cn(
          "bg-background fixed inset-y-16 left-0 z-30 w-64 -translate-x-full transition-transform duration-200 ease-in-out lg:static lg:translate-x-0",
          isSidebarOpen && "translate-x-0"
        )}
      >
        <div className="flex h-16 items-center border-b px-4">
          <h2 className="text-lg font-semibold">Administration</h2>
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
                onClick={() => setIsSidebarOpen(false)}
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
