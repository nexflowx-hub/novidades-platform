"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUI } from "@/lib/store/ui";
import { Heart, Package, ShieldCheck } from "lucide-react";

export function AccountDialog() {
  const open = useUI((s) => s.accountOpen);
  const close = useUI((s) => s.closeAccount);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    close();
    toast.info("Contas em breve", {
      description:
        "A autenticação será ativada na Fase 2. Seus favoritos e carrinho já ficam salvos neste dispositivo.",
    });
    setEmail("");
    setPassword("");
  };

  return (
    <Dialog open={open} onOpenChange={(o) => (!o ? close() : undefined)}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-extrabold">
            Entrar na Novidades.store
          </DialogTitle>
          <DialogDescription>
            Acesse sua conta para acompanhar pedidos e favoritos.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="account-email">E-mail</Label>
            <Input
              id="account-email"
              type="email"
              required
              placeholder="voce@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="account-password">Senha</Label>
            <Input
              id="account-password"
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          <Button type="submit" className="h-11 w-full bg-brand font-bold hover:bg-brand-dark">
            Entrar
          </Button>
        </form>

        <div className="rounded-xl bg-soft p-4">
          <p className="mb-2 text-xs font-bold tracking-wider text-muted-foreground uppercase">
            Em breve na sua conta
          </p>
          <ul className="space-y-1.5 text-[13px] text-muted-foreground">
            <li className="flex items-center gap-2">
              <Package className="h-4 w-4 shrink-0 text-brand-dark" aria-hidden="true" />
              Histórico de pedidos entre storefronts
            </li>
            <li className="flex items-center gap-2">
              <Heart className="h-4 w-4 shrink-0 text-brand-dark" aria-hidden="true" />
              Favoritos sincronizados entre dispositivos
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 shrink-0 text-brand-dark" aria-hidden="true" />
              Compra protegida em todos os ecossistemas
            </li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}
