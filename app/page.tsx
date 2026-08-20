"use client";

import Link from "next/link";
import { ArrowLeft, BriefcaseBusiness, ExternalLink } from "lucide-react";
import { CTASection, FaqList, ServiceCard } from "@/components/ContentBlocks";
import { SiteShell } from "@/components/SiteChrome";
import { services, workSteps } from "@/content/site";
import { trpc } from "@/lib/trpc";
import { motion } from "framer-motion";
import { featuredPortfolio } from "@/content/portfolio";

/* ═══════════════════════════════════════════════════════
   PRODUCT INTERFACE MOCKUP
   A CSS/JSX composition representing a real product
   ORA would build — a discovery dashboard.
   No glow. No blur. No gradient backgrounds. Clean shadow.
═══════════════════════════════════════════════════════ */
function ProductMockup() {
  return (
    <div
      className="relative w-full select-none overflow-hidden rounded-lg border border-[#2A2B2F] bg-[#161719]"
      style={{ boxShadow: "0 24px 64px -12px rgba(0,0,0,0.55), 0 0 0 1px rgba(42,43,47,0.6)" }}
      aria-hidden="true"
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 border-b border-[#2A2B2F] bg-[#1C1D20] px-3 py-2 sm:px-4 sm:py-3">
        <span className="h-2 w-2 rounded-full bg-[#2A2B2F]" />
        <span className="h-2 w-2 rounded-full bg-[#2A2B2F]" />
        <span className="h-2 w-2 rounded-full bg-[#2A2B2F]" />
        <div className="mx-2 flex-1 overflow-hidden sm:mx-4 rounded-sm bg-[#0E0F11] px-3 py-1 text-center font-mono text-[10px] text-[#4A4B4E]">
          ora / discovery
        </div>
      </div>

      {/* App layout */}
      <div className="flex h-[300px] sm:h-[410px]">

        {/* Sidebar */}
        <div className="hidden w-[160px] shrink-0 border-l border-[#2A2B2F] bg-[#161719] p-4 sm:block">
          {/* Brand mark inside mockup */}
          <div className="mb-5 flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-[#C8A97E]/15">
              <div className="h-3 w-3 rounded-sm bg-[#C8A97E]" />
            </div>
            <span className="font-mono text-[9px] font-semibold tracking-[0.12em] text-[#C8A97E]">
              ORA
            </span>
          </div>

          {/* Nav items */}
          <div className="space-y-0.5">
            {[
              { label: "لوحة التحكم", active: false },
              { label: "الاكتشاف", active: true },
              { label: "خارطة الطريق", active: false },
              { label: "المشاريع", active: false },
            ].map(item => (
              <div
                key={item.label}
                className={`rounded-sm px-2.5 py-2 text-right text-[10.5px] font-medium ${
                  item.active
                    ? "bg-[#C8A97E]/10 text-[#C8A97E]"
                    : "text-[#4A4B4E]"
                }`}
              >
                {item.label}
              </div>
            ))}
          </div>

          {/* Phase tracker */}
          <div className="mt-6 border-t border-[#2A2B2F] pt-4">
            <p className="mb-3 font-mono text-[8.5px] uppercase tracking-[0.14em] text-[#2A2B2F]">
              المراحل
            </p>
            {[
              { label: "الاكتشاف", active: true },
              { label: "التصميم", active: false },
              { label: "البناء",   active: false },
            ].map((step, i) => (
              <div key={step.label} className="mb-2 flex items-center gap-2">
                <div
                  className={`h-1.5 w-1.5 rounded-full ${
                    step.active
                      ? "bg-[#C8A97E]"
                      : i === 1
                      ? "border border-[#4A4B4E] bg-transparent"
                      : "border border-[#2A2B2F] bg-transparent"
                  }`}
                />
                <span
                  className={`text-[9.5px] ${
                    step.active ? "text-[#8A8B8E]" : "text-[#2A2B2F]"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Main content area */}
        <div className="min-w-0 flex-1 overflow-hidden p-3 sm:p-5">
          {/* Header row */}
          <div className="mb-5 flex items-center justify-between">
            <span className="font-mono text-[9.5px] tracking-[0.14em] text-[#4A4B4E]">
              اكتشاف المنتج
            </span>
            <span className="rounded-sm border border-[#C8A97E]/20 bg-[#C8A97E]/6 px-2 py-0.5 font-mono text-[9px] text-[#C8A97E]">
              قيد التنفيذ
            </span>
          </div>

          {/* Project title */}
          <h3 className="mb-4 text-right text-[14px] font-semibold leading-snug text-[#F0F0F0]">
            اكتشاف المنتج — TechFlow Analytics
          </h3>

          {/* Status cards */}
          <div className="mb-4 grid grid-cols-3 gap-1.5">
            {[
              { label: "المشكلة",     val: "محددة",          ok: true },
              { label: "المستخدمون",  val: "مُحللون",         ok: true },
              { label: "النطاق",      val: "قيد المراجعة",    ok: false },
            ].map(stat => (
              <div
                key={stat.label}
                className="rounded border border-[#2A2B2F] bg-[#1C1D20] p-2.5 text-right"
              >
                <p className="font-mono text-[8.5px] text-[#4A4B4E]">{stat.label}</p>
                <p
                  className={`mt-1 text-[9.5px] font-semibold ${
                    stat.ok ? "text-[#C8A97E]" : "text-[#8A8B8E]"
                  }`}
                >
                  {stat.val}
                </p>
              </div>
            ))}
          </div>

          {/* Task list */}
          <div className="space-y-1.5">
            {[
              { text: "تحديد مشكلة الدخول للمستخدمين الجدد",  done: true },
              { text: "مراجعة رحلة المستخدم الحالية",           done: true },
              { text: "ورشة تحديد الأولويات مع الفريق",         done: false },
              { text: "تحليل المنافسين وتقييم الفرص",            done: false },
            ].map(task => (
              <div
                key={task.text}
                className="flex items-center gap-2.5 rounded border border-[#1E1F22] bg-[#1C1D20] px-3 py-2"
              >
                <div
                  className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-sm border ${
                    task.done
                      ? "border-[#C8A97E]/40 bg-[#C8A97E]/12"
                      : "border-[#2A2B2F] bg-transparent"
                  }`}
                >
                  {task.done && <div className="h-2 w-2 rounded-sm bg-[#C8A97E]" />}
                </div>
                <span
                  className={`flex-1 text-right text-[10px] ${
                    task.done ? "text-[#4A4B4E] line-through" : "text-[#8A8B8E]"
                  }`}
                >
                  {task.text}
                </span>
              </div>
            ))}
          </div>

          {/* Footer row */}
          <div className="mt-4 flex items-center justify-between border-t border-[#1E1F22] pt-3.5">
            <span className="font-mono text-[8.5px] text-[#2A2B2F]">
              آخر تحديث: منذ 3 ساعات
            </span>
            <div className="flex gap-1">
              {[0, 1, 2].map(i => (
                <div
                  key={i}
                  className="h-5 w-5 rounded-full border border-[#2A2B2F] bg-[#1C1D20]"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   HOME PAGE — Editorial layout
   Each section has a distinct composition.
   Section index markers are the brand signature.
═══════════════════════════════════════════════════════ */
export default function Home() {
  const managedContent = trpc.siteContent.list.useQuery();
  const publishedPortfolio = trpc.portfolio.listPublished.useQuery();
  const approvedTestimonials = trpc.testimonials.listApproved.useQuery();
  const content = new Map(
    (managedContent.data ?? []).map(item => [item.contentKey, item.contentValue])
  );
  const heroTitle =
    content.get("hero_title") ?? "نحوّل الأفكار إلى حلول رقمية تستحق أن تستمر.";
  const heroDescription =
    content.get("hero_description") ??
    "ORA تساعد فرق الأعمال على فهم ما ينبغي بناؤه، تصميمه بوضوح، ثم إطلاقه ضمن مسار يمكن تطويره بثقة.";

  return (
    <SiteShell>

      {/* ──────────────────────────────────────────────
          HERO — Editorial split
          Text (right) + Product mockup (left in RTL)
          No orbs. No grid bg. No gradient overlay.
      ────────────────────────────────────────────── */}
      <section className="relative bg-[#0E0F11] pb-20 pt-16 sm:pt-20 lg:flex lg:min-h-[calc(100vh-68px)] lg:items-center">
        <div className="container grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">

          {/* Left column: text */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <p className="eyebrow">ORA · شريكك الرقمي</p>

            <h1 className="t-display mt-7 max-w-xl text-[#F0F0F0]">
              {heroTitle}
            </h1>

            <p className="mt-6 max-w-md text-[0.9375rem] leading-[1.9] text-[#8A8B8E]">
              {heroDescription}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row">
              <Link href="/request" className="button-primary justify-center">
                ابدأ مشروعك <ArrowLeft className="h-4 w-4" />
              </Link>
              <Link href="/services" className="button-secondary justify-center">
                استكشف خدماتنا
              </Link>
            </div>

            {/* Phase indicators — editorial, not cards */}
            <div className="mt-10 flex flex-wrap items-center gap-y-4 border-t border-[#2A2B2F] pt-6 sm:mt-12 sm:gap-y-0 sm:pt-7">
              {["اكتشاف", "بناء", "تحسين"].map((phase, i) => (
                <div key={phase} className="flex min-w-[33.333%] items-center gap-3 sm:min-w-0 sm:gap-5">
                  {i > 0 && <div className="hidden h-px w-8 bg-[#2A2B2F] sm:block" />}
                  <div>
                    <p className="font-mono text-[0.5625rem] font-semibold tracking-[0.14em] text-[#C8A97E] sm:hidden">
                      {phase}
                    </p>
                    <p className="mt-1.5 hidden text-[0.8125rem] font-medium text-[#8A8B8E] sm:block">
                      {phase}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right column: Product mockup */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative"
          >
            <ProductMockup />

            {/* Floating label — clean, no glow */}
            <div className="absolute -bottom-4 -right-3 hidden rounded-md border border-[#2A2B2F] bg-[#161719] px-4 py-3 lg:block shadow-lg shadow-black/30">
              <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-[#4A4B4E]">
                الخطوة الحالية
              </p>
              <p className="mt-1 text-[11.5px] font-semibold text-[#F0F0F0]">
                تحديد ما يستحق البناء
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Separator */}
      <div className="h-px bg-[#2A2B2F]" />

      {/* ──────────────────────────────────────────────
          SERVICES — Asymmetric split
          Index + intro text (narrow) + editorial list
          Not cards. Hover = accent line + text transitions.
      ────────────────────────────────────────────── */}
      <section className="bg-[#0E0F11] py-16 sm:py-28">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-[.38fr_1fr] lg:gap-20 lg:items-start">

            {/* Sticky label column */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4 }}
              className="lg:sticky lg:top-24"
            >
              <p className="eyebrow">الخدمات</p>
              <h2 className="t-h2 mt-6 text-[#F0F0F0]">
                حلول تبدأ من فهم العمل، لا من اختيار التقنية.
              </h2>
              <p className="mt-4 text-[0.875rem] leading-[1.85] text-[#8A8B8E]">
                نتعاون معك لاختيار المسار المناسب، سواء احتجت إلى بلورة منتج، تجربة أكثر وضوحًا، أو منصة تدعم التشغيل اليومي.
              </p>
              <Link
                href="/services"
                className="mt-6 inline-flex items-center gap-2 text-[0.875rem] font-medium text-[#C8A97E] transition-opacity duration-150 hover:opacity-70"
              >
                عرض كل الخدمات <ArrowLeft className="h-3.5 w-3.5" />
              </Link>
            </motion.div>

            {/* Services editorial list */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: 0.08 }}
              className="divide-y divide-[#2A2B2F] border-t border-[#2A2B2F]"
            >
              {services.map(service => (
                <ServiceCard key={service.slug} service={service} />
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Separator */}
      <div className="h-px bg-[#2A2B2F]" />

      {/* ──────────────────────────────────────────────
          PROCESS — Large-number editorial timeline
          Numbers dominate. Content is the anchor.
          No icon circles. No cards. 4-col grid on desktop.
      ────────────────────────────────────────────── */}
      <section className="bg-[#0E0F11] py-16 sm:py-28">
        <div className="container">

          {/* Section header — split */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4 }}
            className="mb-10 grid gap-6 sm:mb-16 lg:grid-cols-[1fr_.55fr] lg:items-end"
          >
            <div>
              <p className="eyebrow">كيف نعمل</p>
              <h2 className="t-h2 mt-6 max-w-lg text-[#F0F0F0]">
                مسار مشترك، لا تسليمات معزولة.
              </h2>
            </div>
            <p className="text-[0.9rem] leading-[1.85] text-[#8A8B8E]">
              نُبقي القرارات المهمة مرئية، ونقسم العمل إلى مراحل تسمح بالتعلم والتصحيح قبل أن تتسع تكلفة التغيير.
            </p>
          </motion.div>

          {/* Steps — editorial 4-column */}
          <div className="grid gap-0 divide-y divide-[#1E1F22] lg:grid-cols-4 lg:divide-x lg:divide-y-0 rtl:lg:divide-x-reverse">
            {workSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="flex flex-col gap-5 py-7 sm:gap-8 sm:py-10 lg:px-8 lg:py-0"
              >
                {/* Large editorial number — the signature element */}
    <div>
                  <h3 className="t-h3 text-[#F0F0F0]">{step.title}</h3>
                  <p className="mt-2.5 text-[0.875rem] leading-[1.75] text-[#8A8B8E]">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Separator */}
      <div className="h-px bg-[#2A2B2F]" />

      {/* ──────────────────────────────────────────────
          CLARITY — Large editorial statement
          Not a card. Not centered. Left-weighted.
          Headline splits into foreground + muted for emphasis.
      ────────────────────────────────────────────── */}
      <section className="bg-[#0E0F11] py-16 sm:py-28">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4 }}
          >
            <p className="eyebrow">الوضوح كميزة</p>

            {/* Large editorial statement — the visual anchor of this section */}
            <p
              className="mt-8 max-w-4xl font-semibold leading-[1.18] tracking-[-0.025em] text-[#F0F0F0]"
              style={{ fontSize: "clamp(1.75rem, 7vw, 2.875rem)" }}
            >
              لا نُخفي التعقيد،
              <br />
              <span className="text-[#8A8B8E]">
                بل نرتبه حتى يمكن لفريقك التحرك.
              </span>
            </p>
          </motion.div>

          {/* Body + accent details — below the statement */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-10 grid gap-8 border-t border-[#2A2B2F] pt-8 sm:mt-14 sm:pt-12 lg:grid-cols-[1fr_1fr] lg:gap-16"
          >
            <p className="text-[0.9375rem] leading-[1.9] text-[#8A8B8E]">
              يتغير نطاق العمل الطبيعي مع التعلم. لذلك نوضح ما نعرفه وما نحتاج إلى اختباره وما يمكن تأجيله، بدل وعدك بخطة جامدة من اليوم الأول.
            </p>

            {/* Two highlights — no cards, just accent border on right side */}
            <div className="grid gap-6 sm:grid-cols-2">
              {[
                { title: "سياق مشترك", text: "كل قرار مهم يبدأ بفهم المشكلة." },
                { title: "تنفيذ مرحلي", text: "نطلق أجزاءً ذات قيمة ونستفيد من التعلم." },
              ].map(({ title, text }) => (
                <div key={title} className="border-r-2 border-[#C8A97E]/30 pr-5">
                  <p className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-[#C8A97E]">
                    {title}
                  </p>
                  <p className="mt-2 text-[0.875rem] leading-[1.75] text-[#8A8B8E]">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Selected Works — always visible from static content ── */}
      {(() => {
        /* Merge: static featured first, then any extra DB items */
        const dbExtra = (publishedPortfolio.data ?? []).filter(
          (item) => !featuredPortfolio.some((f) => f.slug === item.slug),
        );
        const allItems = [...featuredPortfolio, ...dbExtra];
        const showcase = allItems.slice(0, 3);
        return (
          <section className="bg-[#0E0F11] py-16 sm:py-28">
            <div className="container">
              <div className="flex flex-col justify-between gap-6 border-b border-[#2A2B2F] pb-8 sm:flex-row sm:items-end">
                <div>
                  <p className="eyebrow">أعمال مختارة</p>
                  <h2 className="t-h2 mt-6 max-w-2xl text-[#F0F0F0]">نتائج يمكن رؤيتها، لا وعود تُقال.</h2>
                </div>
                <Link href="/work" className="inline-flex items-center gap-2 text-sm font-medium text-[#C8A97E] hover:opacity-70">
                  استكشف الأعمال <ArrowLeft className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {showcase.map((item) => {
                  const liveUrl = "liveUrl" in item ? item.liveUrl : undefined;
                  return (
                    <div key={item.id} className="group relative border border-[#2A2B2F] bg-[#161719] transition-colors hover:border-[#C8A97E]/50">
                      <div className="block">
                        <div className="relative aspect-[16/10] overflow-hidden bg-[#1C1D20]">
                          {item.coverImageUrl ? (
                            <img
                              src={item.coverImageUrl}
                              alt={item.title}
                              loading="lazy"
                              decoding="async"
                              className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
                            />
                          ) : (
                            <div className="grid h-full place-items-center">
                              <BriefcaseBusiness className="h-9 w-9 text-[#C8A97E]" />
                            </div>
                          )}
                        </div>
                        <div className="p-5">
                          <p className="font-mono text-[10px] uppercase tracking-[.14em] text-[#C8A97E]">
                            {item.service ?? "حل رقمي"}
                          </p>
                          <h3 className="mt-3 text-lg font-semibold text-[#F0F0F0]">{item.title}</h3>
                          <p className="mt-3 text-sm leading-7 text-[#8A8B8E]">{item.excerpt}</p>
                        </div>
                      </div>

                      {/* Live URL pill — positioned top-left over image */}
                      {liveUrl && (
                        <a
                          href={liveUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                          aria-label="معاينة الموقع الحي"
                          title="معاينة الموقع الحي"
                          className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-[#C8A97E]/30 bg-black/60 px-3 py-1.5 text-[11px] font-bold text-[#C8A97E] backdrop-blur-sm transition-all duration-200 hover:border-[#C8A97E]/70 hover:bg-black/80 hover:text-white hover:shadow-[0_0_10px_rgba(200,169,126,0.2)]"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#C8A97E] opacity-60" />
                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#C8A97E]" />
                          </span>
                          معاينة حية
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })()}

      {approvedTestimonials.data && approvedTestimonials.data.length > 0 && (
        <section className="border-y border-[#2A2B2F] bg-[#0E0F11] py-16 sm:py-24"><div className="container"><p className="eyebrow">ثقة من شركائنا</p><div className="mt-8 grid gap-5 lg:grid-cols-3">{approvedTestimonials.data.slice(0, 3).map(item => <figure key={item.id} className="border-r-2 border-[#C8A97E]/30 bg-[#161719] p-6"><p className="text-xs font-medium text-[#C8A97E]">التقييم: {item.rating} من 5</p><blockquote className="mt-5 text-base leading-8 text-[#F0F0F0]">“{item.quote}”</blockquote><figcaption className="mt-6 border-t border-[#2A2B2F] pt-4"><p className="text-sm font-semibold text-[#F0F0F0]">{item.displayName}</p><p className="mt-1 text-xs text-[#8A8B8E]">{[item.role, item.company].filter(Boolean).join(" · ") || "شريك"}</p></figcaption></figure>)}</div></div></section>
      )}

      {/* Separator */}
      <div className="h-px bg-[#2A2B2F]" />

      {/* ──────────────────────────────────────────────
          FAQ — Asymmetric, accordion right-weighted
      ────────────────────────────────────────────── */}
      <section className="bg-[#0E0F11] py-16 sm:py-28">
        <div className="container grid gap-12 lg:grid-cols-[.42fr_1fr] lg:gap-16 lg:items-start">

          {/* Left: label + headline */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4 }}
            className="lg:sticky lg:top-24"
          >
            <p className="eyebrow">أسئلة شائعة</p>
            <h2 className="t-h2 mt-6 text-[#F0F0F0]">
              إجابات عملية، قبل أن تملأ أي نموذج.
            </h2>
            <Link
              href="/faq"
              className="mt-6 inline-flex items-center gap-2 text-[0.875rem] font-medium text-[#C8A97E] transition-opacity duration-150 hover:opacity-70"
            >
              كل الأسئلة الشائعة <ArrowLeft className="h-3.5 w-3.5" />
            </Link>
          </motion.div>

          {/* Right: accordion */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, delay: 0.08 }}
          >
            <FaqList limit={3} />
          </motion.div>
        </div>
      </section>

      {/* CTA — from shared component, full-width minimal strip */}
      <CTASection />
    </SiteShell>
  );
}
