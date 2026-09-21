import Link from "next/link";
import { ShieldCheck, Zap } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-[#011126] text-white">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-3 border-t border-cyan-200/10 px-4 py-4 text-[10px] text-white/48 md:flex-row md:items-center md:justify-between md:px-5">
        <div>
          <p>© {new Date().getFullYear()} Novidades.store. Todos os direitos reservados.</p>
          <p className="mt-1 text-[9px] text-white/34">
            Brasil: 69.093.616 MICAELA GOMES DE JESUS · CNPJ 69.093.616/0001-50
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <Link href="/termos" className="hover:text-cyan-300">Termos</Link>
          <Link href="/privacidade" className="hover:text-cyan-300">Privacidade</Link>
          <Link href="/cookies" className="hover:text-cyan-300">Cookies</Link>
          <Link href="/trocas-e-devolucoes" className="hover:text-cyan-300">Trocas e devoluções</Link>
          <span className="inline-flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            Compra segura
          </span>
          <span className="inline-flex items-center gap-1">
            <Zap className="h-3.5 w-3.5 text-cyan-300" />
            PIX via XPAYMENTS
          </span>
        </div>
      </div>
    </footer>
  );
}
