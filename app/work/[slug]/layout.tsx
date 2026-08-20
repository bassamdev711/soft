import type { Metadata } from "next";
import { buildPageMetadata, siteName, siteUrl } from "@/content/seo";
import { getPortfolioBySlug } from "@/server/db";
import { getFeaturedPortfolioBySlug } from "@/content/portfolio";

async function getWork(slug: string) {
  const featured = getFeaturedPortfolioBySlug(slug);
  if (featured) return featured;
  try {
    return await getPortfolioBySlug(slug);
  } catch {
    return undefined;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const work = await getWork(slug);
  return buildPageMetadata({
    title: work ? `${work.title} — دراسة حالة ORA` : "دراسة حالة غير متاحة",
    description: work?.excerpt ?? "دراسة حالة من أعمال ORA في الحلول الرقمية.",
    path: `/work/${slug}`,
    keywords: [work?.title ?? "دراسة حالة تقنية", work?.service ?? "حلول رقمية", "أعمال شركة تقنية في اليمن"],
    image: work?.coverImageUrl ?? "/brand/ora-official-lockup.png",
  });
}

export default async function WorkDetailLayout({ children, params }: { children: React.ReactNode; params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const work = await getWork(slug);
  return <>
    {work && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: work.title,
      description: work.excerpt,
      url: new URL(`/work/${work.slug}`, siteUrl).toString(),
      image: work.coverImageUrl,
      creator: { "@type": "Organization", name: siteName, url: siteUrl },
      keywords: [work.service, work.category].filter(Boolean).join(", "),
    }) }} />}
    {children}
  </>;
}
