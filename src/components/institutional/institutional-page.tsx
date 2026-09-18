import Link from "next/link";
import type { InstitutionalDocument } from "@/lib/institutional-content";

export function InstitutionalPage({
  document,
  updated = "18 de setembro de 2026",
}: {
  document: InstitutionalDocument;
  updated?: string;
}) {
  return (
    <article className="bg-[#f6f4ef]">
      <header className="border-b border-black/8 bg-white">
        <div className="mx-auto w-full max-w-[980px] px-5 py-12 md:px-8 md:py-16">
          <Link
            href="/"
            className="text-[12px] font-semibold text-brand-dark hover:underline"
          >
            ← Voltar para Novidades.store
          </Link>
          <p className="mt-9 text-[11px] font-bold tracking-[0.18em] text-brand-dark uppercase">
            {document.eyebrow}
          </p>
          <h1 className="mt-3 max-w-4xl font-editorial text-4xl leading-[1.02] font-semibold tracking-[-0.035em] text-[#171a17] md:text-6xl">
            {document.title}
          </h1>
          <p className="mt-5 max-w-3xl text-[15px] leading-7 text-[#646962] md:text-base">
            {document.intro}
          </p>
          <p className="mt-7 text-[10px] tracking-[0.08em] text-[#949991] uppercase">
            Atualizado em {updated}
          </p>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-[980px] gap-5 px-5 py-10 md:px-8 md:py-14">
        {document.sections.map((section, index) => (
          <section
            key={section.title}
            className="rounded-[18px] border border-black/7 bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,.035)] md:p-8"
          >
            <div className="flex gap-4">
              <span
                aria-hidden="true"
                className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#171a17] text-[10px] font-bold text-white"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <h2 className="text-xl font-bold tracking-[-0.02em] text-[#1b1f1b] md:text-2xl">
                  {section.title}
                </h2>

                {section.paragraphs?.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mt-4 text-[14px] leading-7 text-[#626761] md:text-[15px]"
                  >
                    {paragraph}
                  </p>
                ))}

                {section.bullets ? (
                  <ul className="mt-4 grid gap-2.5">
                    {section.bullets.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-[14px] leading-6 text-[#626761] md:text-[15px]"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          </section>
        ))}

        <aside className="rounded-[18px] bg-[#151918] p-6 text-white md:p-8">
          <p className="text-[11px] font-bold tracking-[0.14em] text-white/45 uppercase">
            Precisa de ajuda?
          </p>
          <h2 className="mt-2 text-2xl font-bold">Fale com a Novidades.store</h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-white/65">
            Brasil: suporte@novidades.store · +55 (62) 99190-3462
            <br />
            Internacional: support@novidades.store · +44 7451 214299
          </p>
          <Link
            href="/contato"
            className="mt-5 inline-flex h-11 items-center rounded-[10px] bg-brand px-5 text-sm font-bold text-white transition hover:bg-brand-dark"
          >
            Ver canais de contato
          </Link>
        </aside>
      </div>
    </article>
  );
}
