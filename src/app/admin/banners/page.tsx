// src/app/admin/banners/page.tsx
import React from 'react';
import { prisma } from '@/lib/prisma';
import BannerList from '@/components/admin/BannerList';

export default async function AdminBanners() {
  const banners = await prisma.banner.findMany({
    orderBy: [
      { ordem: 'asc' },
      { id: 'desc' }
    ]
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <BannerList initialBanners={banners} />
    </div>
  );
}
