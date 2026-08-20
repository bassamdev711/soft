import type { Metadata } from "next";
import { buildPageMetadata } from "@/content/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "ابدأ مشروعك مع ORA",
  description: "أرسل سياق مشروعك إلى ORA لبدء نقاش حول موقع أو منصة أو تطبيق هاتف أو تحسين عملية رقمية في اليمن.",
  path: "/request",
  keywords: ["طلب مشروع برمجي", "تطوير تطبيق في اليمن", "بناء منصة رقمية", "شركة تقنية صنعاء"],
});

export default function RequestLayout({ children }: { children: React.ReactNode }) {
  return children;
}
