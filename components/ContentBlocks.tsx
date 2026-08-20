"use client";

import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqs, type Service } from "@/content/site";

/* ─────────────────────────────────────────
   SERVICE CARD — Editorial list item
   No icon circles. No glassmorphism. No glow.
   Hover: accent line + title brightens + arrow animates.
───────────────────────────────────────── */
export function ServiceCard({ service, className = "" }: { service: Service; className?: string }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className={`group relative flex flex-col py-7 transition-all duration-200 ${className}`}
    >
      {/* Brand signature: accent line on right on hover */}
      <span
        className="absolute right-0 top-0 h-full w-0.5 origin-top scale-y-0 bg-[#C8A97E] transition-transform duration-200 group-hover:scale-y-100"
        aria-hidden="true"
      />

      <div className="flex min-w-0 items-start justify-between gap-4 pr-5 sm:gap-6">
        <div className="min-w-0 flex-1">
          <div>
            <h3 className="t-h3 break-words text-[#8A8B8E] transition-colors duration-200 group-hover:text-[#F0F0F0]">
              {service.title}
            </h3>
          </div>
          <p className="mt-2.5 break-words text-[0.875rem] leading-[1.7] text-[#4A4B4E] transition-colors duration-200 group-hover:text-[#8A8B8E]">
            {service.short}
          </p>
        </div>
        <ArrowLeft
          className="mt-1 h-4 w-4 shrink-0 text-[#2A2B2F] transition-all duration-200 group-hover:text-[#C8A97E] group-hover:-translate-x-1"
          aria-hidden="true"
        />
      </div>
    </Link>
  );
}

/* ─────────────────────────────────────────
   FAQ LIST — Clean accordion, no borders on glow
───────────────────────────────────────── */
export function FaqList({ limit }: { limit?: number }) {
  const items = limit ? faqs.slice(0, limit) : faqs;
  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map((faq, index) => (
        <AccordionItem
          value={`faq-${index}`}
          key={faq.question}
          className="border-[#2A2B2F]"
        >
          <AccordionTrigger className="py-5 text-right text-[0.9375rem] font-medium leading-[1.65] text-[#C8C9CC] transition-colors duration-150 hover:no-underline hover:text-[#F0F0F0]">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="max-w-2xl pb-5 text-[0.875rem] leading-[1.85] text-[#8A8B8E]">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

/* ─────────────────────────────────────────
   CTA SECTION — Minimal, confident, no decorations
   No gradient container, no floating circles, no glow.
───────────────────────────────────────── */
export function CTASection() {
  return (
    <section className="border-t border-[#2A2B2F] bg-[#0E0F11]">
      <div className="container py-16 sm:py-28">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="eyebrow mb-6">نقطة البداية</p>
            <h2 className="t-display max-w-2xl text-[#F0F0F0] break-words">
              لديك فكرة أو عملية تحتاج إلى وضوح أكثر؟
            </h2>
            <p className="mt-5 max-w-lg text-[0.9375rem] leading-[1.85] text-[#8A8B8E]">
              شاركنا سياقًا بسيطًا عن فكرتك أو تحديك، ثم نرتب الخطوة التي تجعل الاستثمار في الحل أكثر وعيًا.
            </p>
          </div>
          <div className="flex flex-col items-start gap-3 lg:items-end lg:pb-1">
            <Link
              href="/request"
              className="button-primary"
            >
              ابدأ طلب مشروع <ArrowLeft className="h-4 w-4" />
            </Link>
            <p className="text-[0.6875rem] text-[#4A4B4E]">نطلب فقط ما نحتاجه لفهم البداية.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   DELIVERABLE LIST — Clean checkmarks, accent accents
───────────────────────────────────────── */
export function DeliverableList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3">
      {items.map(item => (
        <li key={item} className="flex items-center gap-3 text-[0.9rem] text-[#C8C9CC]">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-[#C8A97E]/25 bg-[#C8A97E]/8">
            <Check className="h-3 w-3 text-[#C8A97E]" />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}
