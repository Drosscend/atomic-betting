import { NotificationSettings } from "@/app/(secure)/team/[id]/admin/_components/notification-settings";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Administration - Notifications",
  description: "Gérez les paramètres de notification de votre équipe",
};

export default function NotificationsPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <h1 className="mb-6 text-3xl font-bold">Paramètres de notification</h1>
      <NotificationSettings teamId={params.id} />
    </div>
  );
}
