// src/app/admin/configuracoes/page.tsx
import React from 'react';
import { prisma } from '@/lib/prisma';
import SettingsForm from '@/components/admin/SettingsForm';
import styles from '../produtos/novo/page.module.css';

export default async function AdminConfiguracoes() {
  const config = await prisma.configuracao.findFirst({
    select: {
      id: true,
      whatsapp: true,
      emailContato: true,
      instagramUrl: true,
      showInstagram: true,
      facebookUrl: true,
      showFacebook: true,
      youtubeUrl: true,
      showYoutube: true,
      telefone: true,
      updatedAt: true,
    }
  });

  return (
    <div className={styles.container}>
      <SettingsForm initialData={config} />
    </div>
  );
}
