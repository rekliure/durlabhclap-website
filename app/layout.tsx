// app/layout.tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "DurlabhCLAP Foundation",
    template: "%s | DurlabhCLAP Foundation",
  },
  description:
    "Reimagining rural education through creativity, care and culture. DurlabhCLAP Foundation works with preschool and primary children in rural Himachal Pradesh through arts-based learning.",
  metadataBase: new URL("https://durlabhclapfoundation.org"),
  openGraph: {
    title: "DurlabhCLAP Foundation",
    description:
      "Reimagining rural education through creativity, care and culture in rural Himachal Pradesh.",
    url: "/",
    siteName: "DurlabhCLAP Foundation",
    images: ["/og-image.jpg"], // optional – file na bhi ho to build tootega nahi
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DurlabhCLAP Foundation",
    description:
      "Reimagining rural education through creativity, care and culture.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
