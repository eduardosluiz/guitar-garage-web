
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('--- Buscando Duplicatas de Banners ---');
  const banners = await prisma.banner.findMany({
    orderBy: { id: 'desc' }
  });

  const uniquePositions = new Set();
  const duplicates = [];
  const tonesPositions = [
    'custom-pickups', 
    'card-two-tone', 'card-three-tone', 'card-buttertone',
    'two-tone', 'three-tone', 'buttertone'
  ];

  for (const banner of banners) {
    if (tonesPositions.includes(banner.posicao)) {
      if (uniquePositions.has(banner.posicao)) {
        duplicates.push(banner);
      } else {
        uniquePositions.add(banner.posicao);
      }
    }
  }

  if (duplicates.length > 0) {
    console.log(`Encontradas ${duplicates.length} duplicatas. Removendo...`);
    for (const dup of duplicates) {
      console.log(`Removendo ID ${dup.id} (Posição: ${dup.posicao})`);
      await prisma.banner.delete({ where: { id: dup.id } });
    }
    console.log('Limpeza concluída.');
  } else {
    console.log('Nenhuma duplicata encontrada para Tones.');
  }

  // Verificar o conteúdo do Banner "custom-pickups"
  const pickupBanner = await prisma.banner.findFirst({
    where: { posicao: 'custom-pickups' }
  });
  console.log('Banner Principal (Pickups):', pickupBanner);

  const cardTwoTone = await prisma.banner.findFirst({
    where: { posicao: 'card-two-tone' }
  });
  console.log('Card Two Tone:', cardTwoTone);
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
