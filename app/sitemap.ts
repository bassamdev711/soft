import type { MetadataRoute } from "next";
import { services } from "@/content/site";
import { siteUrl } from "@/content/seo";
import { listPublishedPortfolio } from "@/server/db";

export const revalidate = 3600;

const publicRoutes = ["/", "/about", "/services", "/work", "/faq", "/contact", "/request"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = publicRoutes.map(path => ({
    url: new URL(path, siteUrl).toString(),
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === "/services" || path === "/work" ? 0.9 : 0.7,
  }));

  entries.push(...services.map(service => ({
    url: new URL(`/services/${service.slug}`, siteUrl).toString(),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  })));

  try {
    const works = await listPublishedPortfolio();
    entries.push(...works.map(work => ({
      url: new URL(`/work/${work.slug}`, siteUrl).toString(),
      lastModified: work.updatedAt ?? work.publishedAt ?? work.createdAt,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })));
  } catch {
    // The public sitemap remains valid during builds where the production database is unavailable.
  }

  return entries;
}
