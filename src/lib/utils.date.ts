import { formatDistance } from "date-fns";
import { fr } from "date-fns/locale";

export function formatTimeLeft(endDate: Date) {
  const now = new Date();
  if (now > endDate) return "Expiré";
  return formatDistance(endDate, now, { locale: fr, addSuffix: true });
}
