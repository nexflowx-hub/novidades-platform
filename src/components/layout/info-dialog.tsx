"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUI } from "@/lib/store/ui";

/** Diálogo informativo genérico (pências legais em construção, avisos, etc). */
export function InfoDialog() {
  const info = useUI((s) => s.info);
  const close = useUI((s) => s.closeInfo);

  return (
    <Dialog open={Boolean(info)} onOpenChange={(o) => (!o ? close() : undefined)}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-extrabold">{info?.title}</DialogTitle>
          <DialogDescription className="text-sm leading-relaxed">
            {info?.message}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
