// src/app/admin/tones/page.tsx
import React from 'react';
import { prisma } from '@/lib/prisma';
import TonesList from '@/components/admin/TonesList';

export default async function AdminTones() {
  // Buscar apenas itens relacionados a TONES
  const tones = await prisma.banner.findMany({
    where: {
      OR: [
        { posicao: 'custom-pickups' },
        { posicao: { startsWith: 'card-' } },
        { posicao: 'two-tone' },
        { posicao: 'three-tone' },
        { posicao: 'buttertone' }
      ]
    },
    include: {
      media: true
    },
    orderBy: [
      { ordem: 'asc' },
      { id: 'desc' }
    ]
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <TonesList initialTones={tones} />
    </div>
  );
}
