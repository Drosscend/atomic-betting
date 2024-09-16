import { TeamAvatar } from "@/components/navbar/team-avatar";
import { SelectItem } from "@/components/ui/select";

export function TeamSelectItem({ team }: { team: { teamId: string; teamName: string } }) {
  return (
    <SelectItem key={team.teamId} value={team.teamId} className="cursor-pointer">
      <div className="flex items-center">
        <TeamAvatar teamId={team.teamId} teamName={team.teamName} />
        {team.teamName}
      </div>
    </SelectItem>
  );
}
