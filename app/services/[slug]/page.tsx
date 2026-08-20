"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { CTASection, DeliverableList } from "@/components/ContentBlocks";
import { PageHero, SiteShell } from "@/components/SiteChrome";
import { services } from "@/content/site";

export default function ServiceDetail() {
  const params = useParams();
  const service = services.find(item => item.slug === params?.slug);
  if (!service) return <SiteShell><PageHero eyebrow="الخدمات" title="هذه الخدمة غير متاحة في المسار الحالي." description="يمكنك العودة إلى الخدمات لاستكشاف المسارات المتاحة." ><Link href="/services" className="button-primary">العودة للخدمات <ArrowRight className="h-4 w-4" /></Link></PageHero></SiteShell>;
  const Icon = service.icon;
  return <SiteShell><PageHero eyebrow="الخدمات" title={service.title} description={service.description} ><Link href="/request" className="button-primary">ابدأ من هنا <ArrowLeft className="h-4 w-4" /></Link></PageHero><section className="container py-16 sm:py-24"><div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]"><div className="rounded-[2rem] border border-[#6595eb]/25 bg-[#0b1b31] p-5 sm:p-8"><span className="grid h-14 w-14 place-items-center rounded-2xl bg-[#397CFF]/15 text-[#91b8ff]"><Icon className="h-7 w-7" /></span><p className="mt-8 text-xs font-bold tracking-[.16em] text-[#7498d3]">المحصلة المقصودة</p><p className="display mt-3 text-xl leading-[1.45] text-white sm:text-2xl">{service.outcome}</p></div><div><p className="eyebrow">ما يمكن أن يشمله المسار</p><h2 className="display mt-5 text-3xl leading-[1.3] text-white sm:text-4xl">نحوّل المرحلة إلى مخرجات يمكن للفريق الاستناد إليها.</h2><div className="mt-8"><DeliverableList items={service.deliverables} /></div><div className="mt-10 rounded-2xl border border-white/10 bg-white/[.025] p-5"><div className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#8fb6ff]" /><p className="text-sm leading-7 text-[#b9c8de]">يتحدد العمق الفعلي للمسار بعد فهم السياق. نعرض نطاقًا مرحليًا بدل افتراض أن كل مشروع يحتاج إلى نفس الوصفة.</p></div></div></div></div></section><CTASection /></SiteShell>;
}
