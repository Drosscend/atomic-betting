import type { Bet } from "@/app/dashboard/[id]/bets/[betId]/page";
import { format } from "date-fns/format";
import { fr } from "date-fns/locale";
import { IncrementNumber } from "@/components/increment-number";

export function BetInfo({ bet }: { bet: Bet }) {
  return (
    <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
      <div>
        <p className="text-sm font-medium">Date de début</p>
        <p className="text-muted-foreground text-sm">{format(new Date(bet.startDate), "dd MMMM yyyy à H:mm", { locale: fr })}</p>
      </div>
      <div>
        <p className="text-sm font-medium">Date de fin</p>
        <p className="text-muted-foreground text-sm">{format(new Date(bet.endDate), "dd MMMM yyyy à H:mm", { locale: fr })}</p>
      </div>
      <div>
        <p className="text-sm font-medium">Montant total des paris</p>
        <p className="text-muted-foreground text-sm">
          <IncrementNumber end={bet.totalBetAmount} duration={1000} /> A.c.
        </p>
      </div>
      <div>
        <p className="text-sm font-medium">Limites de pari</p>
        <p className="text-muted-foreground text-sm">
          Min: {bet.minBet} A.c. - Max: {bet.maxBet} A.c.
        </p>
      </div>
    </div>
  );
}
