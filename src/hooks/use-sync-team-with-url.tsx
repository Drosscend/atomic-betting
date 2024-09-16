import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function useSyncTeamWithUrl(selectedTeamId: string | null, setSelectedTeamId: (teamId: string) => void) {
  const pathname = usePathname();

  useEffect(() => {
    const teamId = pathname.split("/")[2];
    if (teamId && teamId !== selectedTeamId) {
      setSelectedTeamId(teamId);
    }
  }, [pathname, selectedTeamId, setSelectedTeamId]);
}
