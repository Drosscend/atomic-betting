import type { ReactNode } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface TeamDialodProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

export function TeamDialog({ isOpen, onOpenChange, children }: TeamDialodProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTrigger asChild>{children}</DialogTrigger>
      </DialogContent>
    </Dialog>
  );
}
