import type { Metadata } from "next";
import { buildPageMetadata } from "@/content/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "الخدمات التقنية — مواقع ومنصات وتطبيقات هواتف",
  description: "خدمات ORA تشمل اكتشاف المنتج، تصميم تجربة المستخدم، تطوير منصات الويب، تطوير تطبيقات الهواتف، وتحسين العمليات الرقمية.",
  path: "/services",
  keywords: ["خدمات تقنية في اليمن", "تطوير تطبيقات الهواتف", "تطوير منصات الويب", "تصميم UX UI"],
});

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
