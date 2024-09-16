import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { UserNav } from "@/components/navbar/user-nav";
import { auth } from "@/lib/auth";

export default async function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const session = await auth();

  if (!session) redirect("/sign-in");

  return (
    <SessionProvider>
      <main>{children}</main>
      <Toaster />
    </SessionProvider>
  );
}