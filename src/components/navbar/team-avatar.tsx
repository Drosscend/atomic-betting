import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function TeamAvatar({ teamId, teamName }: { teamId: string; teamName: string }) {
  return (
    <Avatar className="mr-2 size-5">
      <AvatarImage src={`https://avatar.vercel.sh/${teamId}.png`} alt={teamName} className="grayscale" />
      <AvatarFallback>{teamName[0]}</AvatarFallback>
    </Avatar>
  );
}
