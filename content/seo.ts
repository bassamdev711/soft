import type { Metadata } from "next";

/**
 * عنوان الموقع الأساسي المعتمد لمحركات البحث ووسوم المشاركة.
 * يبقى ثابتًا أثناء انتقال النطاق حتى لا تعيد متغيرات بيئة قديمة نشر روابط النطاق السابق.
 */
export const siteUrl = "https://orasoft.vercel.app";
export const siteName = "ORA";
export const defaultKeywords = [
  "ORA",
  "شركة ORA التقنية",
  "شركة تقنية في اليمن",
  "تطوير تطبيقات الهواتف في اليمن",
  "تطوير مواقع الويب",
  "تصميم تجربة المستخدم",
  "حلول رقمية للشركات",
  "تطوير منصات رقمية",
  "صنعاء",
];

export function buildPageMetadata({
  title,
  description,
  path,
  keywords = [],
  image = "/brand/ora-official-lockup.png",
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
}): Metadata {
  const canonical = new URL(path, siteUrl).toString();
  const imageUrl = new URL(image, siteUrl).toString();
  return {
    title,
    description,
    keywords: [...defaultKeywords, ...keywords],
    alternates: { canonical },
    openGraph: {
      type: "website",
      locale: "ar_YE",
      url: canonical,
      siteName,
      title,
      description,
      images: [{ url: imageUrl, width: 1920, height: 1920, alt: `${siteName} — الهوية الرسمية` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}
