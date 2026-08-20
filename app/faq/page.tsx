"use client";

import { CTASection, FaqList } from "@/components/ContentBlocks";
import { PageHero, SiteShell } from "@/components/SiteChrome";

export default function FAQ() {
  return <SiteShell><PageHero eyebrow="الأسئلة الشائعة" title="كل بداية جيدة تستحق إجابات واضحة." description="جمعنا الأسئلة التي تساعدك على فهم طريقة العمل قبل اتخاذ الخطوة التالية. إن لم تجد ما تبحث عنه، يمكنك كتابة سياقك مباشرة في طلب المشروع." /><section className="container py-16 sm:py-24"><div className="mx-auto max-w-4xl"><FaqList /></div></section><CTASection /></SiteShell>;
}
