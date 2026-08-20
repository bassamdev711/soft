import type { Metadata } from "next";
import { services } from "@/content/site";
import { buildPageMetadata, siteName, siteUrl } from "@/content/seo";

export function generateStaticParams() {
  return services.map(service => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find(item => item.slug === slug);
  if (!service) return buildPageMetadata({ title: "الخدمة غير متاحة", description: "هذه الخدمة غير متاحة حاليًا.", path: `/services/${slug}` });
  return buildPageMetadata({
    title: `${service.title} — ORA`,
    description: service.description,
    path: `/services/${service.slug}`,
    keywords: [service.title, service.short, "شركة تقنية في اليمن"],
  });
}

export default async function ServiceDetailLayout({ children, params }: { children: React.ReactNode; params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find(item => item.slug === slug);
  return <>
    {service && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.title,
      description: service.description,
      provider: { "@type": "Organization", name: siteName, url: siteUrl },
      areaServed: { "@type": "Country", name: "اليمن" },
      serviceType: service.title,
      url: new URL(`/services/${service.slug}`, siteUrl).toString(),
    }) }} />}
    {children}
  </>;
}
