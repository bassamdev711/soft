import type { Metadata } from "next";
import { buildPageMetadata } from "@/content/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "من نحن — شركة ORA التقنية في اليمن",
  description: "تعرف على منهج ORA في اكتشاف المنتجات وتصميم التجارب وبناء الحلول الرقمية مع فرق الأعمال في اليمن.",
  path: "/about",
  keywords: ["عن ORA", "شركة تقنية يمنية", "فريق تطوير برمجيات في اليمن"],
});

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
