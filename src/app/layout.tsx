// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/common/AuthProvider";
import CookieConsent from "@/components/common/CookieConsent";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  metadataBase: new URL("https://guitargarage.com.br"),
  title: "Guitar Garage Instrumentos Vintage Cuidadosamente Selecionados",
  description: "Loja do guitarrista Solon Fishbone",
  openGraph: {
    title: "Guitar Garage Instrumentos Vintage Cuidadosamente Selecionados",
    description: "Loja do guitarrista Solon Fishbone",
    url: "https://guitargarage.com.br",
    siteName: "Guitar Garage",
    images: [
      {
        url: "/guitargarage.png",
        width: 1200,
        height: 630,
        alt: "Guitar Garage - Instrumentos Vintage",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Guitar Garage Instrumentos Vintage Cuidadosamente Selecionados",
    description: "Loja do guitarrista Solon Fishbone",
    images: ["/guitargarage.png"],
  },
  icons: {
    icon: "/guitargarage.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let config = null;
  try {
    config = await prisma.configuracao.findFirst({
      select: {
        trackingScriptsHead: true,
        trackingScriptsBody: true,
      },
    });
  } catch (error) {
    console.error("Erro ao carregar scripts de rastreamento:", error);
  }

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {config?.trackingScriptsHead && (
          <div
            id="tracking-scripts-head"
            style={{ display: "none" }}
            dangerouslySetInnerHTML={{ __html: config.trackingScriptsHead }}
          />
        )}
        {config?.trackingScriptsBody && (
          <div
            id="tracking-scripts-body"
            style={{ display: "none" }}
            dangerouslySetInnerHTML={{ __html: config.trackingScriptsBody }}
          />
        )}
        <AuthProvider>
          {children}
          <CookieConsent />
        </AuthProvider>
      </body>
    </html>
  );
}
