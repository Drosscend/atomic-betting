import { Metadata } from "next";
import { GeneralSettings } from "./_components/general-settings";
import { NotificationSettings } from "./_components/notification-settings";
import { UserManagement } from "./_components/user-management";

export const metadata: Metadata = {
  title: "Tableau de bord - Administration",
  description: "Page d'administration du tableau de bord",
};

export default function AdminPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <h1 className="text-3xl font-bold tracking-tight">{"Administration de l'équipe"}</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-8">
          <GeneralSettings teamId={params.id} />
          <NotificationSettings teamId={params.id} />
        </div>
        <UserManagement teamId={params.id} />
      </div>
    </div>
  );
}
