import { EditBetButton } from "@/app/(secure)/team/[id]/admin/bets/_components/edit-bet-button";
import { betSchema } from "@/app/(secure)/team/[id]/admin/bets/bet.schema";
import { isAfter } from "date-fns";
import { format } from "date-fns/format";
import { fr } from "date-fns/locale";
import { CalendarIcon, CheckCircleIcon, EditIcon } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BetCardProps {
  bet: z.infer<typeof betSchema>;
}

export function BetCard({ bet }: BetCardProps) {
  const hasStarted = isAfter(new Date(), new Date(bet.startDate));
  const hasEnded = isAfter(new Date(), new Date(bet.endDate));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{bet.question}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <CalendarIcon className="size-4" />
          <span>
            {format(new Date(bet.startDate), "dd/MM/yyyy", { locale: fr })} - {format(new Date(bet.endDate), "dd/MM/yyyy", { locale: fr })}
          </span>
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          {!hasStarted && <EditBetButton bet={bet} />}
          {hasEnded && (
            <Button variant="outline" size="sm">
              <EditIcon className="mr-2 size-4" />
              Définir la réponse
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
