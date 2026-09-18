import Link from "next/link";
import { Building2, ShieldCheck, Zap } from "lucide-react";

const LINK_GROUPS = [
  {
    title: "Comprar",
    links: [
      { label: "Início", href: "/" },
      { label: "Arte & Vida", href: "/#destaques" },
      { label: "Presentes", href: "/#presentes" },
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
    <footer className="mt-auto bg-header pb-24 text-white lg:pb-0">
      <div className="mx-auto w-full max-w-[1440px] px-4 pt-12 md:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-block">
              <p className="text-xl font-extrabold tracking-tight">
                NOVIDADES<span className="text-brand">.store</span>
              </p>
              <p className="mt-1.5 text-[13px] text-white/60">
                Todo dia, uma boa descoberta.
              </p>
            </Link>

            <div className="mt-5 space-y-2.5 text-xs text-white/55">
              <p className="flex items-start gap-2">
                <ShieldCheck
                  className="mt-0.5 h-4 w-4 shrink-0 text-success"
                  aria-hidden="true"
                />
                Vendedor, moeda e condições identificados antes do pagamento.
              </p>
              <p className="flex items-start gap-2">
                <Zap
                  className="mt-0.5 h-4 w-4 shrink-0 text-brand"
                  aria-hidden="true"
                />
                Brasil: PIX via XPAYMENTS · Store NOVIDADES-BRL.
              </p>
              <p className="flex items-start gap-2">
                <Building2
                  className="mt-0.5 h-4 w-4 shrink-0 text-white/55"
                  aria-hidden="true"
                />
                NOVIDADES.STORE · CNPJ 69.093.616/0001-50
              </p>
            </div>
          </div>

          {LINK_GROUPS.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h3 className="text-[11px] font-bold tracking-wider text-white/40 uppercase">
                {group.title}
              </h3>
              <ul className="mt-3.5 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-white/75 transition-colors hover:text-brand"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-10 grid gap-4 border-t border-white/10 py-6 text-[11px] text-white/45 md:grid-cols-[1fr_auto] md:items-end">
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
