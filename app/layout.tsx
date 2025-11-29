import "./globals.css";
import { LanguageProvider } from "./components/LanguageProvider";
import { ThemeProvider } from "./components/ThemeProvider";
import MotionStyles from "../app/components/MotionStyles";
import FluidBackdrop from "./components/FluidBackdrop";
import type { Metadata } from "next";
import Script from "next/script";


const site =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://durlabhclapfoundation.org";

export const metadata = {
  metadataBase: new URL("https://durlabhclapfoundation.org"),
  title: {
    default: "Durlabhclap Foundation | Arts-Based Joyful Learning",
    template: "%s | Durlabhclap Foundation"
  },
  description:
    "Durlabhclap Foundation is building an arts-based joyful learning culture aligned with NEP 2020, ensuring every child remains a creator.",
  keywords: [
    "Durlabhclap Foundation",
    "Durlabh Clap Foundation",
    "Arts-based learning NGO",
    "Creative education India",
    "Joyful learning",
    "Rural education initiative"
  ],
  openGraph: {
    title: "Durlabhclap Foundation",
    description:
      "Protecting creativity and making learning joyful for every child.",
    url: "https://durlabhclapfoundation.org",
    siteName: "Durlabhclap Foundation",
    images: ["/og-image.png"],
    locale: "en_IN",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico"
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

        <Script
  type="application/ld+json"
  id="org-schema"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Durlabhclap Foundation",
      alternateName: ["Durlabh Clap Foundation"],
      url: "https://durlabhclapfoundation.org",
      logo: "https://durlabhclapfoundation.org/logo.png",
      sameAs: [
        "https://www.instagram.com/durlabhclapfoundation/",
        "https://www.facebook.com/profile.php?id=100066918507014",
        "https://www.youtube.com/@DurlabhClapFoundation"
      ],
      description:
        "Durlabhclap Foundation builds an arts-based joyful learning culture aligned with NEP 2020.",
      foundingDate: "2024",
      founder: {
        "@type": "Person",
        name: "Sahil Dogra"
      }
    }),
  }}
/>

      </body>
    </html>
  );
}

