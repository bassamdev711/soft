"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { SiteShell } from "@/components/SiteChrome";
import { trpc } from "@/lib/trpc";
import { getFeaturedPortfolioBySlug } from "@/content/portfolio";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PortfolioImage } from "@/components/PortfolioImage";

export default function WorkDetail() {
  const params = useParams<{ slug: string }>();
  const [activeIndex, setActiveIndex] = useState(0);
  const featuredWork = getFeaturedPortfolioBySlug(params.slug);
  const item = trpc.portfolio.bySlug.useQuery(
    { slug: params.slug },
    { enabled: !featuredWork },
  );

  useEffect(() => {
    setActiveIndex(0);
  }, [params.slug]);

  if (!featuredWork && item.isLoading) {
    return <SiteShell><div className="container grid min-h-[60vh] place-items-center py-20 text-muted-foreground">جارٍ تحميل دراسة الحالة...</div></SiteShell>;
  }

  const work = featuredWork ?? item.data;
  if (!work) {
    return <SiteShell><div className="container grid min-h-[60vh] place-items-center py-20 text-center"><div><p className="eyebrow">العمل غير موجود</p><h1 className="display mt-5 text-4xl text-white">هذه الحالة غير متاحة حاليًا.</h1><Link href="/work" className="button-primary mt-8">العودة إلى الأعمال <ArrowLeft className="h-4 w-4" /></Link></div></div></SiteShell>;
  }

  const labels = "mediaLabels" in work ? work.mediaLabels : undefined;
  const gallery = work.mediaUrls?.length ? work.mediaUrls : work.coverImageUrl ? [work.coverImageUrl] : [];
  const selectedIndex = Math.min(activeIndex, Math.max(gallery.length - 1, 0));
  const selectedImage = gallery[selectedIndex];
  const selectedLabel = labels?.[selectedIndex] ?? `لقطة ${selectedIndex + 1}`;

  return (
    <SiteShell>
      <section className="relative overflow-hidden border-b border-white/10 bg-[#08111f]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(88,120,255,.14),transparent_34%),radial-gradient(circle_at_90%_80%,rgba(45,212,191,.08),transparent_30%)]" />
        <div className="container relative py-12 sm:py-16 lg:py-20">
          <div className="mb-8 flex items-center justify-between gap-4 text-sm text-slate-400">
            <Link href="/work" className="inline-flex items-center gap-2 font-bold transition hover:text-white"><ArrowRight className="h-4 w-4" /> الأعمال</Link>
            <span className="text-xs font-bold uppercase tracking-[.24em] text-indigo-300">ORA / Case study</span>
          </div>
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_.9fr] lg:gap-12">
            <div className="max-w-2xl">
              <p className="eyebrow text-indigo-300">{work.category ?? "دراسة حالة"}</p>
              <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold leading-[1.12] text-white sm:text-5xl lg:text-6xl">{work.title}</h1>
              <p className="mt-5 max-w-xl text-base leading-8 text-slate-300">{work.excerpt}</p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                {"liveUrl" in work && work.liveUrl && <a href={work.liveUrl} target="_blank" rel="noreferrer" aria-label="معاينة الموقع الحي" title="معاينة الموقع الحي" className="inline-flex items-center gap-2 rounded-full border border-indigo-300/40 px-4 py-2 text-sm font-bold text-indigo-200 transition hover:border-indigo-200 hover:bg-indigo-300/10 hover:text-white"><ExternalLink className="h-4 w-4" aria-hidden="true" /> معاينة الموقع</a>}
              </div>
            </div>
            {selectedImage && <div className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-950/70 shadow-2xl shadow-black/20"><PortfolioImage src={selectedImage} alt={selectedLabel} sizes="(max-width: 1023px) 100vw, 45vw" priority className="object-cover object-top" /></div>}
          </div>
        </div>
      </section>

      <section className="container py-12 sm:py-16 lg:py-20">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div><p className="eyebrow text-indigo-300">توثيق المشروع</p><h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">شاهد الواجهة التي تهمك.</h2></div>
          <p className="max-w-sm text-sm leading-7 text-slate-400">اختر تبويبًا واحدًا، وستتبدل الصورة مباشرة.</p>
        </div>

        {gallery.length > 0 && <div className="mt-7">
          <div role="tablist" aria-label="أقسام توثيق المشروع" className="flex gap-2 overflow-x-auto pb-2">
            {gallery.map((url, index) => {
              const label = labels?.[index] ?? `لقطة ${index + 1}`;
              const isActive = index === selectedIndex;
              return <button key={url} type="button" role="tab" aria-selected={isActive} onClick={() => setActiveIndex(index)} className={`shrink-0 rounded-full border px-4 py-2.5 text-sm font-bold transition ${isActive ? "border-indigo-300 bg-indigo-300 text-[#08111f]" : "border-white/10 bg-white/[.03] text-slate-300 hover:border-indigo-300/50 hover:text-white"}`}>{label}</button>;
            })}
          </div>

          <figure className="mt-4 overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#08111f]">
            <div className="flex min-h-[18rem] items-center justify-center bg-[#07101c] p-3 sm:min-h-[28rem] lg:min-h-[34rem]">
              {selectedImage && <div className="relative h-[18rem] w-full sm:h-[28rem] lg:h-[34rem]"><PortfolioImage src={selectedImage} alt={selectedLabel} sizes="(max-width: 639px) 100vw, 90vw" className="object-contain" /></div>}
            </div>
            <figcaption className="border-t border-white/10 px-5 py-4 text-sm font-bold text-slate-200">{selectedLabel}</figcaption>
          </figure>
        </div>}
      </section>
    </SiteShell>
  );
}
