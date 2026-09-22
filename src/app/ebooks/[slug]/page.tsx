import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  Check,
  Clock3,
  Layers3,
  ShieldCheck,
} from "lucide-react";
import { EbookCheckout } from "@/components/ebooks/ebook-checkout";
import { EBOOKS, getEbook } from "@/lib/ebooks";

type Props = {
  params: Promise<{ slug: string }>;
};

function money(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function generateStaticParams() {
  return EBOOKS.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getEbook(slug);
  if (!item) return {};

  return {
    title: item.title,
    description: item.description,
    alternates: { canonical: `https://novidades.store/ebooks/${item.slug}` },
    robots: item.status === "live" ? undefined : { index: true, follow: true },
  };
}

export default async function EbookProductPage({ params }: Props) {
  const { slug } = await params;
  const item = getEbook(slug);
  if (!item) notFound();

  const included = (item.includedSlugs ?? [])
    .map((includedSlug) => getEbook(includedSlug))
    .filter(Boolean);

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-950">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1180px] px-4 py-5 md:px-6">
          <Link
            href="/ebooks"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            E-Books
          </Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1180px] gap-8 px-4 py-9 md:px-6 lg:grid-cols-[.85fr_1.15fr] lg:py-14">
        <div>
          <div
            className={`relative mx-auto aspect-[4/5] max-w-[390px] overflow-hidden rounded-[28px] bg-gradient-to-br ${item.coverTone} p-8 text-white shadow-[0_30px_80px_rgba(15,23,42,.28)]`}
          >
            <div className="absolute inset-y-0 left-6 w-px bg-white/18" />
            <span className="text-[11px] font-black uppercase tracking-[0.18em] text-white/70">
              Novidades · {item.kind === "pack" ? "Pack Digital" : "E-Book"}
            </span>
            <h1 className="mt-16 text-4xl font-black leading-[.98] tracking-[-0.055em]">
              {item.title}
            </h1>
            <p className="mt-5 max-w-[85%] text-sm leading-6 text-white/75">
              {item.subtitle}
            </p>
            {item.kind === "pack" ? (
              <Layers3 className="absolute bottom-8 right-8 h-10 w-10 text-white/55" />
            ) : (
              <BookOpen className="absolute bottom-8 right-8 h-10 w-10 text-white/55" />
            )}
          </div>
        </div>

        <div className="lg:pt-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-blue-100 px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-blue-800">
              {item.category}
            </span>
            {item.status === "live" ? (
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-emerald-800">
                Disponível
              </span>
            ) : (
              <span className="rounded-full bg-amber-100 px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-amber-900">
                Em preparação
              </span>
            )}
          </div>

          <h2 className="mt-5 text-4xl font-black tracking-[-0.05em] md:text-5xl">
            {item.title}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            {item.description}
          </p>

          <div className="mt-7 flex items-end gap-3">
            <span className="text-4xl font-black">{money(item.price)}</span>
            {item.compareAt ? (
              <span className="pb-1 text-base text-slate-400 line-through">
                {money(item.compareAt)}
              </span>
            ) : null}
          </div>
          <p className="mt-1 text-xs font-semibold text-slate-500">
            Pagamento único · produto digital
          </p>

          <div className="mt-7 max-w-xl">
            <EbookCheckout
              productSlug={item.slug}
              productTitle={item.kind === "pack" ? "este pack" : "este E-Book"}
              status={item.status}
            />
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {item.highlights.map((highlight) => (
              <div key={highlight} className="rounded-xl border border-slate-200 bg-white p-3">
                <Check className="h-4 w-4 text-emerald-600" />
                <p className="mt-2 text-xs font-bold leading-5 text-slate-700">{highlight}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-[1180px] gap-8 px-4 py-10 md:px-6 lg:grid-cols-2">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.14em] text-blue-700">
              Conteúdo
            </p>
            <h2 className="mt-1 text-2xl font-black tracking-tight">
              O que encontra nesta edição
            </h2>
            <div className="mt-5 grid gap-2">
              {item.chapters.map((chapter, index) => (
                <div key={chapter} className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-slate-900 text-[10px] font-black text-white">
                    {index + 1}
                  </span>
                  <span className="text-sm font-bold text-slate-700">{chapter}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            {item.kind === "pack" && included.length ? (
              <>
                <p className="text-xs font-black uppercase tracking-[0.14em] text-blue-700">
                  Incluído no pack
                </p>
                <h2 className="mt-1 text-2xl font-black tracking-tight">
                  Uma compra, vários títulos
                </h2>
                <div className="mt-5 grid gap-3">
                  {included.map((book) =>
                    book ? (
                      <div key={book.slug} className="rounded-xl border border-slate-200 p-4">
                        <p className="font-black">{book.title}</p>
                        <p className="mt-1 text-xs leading-5 text-slate-500">{book.subtitle}</p>
                      </div>
                    ) : null,
                  )}
                </div>
              </>
            ) : (
              <>
                <p className="text-xs font-black uppercase tracking-[0.14em] text-blue-700">
                  Entrega
                </p>
                <h2 className="mt-1 text-2xl font-black tracking-tight">
                  Acesso condicionado ao pagamento confirmado
                </h2>
                <div className="mt-5 space-y-3 text-sm leading-6 text-slate-600">
                  <p className="flex gap-3">
                    <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-emerald-600" />
                    O checkout não confia em preços enviados pelo navegador: o valor é lido do catálogo publicado no servidor.
                  </p>
                  <p className="flex gap-3">
                    <Clock3 className="mt-1 h-5 w-5 shrink-0 text-blue-600" />
                    Depois da confirmação, a compra gera entitlement digital e libera a leitura protegida e, quando disponível, downloads privados.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[900px] px-4 py-10 text-center md:px-6">
        <h2 className="text-2xl font-black">Informação editorial</h2>
        <p className="mt-3 text-sm leading-6 text-slate-500">
          Os títulos desta biblioteca são selecionados a partir de materiais licenciados.
          Conteúdos médicos, clínicos, legais, financeiros de alto risco ou tecnicamente
          ultrapassados não são ativados para venda sem revisão adicional.
        </p>
      </section>
    </main>
  );
}
