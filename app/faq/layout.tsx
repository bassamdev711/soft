import type { Metadata } from "next";
import { buildPageMetadata } from "@/content/seo";
import { faqs } from "@/content/site";

export const metadata: Metadata = buildPageMetadata({
  title: "الأسئلة الشائعة عن خدمات ORA",
  description: "إجابات واضحة عن طريقة عمل ORA في اكتشاف المنتجات وتصميم التجارب وتطوير المواقع والمنصات وتطبيقات الهواتف.",
  path: "/faq",
  keywords: ["أسئلة شركة تقنية", "كيف تبدأ مشروعًا تقنيًا", "تطوير تطبيقات ومواقع اليمن"],
});

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  const structuredData = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(item => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    {children}
  </>;
}
