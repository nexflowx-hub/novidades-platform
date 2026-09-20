import Link from "next/link";
import { Building2, ShieldCheck, Sparkles, Zap } from "lucide-react";

const LINK_GROUPS = [
  {
    title: "Explorar",
    links: [
      { label: "Início", href: "/" },
      { label: "Academia Digital", href: "/conteudos-digitais" },
      { label: "Ofertas & Descobertas", href: "/#destaques" },
      { label: "Categorias", href: "/#categorias" },
    ],
  },
  {
    title: "Ajuda",
    links: [
      { label: "Central de Ajuda", href: "/ajuda" },
      { label: "Entregas", href: "/entregas" },
      { label: "Pagamentos", href: "/pagamentos" },
      { label: "Trocas e devoluções", href: "/trocas-e-devolucoes" },
      { label: "Cancelamentos", href: "/cancelamentos" },
      { label: "Contato", href: "/contato" },
    ],
  },
  {
    title: "Institucional",
    links: [
      { label: "Sobre", href: "/sobre" },
      { label: "Informações legais", href: "/informacoes-legais" },
      { label: "Termos", href: "/termos" },
      { label: "Privacidade", href: "/privacidade" },
      { label: "Cookies", href: "/cookies" },
      { label: "Direitos de privacidade", href: "/direitos-de-privacidade" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-[#021126] pb-24 text-white lg:pb-0">
      <div className="mx-auto w-full max-w-[1440px] px-4 pt-12 md:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.55fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-block">
              <p className="text-2xl font-black tracking-[-.04em]">
                Novidades<span className="text-cyan-300">.store</span>
              </p>
              <p className="mt-1.5 text-[13px] font-semibold text-white/62">
                Mais do que você procura.
              </p>
              <p className="mt-1 text-[11px] text-cyan-200/70">
                Todo dia, uma boa descoberta.
              </p>
            </Link>

            <div className="mt-5 space-y-2.5 text-xs text-white/52">
              <p className="flex items-start gap-2">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" aria-hidden="true" />
                Variedade com curadoria, informação e identidade própria.
              </p>
              <p className="flex items-start gap-2">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
                Vendedor, moeda e condições identificados antes do pagamento.
              </p>
              <p className="flex items-start gap-2">
                <Zap className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" aria-hidden="true" />
                Brasil: PIX via XPAYMENTS · Store NOVIDADES-BRL.
              </p>
              <p className="flex items-start gap-2">
                <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-white/55" aria-hidden="true" />
                NOVIDADES.STORE · CNPJ 69.093.616/0001-50
              </p>
            </div>
          </div>

          {LINK_GROUPS.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h3 className="text-[11px] font-bold tracking-wider text-cyan-200/55 uppercase">
                {group.title}
              </h3>
              <ul className="mt-3.5 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-white/70 transition-colors hover:text-cyan-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-10 grid gap-4 border-t border-white/10 py-6 text-[11px] text-white/40 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p>© {new Date().getFullYear()} Novidades.store. Todos os direitos reservados.</p>
            <p className="mt-1">
              Brasil: 69.093.616 MICAELA GOMES DE JESUS · CNPJ 69.093.616/0001-50
            </p>
            <p className="mt-1">
              Internacional: MGJ EXPERT LTD · Company No. 17422467
            </p>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2 md:justify-end">
            <Link href="/cookies" className="hover:text-white">
              Preferências de cookies
            </Link>
            <span>Brasil · BRL</span>
            <span>English / EUR em preparação</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
