import type { Metadata } from "next";
import "../styles/globals.css";

const siteName = "MJ Global Leisure";
const siteDescription =
  "Experience the pristine beaches and crystal-clear waters of Sri Lanka with MJ Global Leisure. Luxury tours, wildlife, heritage, and adventure across the island.";

export const metadata: Metadata = {
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  icons: {
    icon: "/images/logo/mj_logo.png",
    apple: "/images/logo/mj_logo.png",
  },
  openGraph: {
    type: "website",
    siteName,
    title: siteName,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased text-gray-900">{children}</body>
    </html>
  );
}
