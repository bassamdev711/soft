"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink, ArrowUpRight } from "lucide-react";
import { SiteShell } from "@/components/SiteChrome";
import { trpc } from "@/lib/trpc";
import { featuredPortfolio, FeaturedPortfolioItem } from "@/content/portfolio";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

import { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "@/server/routers";

/* ─── Type union ─────────────────────────────────────────────── */
type RouterOutput = inferRouterOutputs<AppRouter>;
type TRPCPortfolioItem = RouterOutput["portfolio"]["listPublished"][number];
type AnyItem = FeaturedPortfolioItem | TRPCPortfolioItem;

/* ─── helpers ────────────────────────────────────────────────── */
function getGallery(item: AnyItem): string[] {
  return item.mediaUrls?.length
    ? item.mediaUrls
    : item.coverImageUrl ? [item.coverImageUrl] : [];
}
function getLiveUrl(item: AnyItem): string | undefined {
  return "liveUrl" in item ? (item.liveUrl ?? undefined) : undefined;
}

/* ═══════════════════════════════════════════════════════════════
   FEATURED CARD — large, full-width, editorial hero treatment
   Used for the first (most prominent) project.
═══════════════════════════════════════════════════════════════ */
function FeaturedCard({ item }: { item: AnyItem }) {
  const gallery = getGallery(item);
  const liveUrl = getLiveUrl(item);
  const [active, setActive] = useState(0);
  const ref = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = useCallback(() => {
    if (gallery.length <= 1) return;
    ref.current = setInterval(() => setActive(p => (p + 1) % gallery.length), 1000);
  }, [gallery.length]);

  const stop = useCallback(() => {
    if (ref.current) { clearInterval(ref.current); ref.current = null; }
    setActive(0);
  }, []);

  useEffect(() => () => stop(), [stop]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55 }}
      className="group relative grid overflow-hidden border border-[#2A2B2F] bg-[#161719] transition-colors duration-300 hover:border-[#C8A97E]/30 lg:grid-cols-[1.15fr_1fr]"
      onMouseEnter={start}
      onMouseLeave={stop}
    >
      {/* ── Image panel ── */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#1C1D20] lg:aspect-auto lg:min-h-[420px]">
        {gallery.map((src, i) => (
          <img
            key={src} src={src} alt=""
            loading={i === 0 ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={i === 0 ? "high" : "low"}
            className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-700 ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* dim overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-l from-[#161719] via-[#161719]/0 to-transparent opacity-0 lg:opacity-100" />

        {/* image counter */}
        {gallery.length > 1 && (
          <div className="absolute bottom-4 right-4 flex gap-1.5">
            {gallery.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-1 rounded-full transition-all duration-400 ${
                  i === active ? "w-6 bg-[#C8A97E]" : "w-1 bg-white/25"
                }`}
              />
            ))}
          </div>
        )}

        {/* live badge overlay */}
        {liveUrl && (
          <a
            href={liveUrl} target="_blank" rel="noreferrer noopener"
            onClick={e => e.stopPropagation()}
            className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-[#C8A97E]/30 bg-black/70 px-3 py-1.5 text-[11px] font-bold text-[#C8A97E] backdrop-blur-md transition-all hover:border-[#C8A97E]/60 hover:bg-black/90"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#C8A97E] opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#C8A97E]" />
            </span>
            معاينة حية
            <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>

      {/* ── Text panel ── */}
      <div className="flex flex-col justify-center p-8 lg:p-12">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[.18em] text-[#C8A97E]">
            {item.category ?? "مشروع"}
          </span>
          <span className="h-px flex-1 bg-[#2A2B2F]" />
          <span className="font-mono text-[10px] text-[#4A4B4E]">01</span>
        </div>

        <h2 className="mt-5 font-display text-[1.6rem] font-bold leading-[1.18] tracking-[-0.02em] text-[#F0F0F0] sm:text-3xl lg:text-[2rem]">
          {item.title}
        </h2>

        {item.excerpt && (
          <p className="mt-4 text-sm leading-[1.85] text-[#8A8B8E]">
            {item.excerpt}
          </p>
        )}

      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   STANDARD CARD — compact grid card
═══════════════════════════════════════════════════════════════ */
function ProjectCard({ item, index }: { item: AnyItem; index: number }) {
  const gallery = getGallery(item);
  const liveUrl = getLiveUrl(item);
  const [active, setActive] = useState(0);
  const ref = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = useCallback(() => {
    if (gallery.length <= 1) return;
    ref.current = setInterval(() => setActive(p => (p + 1) % gallery.length), 950);
  }, [gallery.length]);

  const stop = useCallback(() => {
    if (ref.current) { clearInterval(ref.current); ref.current = null; }
    setActive(0);
  }, []);

  useEffect(() => () => stop(), [stop]);

  /* serial number label */
  const serial = String(index + 2).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.45, delay: (index % 2) * 0.07 }}
      className="group relative flex flex-col overflow-hidden border border-[#2A2B2F] bg-[#161719] transition-colors duration-300 hover:border-[#C8A97E]/25"
      onMouseEnter={start}
      onMouseLeave={stop}
    >
      {/* ── Image ── */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#1C1D20]">
        {gallery.length > 0 ? (
          <>
            {gallery.map((src, i) => (
              <img
                key={src} src={src} alt=""
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
                className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-600 ${
                  i === active ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
            {/* subtle zoom on first image only */}
            <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.02]" />
          </>
        ) : (
          <div className="grid h-full place-items-center">
            <span className="font-mono text-xs text-[#2A2B2F]">no preview</span>
          </div>
        )}

        {/* Top bar: serial + live badge */}
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
          <span className="font-mono text-[10px] font-semibold text-white/30">{serial}</span>
          {liveUrl && (
            <a
              href={liveUrl} target="_blank" rel="noreferrer noopener"
              onClick={e => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/65 px-2.5 py-1 text-[10px] font-bold text-white/70 backdrop-blur-md transition-all duration-300 hover:border-[#C8A97E]/50 hover:text-[#C8A97E] lg:translate-y-1 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#C8A97E] opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#C8A97E]" />
              </span>
              معاينة حية
              <ArrowUpRight className="h-3 w-3" />
            </a>
          )}
        </div>

        {/* Dot progress — bottom */}
        {gallery.length > 1 && (
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {gallery.map((_, i) => (
              <span key={i} className={`h-1 rounded-full transition-all duration-350 ${
                i === active ? "w-5 bg-white" : "w-1 bg-white/30"
              }`} />
            ))}
          </div>
        )}
      </div>

      {/* ── Content ── */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[.16em] text-[#C8A97E]">
          {item.service ?? item.category ?? "حل رقمي"}
        </p>
        <h2 className="mt-3 font-display text-[1.05rem] font-bold leading-snug tracking-[-0.01em] text-[#F0F0F0]">
          <Link href={`/work/${item.slug}`} className="transition-colors hover:text-[#C8A97E]">
            {item.title}
          </Link>
        </h2>
        {item.excerpt && (
          <p className="mt-2.5 line-clamp-2 text-xs leading-[1.8] text-[#8A8B8E]">
            {item.excerpt}
          </p>
        )}

      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════ */
export default function Work() {
  const portfolio = trpc.portfolio.listPublished.useQuery();

  const allItems: AnyItem[] = [
    ...featuredPortfolio,
    ...(portfolio.data ?? []).filter(
      item => !featuredPortfolio.some(f => f.slug === item.slug),
    ),
  ];

  const [featured, ...rest] = allItems;

  return (
    <SiteShell>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-[#2A2B2F] bg-[#0E0F11]">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 60% 55% at 90% 0%, rgba(200,169,126,.06), transparent 60%)" }}
        />

        <div className="container relative py-14 sm:py-20 lg:py-24">
          <div className="flex flex-col">
            {/* Heading block */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
            >
              {/* slim top label */}
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[#C8A97E]/40" />
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[.2em] text-[#C8A97E]/70">
                  معرض الأعمال
                </span>
              </div>

              <h1
                className="mt-5 font-display font-bold leading-[1.1] tracking-[-0.025em] text-[#F0F0F0]"
                style={{ fontSize: "clamp(2rem, 5.5vw, 3.25rem)" }}
              >
                حلول رقمية،
                <br />
                <span className="text-[#8A8B8E]">منصات ومواقع إلكترونية.</span>
              </h1>

              <p className="mt-5 max-w-xl text-[0.9rem] leading-[1.9] text-[#8A8B8E]">
                نستعرض هنا مجموعة من المشاريع التي قمنا بتطويرها، من المتاجر الإلكترونية إلى المنصات الخدمية والأنظمة الخاصة.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Projects ── */}
      <section className="bg-[#0E0F11] py-14 sm:py-20">
        <div className="container space-y-5">

          {/* Featured — full width */}
          {featured && <FeaturedCard item={featured} />}

          {/* Rest — 2-column grid */}
          {rest.length > 0 && (
            <div className="grid gap-5 sm:grid-cols-2">
              {rest.map((item, i) => (
                <ProjectCard key={item.id} item={item} index={i} />
              ))}
            </div>
          )}

          {allItems.length === 0 && (
            <div className="border border-[#2A2B2F] bg-[#161719] p-12 text-center text-sm text-[#8A8B8E]">
              لا توجد مشاريع منشورة حاليًا.
            </div>
          )}
        </div>
      </section>

      {/* ── CTA strip ── */}
      <section className="border-t border-[#2A2B2F] bg-[#0E0F11] py-16">
        <div className="container flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[.18em] text-[#C8A97E]">التالي</p>
            <p className="mt-3 max-w-md text-xl font-semibold text-[#F0F0F0]">
              مشروعك القادم يستحق نفس الاهتمام.
            </p>
          </div>
          <Link
            href="/request"
            className="inline-flex shrink-0 items-center gap-2.5 rounded-sm border border-[#C8A97E]/40 bg-[#C8A97E]/10 px-6 py-3 text-sm font-bold text-[#C8A97E] transition-all hover:border-[#C8A97E]/70 hover:bg-[#C8A97E]/18"
          >
            ابدأ مشروعك <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
      </section>

    </SiteShell>
  );
}
