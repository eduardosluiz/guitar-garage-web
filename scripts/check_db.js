
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const featured = await prisma.produto.findMany({
    where: { isDestaque: true },
    select: { id: true, nome: true }
  });
  console.log('Featured products:', featured);

  const banners = await prisma.banner.findMany({
    where: { posicao: 'home' }
  });
  console.log('Home banners:', banners);
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
