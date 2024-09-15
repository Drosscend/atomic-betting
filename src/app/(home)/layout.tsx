import type { ReactNode } from "react";
import { Footer } from "@/components/home/footer";
import { Navbar } from "@/components/home/navbar";

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
