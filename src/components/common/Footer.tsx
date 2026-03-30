// src/components/common/Footer.tsx
import { prisma } from '@/lib/prisma';
import FooterClient from './FooterClient';

export default async function Footer() {
  const config = await prisma.configuracao.findFirst({
    where: { id: 1 }
  });

  return (
    <FooterClient 
      whatsapp={config?.whatsapp || "(51) 99189-8846"}
      email={config?.emailContato || "contato@guitargarage.com.br"}
      telefone={config?.telefone || "(51) 3331.3234"}
      socials={{
        instagram: config?.instagramUrl || "https://instagram.com/guitargarage",
        facebook: config?.facebookUrl || "https://facebook.com/guitargarage",
        youtube: config?.youtubeUrl || "https://youtube.com/guitargarage"
      }}
      visibility={{
        instagram: config?.showInstagram ?? true,
        facebook: config?.showFacebook ?? true,
        youtube: config?.showYoutube ?? true
      }}
    />
  );
}
