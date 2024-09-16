import { DeleteAccountForm } from "@/app/(secure)/(main)/settings/_components/delete-account-form";
import { UpdateUsernameForm } from "@/app/(secure)/(main)/settings/_components/update-username-form";
import { UserSessions } from "@/app/(secure)/(main)/settings/_components/user-sessions";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getUserById } from "@/lib/database/user";

export const metadata: Metadata = { title: "Paramètres", description: "Page des paramètres de l'utilisateur" };

export default async function Page() {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/sign-in?callbackUrl=/settings");
  }

  const user = await getUserById(session?.user.id);

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">{`Paramètres`}</h1>
      <div className="space-y-6">
        <UpdateUsernameForm user={user} />
        <UserSessions sessions={user?.sessions || []} currentSessionId={session.id} />
        <DeleteAccountForm />
      </div>
    </div>
  );
}
