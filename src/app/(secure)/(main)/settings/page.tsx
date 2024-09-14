import { DeleteAccountForm } from "@/app/(secure)/(main)/settings/_components/delete-account-form";
import { UpdateUsernameForm } from "@/app/(secure)/(main)/settings/_components/update-username-form";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export const metadata: Metadata = { title: "Paramètres", description: "Page des paramètres de l'utilisateur" };

export default async function Page() {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    redirect("/sign-in?callbackUrl=/settings");
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">{`Paramètres`}</h1>
      <div className="space-y-6">
        <UpdateUsernameForm user={user} />
        <DeleteAccountForm />
      </div>
    </div>
  );
}
