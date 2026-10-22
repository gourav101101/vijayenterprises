import type { Metadata } from "next";
import "./globals.css";
import "./brand-theme.css";

export const metadata: Metadata = {
  title: { default: "Vijay Enterprises — Infrastructure. In motion.", template: "%s | Vijay Enterprises" },
  description: "Explore power infrastructure, telecom power, solar installation and civil project support with Vijay Enterprises.",
  robots: { index: false, follow: false },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
