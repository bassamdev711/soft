"use client";

import { useState } from "react";
import Link from "next/link";
import { AlertCircle, ArrowLeft, ArrowRight, CheckCircle2, Compass, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { SiteShell } from "@/components/SiteChrome";
import { trpc } from "@/lib/trpc";
import { motion } from "framer-motion";

const requestStages = [
  ["الاستكشاف الأولي", "نقوم بمراجعة طلبك لفهم التحديات والأهداف بشكل دقيق."],
  ["جلسة المواءمة", "نرتب لقاءً لفهم التفاصيل التقنية والتجارية لمشروعك."],
  ["خريطة الطريق", "نقدم مقترحاً واضحاً يشمل نطاق العمل، الزمن، والميزانية."],
];

type ServiceChoice = "discovery" | "design" | "web" | "mobile" | "operations" | "ecommerce" | "landing" | "other";

export default function ProjectRequest() {
  const [submitted, setSubmitted] = useState(false);
  const [reference, setReference] = useState<string | null>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const submit = trpc.projectRequests.submit.useMutation({
    onMutate: () => setSubmissionError(null),
    onSuccess: result => {
      setSubmitted(true);
      setReference(result.reference);
    },
    onError: error => {
      const message = error.message || "تعذر إرسال الطلب الآن. يرجى المحاولة لاحقًا.";
      setSubmissionError(message);
      toast.error(message);
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    submit.mutate({
      name: String(fields.get("name") ?? ""),
      email: String(fields.get("email") ?? ""),
      company: String(fields.get("company") ?? "") || undefined,
      service: String(fields.get("service") ?? "other") as ServiceChoice,
      brief: String(fields.get("brief") ?? ""),
      website: String(fields.get("website") ?? "") || undefined,
    });
  };

  return (
    <SiteShell>
      {/* ── Minimalist Editorial Hero ── */}
      <section className="relative border-b border-[#2A2B2F] bg-[#0E0F11] pt-24 pb-16">
        <div className="container relative z-10">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#C8A97E]/40" />
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[.2em] text-[#C8A97E]/70">
              طلب مشروع
            </span>
          </div>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold leading-tight tracking-[-0.02em] text-[#F0F0F0] sm:text-5xl lg:text-6xl">
            دعنا نناقش <span className="text-[#8A8B8E]">تحديك القادم.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[0.95rem] leading-[1.8] text-[#8A8B8E]">
            هذه الأسئلة تساعدنا على تشكيل الفهم الأولي. لا تقلق إن لم تكن كل التفاصيل واضحة الآن، فجزء من عملنا هو مساعدتك في ترتيب المتطلبات وصياغة الحل الأمثل.
          </p>
        </div>
      </section>

      <section className="bg-[#0E0F11] py-16 sm:py-24">
        <div className="container mx-auto grid max-w-6xl gap-12 lg:grid-cols-[.4fr_1fr] lg:items-start lg:gap-20">
          
          {/* ── Sidebar: Process Timeline ── */}
          <aside className="order-2 lg:order-1 lg:sticky lg:top-28">
            <div className="border border-[#2A2B2F] bg-[#161719] p-6 sm:p-8">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[.2em] text-[#C8A97E]">
                الخطوات القادمة
              </p>
              
              <div className="relative mt-8 space-y-8 before:absolute before:right-[0.35rem] before:top-2 before:h-[calc(100%-2rem)] before:w-px before:bg-[#2A2B2F]">
                {requestStages.map(([title, text], index) => (
                  <div key={title} className="relative pr-8">
                    <span 
                      className={`absolute right-0 top-1.5 grid h-3 w-3 place-items-center rounded-full border-2 border-[#161719] ${
                        index === 0 ? "bg-[#C8A97E] ring-4 ring-[#C8A97E]/10" : "bg-[#4A4B4E]"
                      }`} 
                    />
                    <p className="text-sm font-bold text-[#F0F0F0]">{title}</p>
                    <p className="mt-1.5 text-xs leading-6 text-[#8A8B8E]">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 flex gap-3 border border-[#2A2B2F] bg-[#161719] p-5">
              <Compass className="mt-0.5 h-5 w-5 shrink-0 text-[#C8A97E]" />
              <p className="text-[0.8rem] leading-6 text-[#8A8B8E]">
                نحن نتعامل مع كافة الطلبات بسرية تامة. فريقنا سيراجع التفاصيل ويعود إليك خلال يوم عمل واحد.
              </p>
            </div>
          </aside>

          {/* ── Main Form Area ── */}
          <div className="order-1 lg:order-2">
            <div className="mb-8 flex items-center justify-between border-b border-[#2A2B2F] pb-4 font-mono text-[10px] uppercase tracking-wider text-[#4A4B4E]">
              <span>معلومات المشروع</span>
              <span>الخطوة 1 من 1</span>
            </div>

            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="border border-[#C8A97E]/30 bg-[#C8A97E]/5 p-8 text-center sm:p-16"
              >
                <CheckCircle2 className="mx-auto h-12 w-12 text-[#C8A97E]" />
                <h2 className="mt-6 font-display text-2xl font-bold text-[#F0F0F0] sm:text-3xl">
                  تم استلام طلبك بنجاح.
                </h2>
                <p className="mx-auto mt-4 max-w-lg leading-[1.8] text-[#8A8B8E]">
                  شكرًا لاختيارك ORA. لقد استلمنا التفاصيل الأولية لمشروعك، وسيقوم فريقنا بالتواصل معك قريباً لتنسيق الخطوة التالية.
                </p>
                {reference && (
                  <p className="mx-auto mt-6 w-fit border border-[#2A2B2F] bg-[#161719] px-4 py-2 font-mono text-sm font-semibold tracking-wider text-[#C8A97E]" dir="ltr">
                    Ref: {reference}
                  </p>
                )}
                <Link href="/" className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-[#C8A97E] hover:text-[#F0F0F0] transition-colors">
                  العودة للرئيسية <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            ) : (
              <form className="space-y-8" onSubmit={handleSubmit}>
                <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute h-px w-px opacity-0" />
                
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-xs font-bold tracking-wide text-[#F0F0F0]">الاسم الكامل</label>
                    <input 
                      required name="name" 
                      className="w-full border border-[#2A2B2F] bg-[#161719] px-4 py-3 text-sm text-[#F0F0F0] placeholder-[#4A4B4E] outline-none transition-colors focus:border-[#C8A97E]/50 focus:bg-[#1C1D20]" 
                      placeholder="محمد أحمد" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-bold tracking-wide text-[#F0F0F0]">البريد الإلكتروني المهني</label>
                    <input 
                      required type="email" name="email" dir="ltr"
                      className="w-full border border-[#2A2B2F] bg-[#161719] px-4 py-3 text-sm text-[#F0F0F0] placeholder-[#4A4B4E] outline-none transition-colors focus:border-[#C8A97E]/50 focus:bg-[#1C1D20] text-left" 
                      placeholder="name@company.com" 
                    />
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-xs font-bold tracking-wide text-[#F0F0F0]">
                      اسم الشركة أو المؤسسة <span className="text-[#4A4B4E] font-normal">(اختياري)</span>
                    </label>
                    <input 
                      name="company" 
                      className="w-full border border-[#2A2B2F] bg-[#161719] px-4 py-3 text-sm text-[#F0F0F0] placeholder-[#4A4B4E] outline-none transition-colors focus:border-[#C8A97E]/50 focus:bg-[#1C1D20]" 
                      placeholder="ORA Soft" 
                    />
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-xs font-bold tracking-wide text-[#F0F0F0]">نوع الخدمة المطلوبة</label>
                    <select 
                      required name="service" defaultValue="" 
                      className="w-full appearance-none border border-[#2A2B2F] bg-[#161719] px-4 py-3 text-sm text-[#F0F0F0] outline-none transition-colors focus:border-[#C8A97E]/50 focus:bg-[#1C1D20]"
                    >
                      <option value="" disabled>اختر التصنيف الأقرب لاحتياجك</option>
                      <option value="ecommerce">متجر إلكتروني</option>
                      <option value="landing">موقع تعريفي (Landing Page)</option>
                      <option value="web">منصة أو موقع ويب تفاعلي</option>
                      <option value="mobile">تطبيقات الهواتف</option>
                      <option value="design">تصميم واجهات وتجربة المستخدم (UI/UX)</option>
                      <option value="operations">أنظمة داخلية وإدارة عمليات</option>
                      <option value="discovery">استشارة وبحث تقني</option>
                      <option value="other">أخرى / غير متأكد</option>
                    </select>
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-xs font-bold tracking-wide text-[#F0F0F0]">نبذة عن المشروع</label>
                    <textarea 
                      required name="brief" 
                      className="min-h-[160px] w-full resize-y border border-[#2A2B2F] bg-[#161719] px-4 py-3 text-sm text-[#F0F0F0] placeholder-[#4A4B4E] outline-none transition-colors focus:border-[#C8A97E]/50 focus:bg-[#1C1D20]" 
                      placeholder="صف لنا المشكلة التي تحاول حلها، أو الفرصة التي تستهدفها، وما هي أهم النتائج التي تتوقعها من هذا المشروع..." 
                    />
                  </div>
                </div>

                {submissionError && (
                  <div role="alert" className="flex items-start gap-3 border border-red-500/20 bg-red-500/10 p-4 text-sm leading-6 text-red-200">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                    {submissionError}
                  </div>
                )}

                <div className="mt-8 flex flex-col items-center justify-between gap-6 border-t border-[#2A2B2F] pt-8 sm:flex-row">
                  <p className="flex max-w-sm items-start gap-2 text-[0.75rem] leading-[1.8] text-[#8A8B8E]">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#C8A97E]" />
                    نلتزم بالحفاظ على سرية المعلومات ولن نشاركها مع أي طرف ثالث. يرجى عدم تضمين بيانات مالية أو أرقام سرية.
                  </p>
                  
                  <button 
                    type="submit" 
                    disabled={submit.isPending} 
                    className="inline-flex shrink-0 items-center gap-2 rounded-sm bg-[#C8A97E] px-8 py-3.5 text-sm font-bold text-[#0E0F11] transition-all hover:bg-[#d6b78b] disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {submit.isPending ? "جارٍ إرسال الطلب..." : "إرسال الطلب"} 
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

