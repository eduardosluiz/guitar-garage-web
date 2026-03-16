// src/app/admin/banners/[id]/page.tsx
import React from 'react';
import { prisma } from '@/lib/prisma';
import BannerForm from '@/components/admin/BannerForm';
import { notFound } from 'next/navigation';
import styles from '../../produtos/novo/page.module.css';

export default async function EditarBanner({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const bannerId = parseInt(id);

  if (isNaN(bannerId)) notFound();

  const banner = await prisma.banner.findUnique({
    where: { id: bannerId }
  });

  if (!banner) notFound();

  return (
    <div className={styles.container}>
      <BannerForm initialData={banner} />
    </div>
  );
}
