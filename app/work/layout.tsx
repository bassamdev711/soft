import type { Metadata } from "next";
import { buildPageMetadata } from "@/content/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "أعمال ORA ودراسات الحالة",
  description: "استكشف أعمال ORA ودراسات الحالة التي توضح السياق والقرارات والنتائج في المشاريع الرقمية.",
  path: "/work",
  keywords: ["أعمال شركة تقنية", "دراسات حالة برمجية", "مشاريع مواقع وتطبيقات", "Portfolio ORA"],
});

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return children;
}
