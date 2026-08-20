"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, Mail, Menu, Phone, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { navItems } from "@/content/site";
import { defaultCompanyContact } from "@/content/company";
import { trpc } from "@/lib/trpc";
import { motion, AnimatePresence } from "framer-motion";

/* ── WhatsApp SVG icon — inline, no extra dep ── */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const logoUrl = "/brand/ora-official-lockup-alpha.png";

export function OraMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="group inline-flex shrink-0 items-center" aria-label="ORA — الرئيسية">
      <img
        src={logoUrl}
        alt="ORA Soft"
        style={{ height: compact ? 40 : 56, width: "auto" }}
        className="max-w-36 object-contain transition-transform duration-200 group-hover:scale-[1.03]"
      />
    </Link>
  );
}

export function SiteHeader() {
  const location = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setIsMenuOpen(false), [location]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-[#2A2B2F] bg-[#0E0F11]/92 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between gap-3 sm:h-[68px] sm:gap-6">
        <OraMark />

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-7 lg:flex" aria-label="التنقل الرئيسي">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative text-[0.9rem] font-medium transition-colors duration-150 ${
                location === item.href
                  ? "text-[#F0F0F0]"
                  : "text-[#8A8B8E] hover:text-[#C8C9CC]"
              }`}
            >
              {item.label}
              {location === item.href && (
                <span className="absolute -bottom-[25px] left-0 right-0 h-px bg-[#C8A97E]" />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden lg:block">
            <Link
              href="/request"
              className="button-primary text-sm"
            >
              ابدأ مشروعك <ArrowLeft className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-md border border-[#2A2B2F] bg-transparent text-[#8A8B8E] lg:hidden transition-colors duration-150 hover:border-[#4A4B4E] hover:text-[#F0F0F0]"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen(open => !open)}
          >
            <span className="sr-only">{isMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}</span>
            {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            id="mobile-navigation"
            className="overflow-hidden border-t border-[#2A2B2F] bg-[#0E0F11] lg:hidden"
            aria-label="التنقل على الهاتف"
          >
            <div className="container grid gap-1 py-3 sm:py-4">
              {navItems.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex min-h-12 items-center rounded-md px-4 py-3 text-right text-[0.9375rem] transition-colors duration-150 ${
                    location === item.href
                      ? "bg-[#161719] text-[#F0F0F0] font-medium"
                      : "text-[#8A8B8E] hover:bg-[#161719] hover:text-[#F0F0F0]"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-3 border-t border-[#2A2B2F] pt-3">
                <Link
                  href="/request"
                  className="button-primary w-full justify-center"
                >
                  ابدأ مشروعك <ArrowLeft className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

export function SiteFooter() {
  const managedContent = trpc.siteContent.list.useQuery();
  const footerMessage =
    managedContent.data?.find(item => item.contentKey === "footer_message")?.contentValue ??
    "نحوّل الأفكار إلى حلول رقمية واضحة، من جلسة الاكتشاف الأولى إلى الإطلاق والتحسين.";
  const companySettings = trpc.companySettings.public.useQuery();
  const contactEmail = companySettings.data?.contactEmail ?? defaultCompanyContact.email;
  const contactPhone = companySettings.data?.contactPhone ?? defaultCompanyContact.phone;
  const isPlaceholderContact = !companySettings.data?.contactEmail && !companySettings.data?.contactPhone;

  return (
    <footer className="border-t border-[#2A2B2F] bg-[#0E0F11]">
      <div className="container grid gap-12 py-16 md:grid-cols-[1.6fr_1fr_1fr] md:gap-8">
        {/* Brand */}
        <div>
          <div className="max-w-[180px]">
            <img src="/brand/ora-official-lockup-alpha.png" alt="ORA — الشعار الرسمي" className="h-auto w-full object-contain" />
          </div>
          <p className="mt-5 max-w-xs text-[0.875rem] leading-[1.8] text-[#8A8B8E]">
            {footerMessage}
          </p>
        </div>

        {/* Nav links */}
        <div>
          <p className="font-mono text-[0.625rem] font-semibold tracking-[0.18em] text-[#4A4B4E] uppercase">
            استكشف
          </p>
          <div className="mt-5 grid gap-3.5">
            {navItems.slice(1, 5).map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[0.875rem] text-[#8A8B8E] transition-colors duration-150 hover:text-[#F0F0F0]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div>
          <p className="font-mono text-[0.625rem] font-semibold tracking-[0.18em] text-[#4A4B4E] uppercase">
            خطوتك التالية
          </p>
          <p className="mt-5 text-[0.875rem] leading-[1.8] text-[#8A8B8E]">
            أرسل لمحة عن فكرتك، وسنساعدك على ترتيب نقطة البداية المناسبة.
          </p>
          <div className="mt-5 grid gap-3 text-[0.8rem]">
            {/* Email */}
            <a href={`mailto:${contactEmail}`} className="inline-flex items-center gap-2 text-[#C8C9CC] transition-colors hover:text-[#C8A97E]">
              <Mail className="h-3.5 w-3.5 shrink-0" />
              <span>{contactEmail}</span>
            </a>
            {/* Phone — icon stays RTL, only the number text is LTR */}
            <a href={`tel:${contactPhone.replaceAll(" ", "")}`} className="inline-flex items-center gap-2 text-[#C8C9CC] transition-colors hover:text-[#C8A97E]">
              <Phone className="h-3.5 w-3.5 shrink-0" />
              <span dir="ltr">{contactPhone}</span>
            </a>
          </div>

          {/* ── CTA row: WhatsApp + Start project — side by side ── */}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            {/* WhatsApp pill */}
            <a
              href={`https://wa.me/967778797333?text=${encodeURIComponent("مرحباً، أودّ الاستفسار عن مشروع مع ORA.")}`}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="تواصل عبر واتساب"
              className="inline-flex items-center gap-2 rounded-sm border border-[#C8A97E]/35 bg-[#C8A97E]/10 px-4 py-2.5 text-[0.8rem] font-bold text-[#C8A97E] transition-all duration-200 hover:border-[#C8A97E]/65 hover:bg-[#C8A97E]/18 hover:shadow-[0_0_14px_rgba(200,169,126,0.2)]"
            >
              <WhatsAppIcon className="h-3.5 w-3.5" />
              واتساب
            </a>
            {/* vertical divider */}
            <span className="h-5 w-px bg-[#2A2B2F]" aria-hidden="true" />
            {/* Start project */}
            <Link
              href="/request"
              className="inline-flex items-center gap-2 rounded-sm border border-[#2A2B2F] px-4 py-2.5 text-[0.8rem] font-bold text-[#C8C9CC] transition-all duration-200 hover:border-[#C8A97E]/40 hover:text-[#C8A97E]"
            >
              ابدأ مشروعك <ArrowLeft className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="container flex flex-col gap-2 border-t border-[#1E1F22] py-6 text-[0.6875rem] text-[#4A4B4E] sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} ORA. جميع الحقوق محفوظة.</p>
        <p>نحترم خصوصية الطلبات ونستخدم المعلومات لتنسيق التواصل بشأن المشروع فقط.</p>
      </div>
    </footer>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0E0F11] text-[#F0F0F0] flex flex-col">
      <SiteHeader />
      <main className="flex-1 overflow-x-clip">{children}</main>
      <SiteFooter />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-[#2A2B2F] bg-[#0E0F11] pb-12 pt-14 sm:pb-20 sm:pt-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="t-h1 mt-6 max-w-3xl text-[#F0F0F0] sm:mt-8">{title}</h1>
          <p className="mt-5 max-w-2xl text-[0.9375rem] leading-[1.85] text-[#8A8B8E]">
            {description}
          </p>
          {children && <div className="page-hero-actions mt-8">{children}</div>}
        </motion.div>
      </div>
    </section>
  );
}
