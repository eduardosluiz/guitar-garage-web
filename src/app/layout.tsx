// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/common/AuthProvider";

export const metadata: Metadata = {
  title: "Guitar Garage 2.0 | Boutique de Instrumentos",
  description: "Curadoria exclusiva de instrumentos premium e vintage.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body suppressHydrationWarning>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
