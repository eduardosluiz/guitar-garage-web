// src/components/common/Header.tsx
import { prisma } from '@/lib/prisma';
import HeaderClient from './HeaderClient';

export default async function Header() {
  const config = await prisma.configuracao.findFirst({
    where: { id: 1 }
  });

  return (
    <HeaderClient 
      whatsapp={config?.whatsapp || "(51) 99189-8846"}
      telefone={config?.telefone || "(51) 3331.3234"}
      socials={{
        instagram: config?.instagramUrl || '',
        facebook: config?.facebookUrl || '',
        youtube: config?.youtubeUrl || '',
        spotify: config?.spotifyUrl || '',
        whatsapp: config?.whatsapp || ''
      }}
      visibility={{
        instagram: config?.showInstagram ?? true,
        facebook: config?.showFacebook ?? true,
        youtube: config?.showYoutube ?? true,
        spotify: config?.showSpotify ?? true,
        whatsapp: config?.showWhatsapp ?? true
      }}
    />
  );
}
