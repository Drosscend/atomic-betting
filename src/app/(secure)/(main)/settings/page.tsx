import type { Metadata } from "next";

export const metadata: Metadata = { title: "Settings", description: "Settings page" };

export default async function Page() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">{"Paramètres"}</h1>
    </div>
  );
}
