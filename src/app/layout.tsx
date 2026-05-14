// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/common/AuthProvider";
import CookieConsent from "@/components/common/CookieConsent";

export const metadata: Metadata = {
  title: "Guitar Garage 2.0 | Boutique de Instrumentos",
  description: "Curadoria exclusiva de instrumentos premium e vintage.",
  icons: {
    icon: "/guitargarage.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AuthProvider>
          {children}
          <CookieConsent />
        </AuthProvider>
      </body>
    </html>
  );
}
