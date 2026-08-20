"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpLeft, Route } from "lucide-react";
import { CTASection, ServiceCard } from "@/components/ContentBlocks";
import { PageHero, SiteShell } from "@/components/SiteChrome";
import { services } from "@/content/site";

export default function Services() {
  return (
    <SiteShell>
      <PageHero eyebrow="الخدمات" title="نختار طريقة العمل التي تخدم المشكلة، ثم نبنيها بإتقان." description="يمكن أن تبدأ الشراكة في مرحلة الفكرة، أو عند وجود منتج يحتاج إلى تجربة أو بنية أكثر وضوحًا. لكل مسار مخرجات محددة ونقطة بداية عملية.">
        <Link href="/request" className="button-primary">أخبرنا بما تحتاج <ArrowLeft className="h-4 w-4" /></Link>
      </PageHero>
      <section className="container relative py-16 sm:py-24">
        <div className="absolute top-[10.25rem] bottom-28 right-[18%] hidden w-px bg-gradient-to-b from-[#397CFF] via-[#5d78ac]/55 to-transparent lg:block" />
        <div className="mb-8 grid gap-5 sm:mb-12 sm:gap-6 lg:grid-cols-[.62fr_1.38fr] lg:items-end">
          <div className="rounded-2xl border border-[#6595eb]/20 bg-[#0a182b] p-5"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#397CFF]/10 text-[#8fb6ff]"><Route className="h-5 w-5" /></span><p className="mt-4 text-sm leading-7 text-[#b6c5da]">ليست الخدمات قائمة مشتريات. إنها محطات يمكن أن نبدأ منها وفق وضع الفريق والمنتج.</p></div>
          <div><p className="eyebrow">خريطة المسارات</p><p className="mt-3 max-w-3xl text-base leading-8 text-[#c4d1e4] sm:text-lg">يمتد كل مسار من السؤال العملي إلى مخرجات قابلة للاستخدام. اختر المحطة الأقرب الآن، ثم نحدد معًا ما يتصل بها لاحقًا.</p></div>
        </div>
        <div className="relative grid gap-5 lg:grid-cols-2">
          {services.map((service, index) => (
            <div key={service.slug} className={`relative ${index === 0 ? "lg:col-span-2" : ""} ${index === 2 ? "lg:translate-y-10" : ""}`}>
              <span className={`absolute -right-2 -top-2 z-10 hidden h-4 w-4 rounded-full border-4 border-[#07111f] bg-[#397CFF] shadow-[0_0_20px_rgba(57,124,255,.85)] lg:block ${index === 0 ? "right-[18%]" : ""}`} />
              <ServiceCard service={service} className={index === 0 ? "lg:grid lg:grid-cols-[.76fr_1.24fr] lg:items-end lg:gap-8" : ""} />
            </div>
          ))}
        </div>
        <div className="relative mt-16 grid gap-7 sm:mt-32 sm:gap-8 overflow-hidden rounded-[2rem] border border-white/10 bg-[#0d1d34] p-7 sm:p-10 lg:grid-cols-[.9fr_1.1fr]">
          <div className="absolute -right-16 -bottom-20 h-56 w-56 rounded-full border border-[#83aeff]/25" />
          <div className="relative"><p className="eyebrow">نطاق مرن</p><h2 className="display mt-5 text-2xl sm:text-3xl leading-[1.35] text-white sm:text-4xl">هل تحتاج إلى جزء من المسار فقط؟</h2></div>
          <p className="relative max-w-2xl leading-8 text-[#b3c2d9]">نستطيع الدخول في مرحلة محددة عندما يكون ذلك أنسب لفريقك: جلسة اكتشاف، مراجعة تجربة، تصميم واجهة، أو بناء مسار ويب. نوضح حدود المسؤولية ونقطة التسليم من البداية.</p>
          <ArrowUpLeft className="absolute bottom-6 left-6 h-5 w-5 text-[#82acff]" />
        </div>
      </section>
      <CTASection />
    </SiteShell>
  );
}
