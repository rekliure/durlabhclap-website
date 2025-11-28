import type { Metadata } from "next";

const site =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://durlabhclapfoundation.org";

export const metadata: Metadata = {
  title: "Our Journey — DurlabhCLAP Foundation",
  description:
    "Stage-by-stage journey of how arts-based learning becomes a culture — from foundation to replication-ready impact.",
  alternates: {
    canonical: `${site}/journey`,
  },
  openGraph: {
    title: "Our Journey — DurlabhCLAP Foundation",
    description:
      "A transformation you can feel — stage by stage. Protect creators and make learning joyful.",
    url: `${site}/journey`,
    siteName: "DurlabhCLAP Foundation",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "DurlabhCLAP Foundation" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Journey — DurlabhCLAP Foundation",
    description:
      "Stage-by-stage journey of how arts-based learning becomes a culture.",
    images: ["/opengraph-image"],
  },
};

export default function JourneyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
