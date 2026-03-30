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
    />
  );
}
