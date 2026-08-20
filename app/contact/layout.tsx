import type { Metadata } from "next";
import { buildPageMetadata } from "@/content/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "تواصل مع ORA — شركة تقنية في اليمن",
  description: "تواصل مع ORA عبر البريد أو الهاتف أو نموذج الرسائل لبدء مشروع موقع أو منصة أو تطبيق هاتف في اليمن.",
  path: "/contact",
  keywords: ["التواصل مع شركة تقنية", "شركة برمجة صنعاء", "ora.dev.08@gmail.com", "تطوير تطبيقات اليمن"],
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
