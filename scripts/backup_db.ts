import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

async function main() {
  console.log('Iniciando backup do banco de dados...')
  
  const backupData: any = {}

  // Busca de todas as tabelas
  backupData.users = await prisma.user.findMany()
  console.log(`- Users: ${backupData.users.length}`)

  backupData.marcas = await prisma.marca.findMany()
  console.log(`- Marcas: ${backupData.marcas.length}`)

  backupData.categorias = await prisma.categoria.findMany()
  console.log(`- Categorias: ${backupData.categorias.length}`)

  backupData.produtos = await prisma.produto.findMany()
  console.log(`- Produtos: ${backupData.produtos.length}`)

  backupData.imagens = await prisma.imagem.findMany()
  console.log(`- Imagens de Produto: ${backupData.imagens.length}`)

  backupData.banners = await prisma.banner.findMany()
  console.log(`- Banners: ${backupData.banners.length}`)

  backupData.bannerMedia = await prisma.bannerMedia.findMany()
  console.log(`- Banner Medias: ${backupData.bannerMedia.length}`)

  backupData.configuracoes = await prisma.configuracao.findMany()
  console.log(`- Configuracoes: ${backupData.configuracoes.length}`)

  backupData.projetosLutheria = await prisma.projetoLutheria.findMany()
  console.log(`- Projetos Lutheria: ${backupData.projetosLutheria.length}`)

  backupData.imagensProjeto = await prisma.imagemProjeto.findMany()
  console.log(`- Imagens Lutheria: ${backupData.imagensProjeto.length}`)

  backupData.depoimentos = await prisma.depoimento.findMany()
  console.log(`- Depoimentos: ${backupData.depoimentos.length}`)

  const backupPath = path.join(__dirname, '..', 'backup_full.json')
  fs.writeFileSync(backupPath, JSON.stringify(backupData, null, 2))
  
  console.log(`\n✅ Backup completo salvo com sucesso em:`)
  console.log(backupPath)
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
