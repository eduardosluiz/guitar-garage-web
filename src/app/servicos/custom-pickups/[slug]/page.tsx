// src/app/servicos/custom-pickups/[slug]/page.tsx
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import ToneDetailClient from '../ToneDetailClient';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

export const dynamic = 'force-dynamic';

export default async function TonePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Buscar todos os registros associados a esta posição (slug base e card-slug)
  const banners = await prisma.banner.findMany({
    where: { 
      OR: [
        { posicao: slug },
        { posicao: `card-${slug}` }
      ],
      isAtivo: true 
    },
    include: {
      media: {
        orderBy: { ordem: 'asc' }
      }
    },
    orderBy: { id: 'desc' } // O mais recente primeiro
  });

  if (banners.length === 0) {
    notFound();
  }

  // O registro do CARD deve fornecer o título e a descrição oficial para a página interna
  const cardBanner = banners.find(b => b.posicao === `card-${slug}`);
  const mainBanner = cardBanner || banners[0];

  const config = await prisma.configuracao.findFirst();

  // Agregar TODAS as mídias de todos os registros (Áudios dos registros de tom + Imagem do registro de card)
  const allMedia = banners.flatMap(banner => 
    banner.media.map(m => ({
      url: m.url,
      tipo: m.tipo as 'audio' | 'imagem',
      ordem: m.ordem,
      titulo: banner.titulo // Usamos o título do registro específico para dar nome ao sample
    }))
  );

  // Mapear dados para o formato do Tone
  const tone = {
    name: mainBanner.titulo || slug.toUpperCase().replace('-', ' '),
    tag: mainBanner.preTitulo || "GUITAR GARAGE CUSTOM",
    description: mainBanner.subtitulo || "Desenvolvido com especificações rigorosas de época para entregar o timbre perfeito.",
    specs: [
      { label: "Modelo", value: "Vintage Spec" },
      { label: "Enrolamento", value: "Scatter Wound" },
      { label: "Material", value: "Fio de época e Alnico 5" }
    ],
    media: allMedia
  };

  return (
    <>
      <Header />
      <ToneDetailClient tone={tone} whatsapp={config?.whatsapp || "555133313234"} />
      <Footer />
    </>
  );
}
