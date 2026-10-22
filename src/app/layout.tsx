import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next.js + Capacitor Boilerplate",
  description:
    "A Next.js, Tailwind CSS, and Capacitor starter for shipping a static web app as a native Android app.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0a0a0b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-ink">
      <body className="min-h-dvh bg-ink text-paper antialiased">{children}</body>
    </html>
  );
}
