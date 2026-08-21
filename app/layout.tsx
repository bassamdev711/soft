import "./globals.css";
import { ThemeProvider } from "../components/ThemeContext";
import { TooltipProvider } from "../components/ui/tooltip";
import { Toaster } from "../components/ui/sonner";
import ErrorBoundary from "../components/ErrorBoundary";
import { TRPCReactProvider } from "../components/trpc-provider";
import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans_Arabic } from "next/font/google";
import { defaultCompanyContact } from "@/content/company";
import { defaultKeywords, siteName, siteUrl } from "@/content/seo";

const sansArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-sans-arabic",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ORA — شركة تقنية وحلول رقمية في اليمن",
    template: "%s | ORA",
  },
  description: "ORA شركة تقنية في اليمن تساعد فرق الأعمال على بناء المواقع والمنصات وتطبيقات الهواتف وحلول رقمية قابلة للنمو.",
  keywords: defaultKeywords,
  alternates: { canonical: siteUrl },
  applicationName: siteName,
  verification: {
    google: "AcBaYNg05HrVUKTzav9BRY7syPNaOdYHWPP70dug2JI",
  },
  icons: {
    icon: [{ url: "/brand/ora-official-lockup-alpha.png", type: "image/png" }],
    shortcut: "/brand/ora-official-lockup-alpha.png",
    apple: "/brand/ora-official-lockup-alpha.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    type: "website",
    locale: "ar_YE",
    title: "ORA — شركة تقنية وحلول رقمية في اليمن",
    description: "حلول رقمية واضحة من الفكرة إلى الإطلاق: مواقع، منصات، تطبيقات هواتف، وتجارب رقمية.",
    url: siteUrl,
    siteName,
    images: [{ url: "/brand/ora-official-lockup.png", width: 1920, height: 1920, alt: "الشعار الرسمي لـ ORA" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ORA — شركة تقنية وحلول رقمية في اليمن",
    description: "مواقع ومنصات وتطبيقات هواتف وحلول رقمية قابلة للنمو.",
    images: ["/brand/ora-official-lockup.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={`${sansArabic.variable} ${mono.variable}`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: siteName,
          alternateName: "ORA",
          url: siteUrl,
          logo: new URL("/brand/ora-official-lockup-alpha.png", siteUrl).toString(),
          image: new URL("/brand/ora-official-lockup.png", siteUrl).toString(),
          description: "شركة تقنية في اليمن تقدم تطوير المواقع والمنصات وتطبيقات الهواتف والحلول الرقمية.",
          email: defaultCompanyContact.email,
          telephone: defaultCompanyContact.phone,
          address: { "@type": "PostalAddress", addressLocality: "صنعاء", addressCountry: "YE" },
          areaServed: { "@type": "Country", name: "اليمن" },
          priceRange: "$$",
          knowsAbout: ["تطوير تطبيقات الهواتف", "تطوير مواقع الويب", "تصميم تجربة المستخدم", "التحول الرقمي"],
        }) }} />
        <ErrorBoundary>
          <TRPCReactProvider>
            <ThemeProvider defaultTheme="dark" switchable={false}>
              <TooltipProvider>
                <Toaster richColors position="top-center" />
                {children}
              </TooltipProvider>
            </ThemeProvider>
          </TRPCReactProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
