"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, CalendarDays, Mail, MapPin, MessageSquareText, Phone, ShieldCheck, type LucideIcon } from "lucide-react";
import { PageHero, SiteShell } from "@/components/SiteChrome";
import { trpc } from "@/lib/trpc";
import { defaultCompanyContact } from "@/content/company";

/* WhatsApp SVG icon — inline */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const contactSteps: Array<[LucideIcon, string, string]> = [
  [MessageSquareText, "نقرأ السياق أولًا", "نراجع المعلومات لتحديد السؤال أو الخطوة التالية ذات القيمة."],
  [CalendarDays, "نرتب اللقاء المناسب", "بعد المراجعة، ننسق جلسة اكتشاف أو نقاشًا يطابق المرحلة التي تمر بها."],
  [ShieldCheck, "تعامل مسؤول مع البيانات", "لا تطلب الاستمارة بيانات حساسة، ونستخدم التفاصيل فقط لغاية التواصل حول المشروع."],
];

export default function Contact() {
  const settings = trpc.companySettings.public.useQuery();
  const sendMessage = trpc.contactMessages.submit.useMutation();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "", website: "" });
  const [sent, setSent] = useState(false);

  const company = settings.data;
  const contactEmail = company?.contactEmail ?? defaultCompanyContact.email;
  const contactPhone = company?.contactPhone ?? defaultCompanyContact.phone;
  const contactLocation = company?.location ?? defaultCompanyContact.location;
  const responseTime = company?.responseTime ?? defaultCompanyContact.responseTime;
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await sendMessage.mutateAsync(form);
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "", website: "" });
  };

  return <SiteShell>
    <PageHero eyebrow="تواصل معنا" title="لنبدأ بفهم السياق، لا بتعبئة نموذج طويل." description="أرسل لنا لمحة عن الفكرة أو التحدي الذي تريد حله. يمكنك استخدام نموذج طلب المشروع أو إرسال رسالة مباشرة، وسنرتب معك الخطوة المناسبة." />
    <section className="container py-16 sm:py-24">
      <div className="grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
        <div className="space-y-4">
          <div className="rounded-[2rem] border border-[#6595eb]/25 bg-[#0c1c32] p-5 sm:p-10"><p className="eyebrow">أسرع طريق للبداية</p><h2 className="display mt-5 text-3xl leading-[1.3] text-white sm:text-4xl">شارك التفاصيل التي تراها مهمة، ونحن نرتب الباقي.</h2><p className="mt-5 max-w-lg leading-8 text-[#b8c6dc]">لا تحتاج إلى إعداد عرض شامل. يكفي أن تخبرنا من أين تبدأ المشكلة، ومن سيتأثر بها، وما الذي تريد أن يتغير.</p><Link href="/request" className="button-primary mt-8">انتقل إلى طلب المشروع <ArrowLeft className="h-4 w-4" /></Link></div>
          <div className="rounded-[1.5rem] border border-white/10 bg-white/[.025] p-6"><div className="flex items-center justify-between gap-4"><p className="text-xs font-bold tracking-[.15em] text-indigo-300">بيانات التواصل</p></div><div className="mt-5 grid gap-4 text-sm"><a href={`mailto:${contactEmail}`} className="flex items-center gap-3 text-slate-200 hover:text-cyan-300"><Mail className="h-4 w-4 text-cyan-300" />{contactEmail}</a><a href={`tel:${contactPhone.replaceAll(" ", "")}`} dir="ltr" className="flex items-center gap-3 text-slate-200 hover:text-cyan-300"><Phone className="h-4 w-4 text-cyan-300" />{contactPhone}</a><p className="flex items-center gap-3 text-slate-300"><MapPin className="h-4 w-4 text-cyan-300" />{contactLocation}</p><p className="text-xs leading-6 text-slate-500">{responseTime}</p></div>

            {/* ── WhatsApp — gold elegant button ── */}
            <a
              href={`https://wa.me/967778797333?text=${encodeURIComponent("مرحباً، أودّ الاستفسار عن مشروع مع ORA.")}`}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="تواصل عبر واتساب"
              className="mt-5 inline-flex w-full items-center justify-center gap-2.5 rounded-[0.75rem] border border-[#C8A97E]/35 bg-[#C8A97E]/10 px-5 py-3 text-sm font-bold text-[#C8A97E] transition-all duration-200 hover:border-[#C8A97E]/65 hover:bg-[#C8A97E]/18 hover:shadow-[0_0_20px_rgba(200,169,126,0.18)]"
            >
              <WhatsAppIcon className="h-4.5 w-4.5" />
              تواصل عبر واتساب ←
            </a>
          </div>
          <div className="grid gap-4">{contactSteps.map(([Icon, title, text]) => <article key={title} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[.025] p-5 sm:gap-5 sm:p-6"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#397CFF]/10 text-[#8fb6ff]"><Icon className="h-5 w-5" /></span><div><p className="font-bold text-white">{title}</p><p className="mt-2 text-sm leading-7 text-[#b1c0d6]">{text}</p></div></article>)}</div>
        </div>
        <form onSubmit={submit} className="rounded-[2rem] border border-white/10 bg-white/[.03] p-5 sm:p-10"><div><p className="eyebrow light">رسالة مباشرة</p><h2 className="display mt-5 text-3xl text-white sm:text-4xl">هل لديك سؤال قبل بدء المشروع؟</h2><p className="mt-4 leading-8 text-slate-400">اكتب رسالتك وسنستخدمها فقط للتواصل بشأن طلبك.</p></div><div className="mt-8 grid gap-5 sm:grid-cols-2"><label className="field-label text-slate-200">الاسم<input required className="field-input mt-2" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></label><label className="field-label text-slate-200">البريد الإلكتروني<input required type="email" dir="ltr" className="field-input mt-2" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></label><label className="field-label text-slate-200 sm:col-span-2">الموضوع<input className="field-input mt-2" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} /></label><label className="field-label text-slate-200 sm:col-span-2">الرسالة<textarea required className="field-input mt-2 min-h-40" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} /></label><input tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" value={form.website} onChange={e => setForm({ ...form, website: e.target.value })} /></div><div className="mt-7 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center"><button disabled={sendMessage.isPending} className="button-primary">{sendMessage.isPending ? "جارٍ الإرسال..." : "إرسال الرسالة"}<ArrowLeft className="h-4 w-4" /></button>{sent && <p className="text-sm text-emerald-300">وصلت رسالتك. سنراجعها ونتواصل معك.</p>}{sendMessage.error && <p className="text-sm text-red-300">تعذر الإرسال حاليًا، يرجى المحاولة لاحقًا.</p>}</div><p className="mt-6 text-xs leading-6 text-slate-500">بإرسال الرسالة، تؤكد أنك قرأت إشعار الخصوصية وأن المعلومات المقدمة مخصصة للتواصل حول الاستفسار.</p></form>
      </div>
    </section>
  </SiteShell>;
}
