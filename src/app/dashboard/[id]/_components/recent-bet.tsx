import { CheckIcon, XIcon } from "lucide-react";
import { IncrementNumber } from "@/components/increment-number";

const recentBets = [
  {
    name: "Qui va arriver en retard ?",
    yourChoice: "Jonathan",
    correctChoice: "Jonathan",
    newBalance: -300,
  },
  {
    name: "Qui va gagner le match ?",
    yourChoice: "Équipe A",
    correctChoice: "Équipe B",
    newBalance: -500,
  },
  {
    name: "Quelle sera la météo demain ?",
    yourChoice: "Ensoleillé",
    correctChoice: "Ensoleillé",
    newBalance: 200,
  },
  {
    name: "Quelle sera la météo demain ?",
    yourChoice: "Ensoleillé",
    correctChoice: "Ensoleillé",
    newBalance: 200,
  },
  {
    name: "Quelle sera la météo demain ?",
    yourChoice: "Ensoleillé",
    correctChoice: "Ensoleillé",
    newBalance: 200,
  },
];

export function RecentBet() {
  if (recentBets.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground text-center">Aucun pari récent disponible</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {recentBets.map((bet, index) => (
        <div key={index} className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">{bet.name}</p>
            <p className="text-muted-foreground text-xs">Votre choix: {bet.yourChoice}</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className={`font-medium ${bet.newBalance >= 0 ? "text-green-500" : "text-red-500"}`}>
              {bet.newBalance >= 0 ? "+" : ""}
              <IncrementNumber end={bet.newBalance} duration={1000} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
