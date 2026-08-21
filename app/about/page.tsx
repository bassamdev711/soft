"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2, Hexagon, Layers, Cpu } from "lucide-react";
import { SiteShell } from "@/components/SiteChrome";
import { motion } from "framer-motion";

const principles = [
  { 
    icon: Layers, 
    title: "هندسة معمارية صلبة", 
    text: "لا نكتفي بكتابة الأكواد؛ بل نصمم بنية تحتية برمجية قابلة للتوسع، قادرة على تحمل الضغط والنمو المستمر لأعمالك." 
  },
  { 
    icon: Hexagon, 
    title: "تجربة مستخدم استثنائية", 
    text: "نؤمن أن التصميم ليس مجرد شكل جمالي، بل هو الأداة الأقوى لتوجيه سلوك المستخدم وتحقيق أهداف العمل بدقة." 
  },
  { 
    icon: Cpu, 
    title: "أداء فائق واستدامة", 
    text: "نعتمد أحدث التقنيات وأفضل الممارسات لضمان سرعة الاستجابة، الأمان العالي، واستدامة الحلول التقنية على المدى الطويل." 
  },
];

export default function About() {
  return (
    <SiteShell>
      {/* ── Premium Editorial Hero ── */}
      <section className="relative overflow-hidden border-b border-[#2A2B2F] bg-[#0E0F11] pt-24 pb-20 sm:pt-32 sm:pb-28">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 70% 60% at 85% 0%, rgba(200,169,126,.06), transparent 70%)" }}
        />
        
        <div className="container relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <span className="h-px w-8 bg-[#C8A97E]/50" />
            <span className="font-mono text-[10.5px] font-bold uppercase tracking-[.25em] text-[#C8A97E]">
              عن الشركة
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 max-w-4xl font-display text-4xl font-bold leading-[1.1] tracking-[-0.02em] text-[#F0F0F0] sm:text-5xl lg:text-[4rem]"
          >
            نحن ORA.
            <br />
            <span className="text-[#8A8B8E]">نبني الحلول التقنية بمعايير عالمية.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 max-w-2xl text-base leading-[1.9] text-[#8A8B8E] sm:text-lg"
          >
            شركة تقنية رائدة، متخصصة في هندسة البرمجيات وتطوير المنصات الرقمية المتكاملة. نجمع بين الخبرة العميقة والفهم الاستراتيجي للأعمال لنقدم حلولاً تقنية لا تواكب الحاضر فحسب، بل تصنع المستقبل.
          </motion.p>
        </div>
      </section>

      {/* ── Manifesto / Philosophy Split ── */}
      <section className="bg-[#0E0F11] py-20 sm:py-32">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-24">
            
            <div className="lg:sticky lg:top-32 lg:h-fit">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[.2em] text-[#8A8B8E]">
                فلسفتنا في العمل
              </p>
              <h2 className="mt-5 font-display text-3xl font-bold leading-[1.2] text-[#F0F0F0] sm:text-4xl">
                التقنية الحقيقية هي التي <span className="text-[#C8A97E]">تختفي خلف نجاح أعمالك.</span>
              </h2>
            </div>
            
            <div className="space-y-8 text-[0.95rem] leading-[2] text-[#8A8B8E]">
              <p>
                في ORA، لا ننظر إلى التكنولوجيا كغاية في حد ذاتها، بل كأداة جبارة لتحويل الرؤى الطموحة إلى واقع ملموس. نحن ندرك أن المشاريع الكبرى لا تنجح بمجرد كتابة الأكواد، بل تحتاج إلى هندسة دقيقة، تخطيط استراتيجي، وتنفيذ لا يقبل المساومة على الجودة.
              </p>
              <p>
                منذ انطلاقتنا، تبنينا منهجية صارمة تعتمد على دراسة السياق الكامل للعمل التجاري قبل البدء في التنفيذ التقني. هذا يضمن أن كل منصة نطورها، وكل نظام نبنيه، يخدم الأهداف المباشرة للشركة ويمتلك المرونة الكافية للتكيف مع التغيرات المستقبلية.
              </p>
              
              <div className="border-t border-[#2A2B2F] pt-8 mt-4 grid sm:grid-cols-2 gap-6">
                {[
                  "شراكة استراتيجية طويلة الأمد",
                  "أكواد نظيفة وقابلة للصيانة",
                  "تحليل دقيق لمتطلبات الأعمال",
                  "دعم فني وتطوير مستمر"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[#C8A97E]" />
                    <span className="text-[#F0F0F0] text-sm font-semibold">{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="pt-6">
                <Link 
                  href="/work" 
                  className="inline-flex items-center gap-2 border-b border-[#C8A97E] pb-1 text-sm font-bold text-[#C8A97E] transition-all hover:border-transparent hover:text-[#F0F0F0]"
                >
                  استكشف مشاريعنا <ArrowLeft className="h-4 w-4" />
                </Link>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* ── Pillars / Principles ── */}
      <section className="border-t border-[#2A2B2F] bg-[#161719] py-20 sm:py-32">
        <div className="container">
          <div className="mb-14 max-w-2xl">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[.2em] text-[#C8A97E]">
              ركائزنا
            </p>
            <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-[#F0F0F0] sm:text-4xl">
              المعايير التي لا نتنازل عنها.
            </h2>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3">
            {principles.map(({ icon: Icon, title, text }, index) => (
              <motion.article 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                key={title} 
                className="group relative overflow-hidden border border-[#2A2B2F] bg-[#0E0F11] p-8 transition-colors duration-300 hover:border-[#C8A97E]/30"
              >
                <div className="absolute top-0 right-0 h-1 w-0 bg-[#C8A97E] transition-all duration-300 group-hover:w-full" />
                
                <span className="mb-6 inline-flex h-12 w-12 items-center justify-center border border-[#2A2B2F] bg-[#161719] text-[#C8A97E] transition-colors group-hover:border-[#C8A97E]/30 group-hover:bg-[#C8A97E]/10">
                  <Icon className="h-5 w-5" />
                </span>
                
                <h3 className="font-display text-xl font-bold text-[#F0F0F0]">
                  {title}
                </h3>
                
                <p className="mt-4 text-[0.875rem] leading-[1.8] text-[#8A8B8E]">
                  {text}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Simple Bold CTA ── */}
      <section className="border-t border-[#2A2B2F] bg-[#0E0F11] py-24 text-center">
        <div className="container flex flex-col items-center">
          <h2 className="font-display text-3xl font-bold leading-tight text-[#F0F0F0] sm:text-4xl">
            هل لديك مشروع طموح؟
          </h2>
          <p className="mt-4 max-w-lg text-[0.95rem] leading-[1.8] text-[#8A8B8E]">
            نحن هنا لنحوّل التحديات التقنية إلى قصص نجاح حقيقية. فريق ORA جاهز لدراسة فكرتك وتقديم أفضل الحلول.
          </p>
          <Link
            href="/request"
            className="mt-8 inline-flex items-center gap-2.5 rounded-sm border border-[#C8A97E]/30 bg-[#C8A97E]/8 px-8 py-3.5 text-sm font-bold text-[#C8A97E] transition-all duration-200 hover:border-[#C8A97E]/60 hover:bg-[#C8A97E]/15 hover:shadow-[0_0_16px_rgba(200,169,126,0.15)]"
          >
            ابدأ مشروعك الآن
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}

