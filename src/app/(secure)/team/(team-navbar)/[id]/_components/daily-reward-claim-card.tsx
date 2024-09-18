"use client";

import { claimDailyReward } from "@/app/(secure)/team/(team-navbar)/[id]/claim-daily-reward";
import { DailyRewardInput } from "@/validations/daily-reward.schema";
import type { TeamMembership } from "@prisma/client";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { GiftIcon } from "lucide-react";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import { useConfetti } from "@/components/confetti";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type DailyRewardClaimProps = {
  teamId: string;
  membership: TeamMembership;
};

export function DailyRewardClaimCard({ teamId, membership }: DailyRewardClaimProps) {
  const { showConfetti } = useConfetti();
  const lastClaimDate = membership.lastDailyReward;
  const consecutiveDays = membership.consecutiveDays;

  const { execute, isExecuting } = useAction(claimDailyReward, {
    onSuccess: (result) => {
      if (result.data && result.data.success) {
        toast(result.data.message);
        showConfetti(3000);
      } else {
        toast(`Une erreur est survenue : ${result.data?.message || "Erreur inconnue"}`);
      }
    },
    onError: ({ error }) => {
      toast(`Une erreur est survenue : ${error.serverError || "Erreur inconnue"}`);
    },
  });

  const onClaim = () => {
    const data: DailyRewardInput = { teamId };
    execute(data);
  };

  const canClaim = !lastClaimDate || new Date().getDate() !== lastClaimDate.getDate();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{`Récompense quotidienne`}</CardTitle>
        <GiftIcon className="text-muted-foreground size-4" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{`${consecutiveDays} Jours consécutifs`}</div>
        <div className="mt-2 flex items-start justify-between">
          <div className="text-muted-foreground text-xs">
            <p>{`Dernière réclamation : ${lastClaimDate ? format(lastClaimDate, "dd MMMM yyyy", { locale: fr }) : "Jamais"}`}</p>
          </div>
          <Button onClick={onClaim} size="sm" disabled={isExecuting || !canClaim} className="ml-2">
            <GiftIcon className="mr-1 size-4" />
            {isExecuting ? `...` : canClaim ? `Réclamer` : `Réclamé`}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
