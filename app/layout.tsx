import "./globals.css";
import { LanguageProvider } from "./components/LanguageProvider";
import { ThemeProvider } from "./components/ThemeProvider";
import MotionStyles from "../app/components/MotionStyles";
import FluidBackdrop from "./components/FluidBackdrop";
import type { Metadata } from "next";


const site =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://durlabhclapfoundation.org";

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: {
    default: "DurlabhCLAP Foundation",
    template: "%s | DurlabhCLAP Foundation",
  },
  description:
    "Arts-based joyful learning culture aligned with NEP 2020 — creativity, critical thinking, life skills, and local context.",
  alternates: { canonical: site },
  openGraph: {
    title: "DurlabhCLAP Foundation",
    description:
      "Protect creators and make learning joyful. Arts-based learning culture aligned with NEP 2020.",
    url: site,
    siteName: "DurlabhCLAP Foundation",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "DurlabhCLAP Foundation" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DurlabhCLAP Foundation",
    description: "Protect creators and make learning joyful.",
    images: ["/opengraph-image"],
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: "DurlabhCLAP Foundation",
  url: site,
  logo: `${site}/dcf-logo.png`,
  areaServed: "Himachal Pradesh, India",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Shahpur",
    addressRegion: "Himachal Pradesh",
    addressCountry: "IN",
  },
  sameAs: [
    // Add real URLs when ready
    // "https://instagram.com/...",
    // "https://youtube.com/...",
    // "https://linkedin.com/..."
  ],
};

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
/>;


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <LanguageProvider>
            <MotionStyles />
            <FluidBackdrop />
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
