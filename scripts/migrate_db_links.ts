import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

async function main() {
  const mappingPath = path.join('C:', 'Users', 'User', 'guitar_garage_backup_midias', 'mapping.json')
  
  if (!fs.existsSync(mappingPath)) {
    console.error('Arquivo mapping.json nao encontrado!')
    return
  }

  const mappings = JSON.parse(fs.readFileSync(mappingPath, 'utf8'))
  console.log(`Lidos ${mappings.length} mapeamentos. Iniciando atualizacao no banco de dados...`)

  let successCount = 0

  for (const item of mappings) {
    const newUrl = `/uploads/${item.local_file}`
    const { table, id, field } = item

    try {
      if (table === 'marcas') {
        await prisma.marca.update({ where: { id }, data: { [field]: newUrl } })
      } else if (table === 'categorias') {
        await prisma.categoria.update({ where: { id }, data: { [field]: newUrl } })
      } else if (table === 'imagens') {
        await prisma.imagem.update({ where: { id }, data: { [field]: newUrl } })
      } else if (table === 'banners') {
        await prisma.banner.update({ where: { id }, data: { [field]: newUrl } })
      } else if (table === 'bannerMedia') {
        await prisma.bannerMedia.update({ where: { id }, data: { [field]: newUrl } })
      } else if (table === 'projetosLutheria') {
        await prisma.projetoLutheria.update({ where: { id }, data: { [field]: newUrl } })
      } else if (table === 'imagensProjeto') {
        await prisma.imagemProjeto.update({ where: { id }, data: { [field]: newUrl } })
      }
      
      console.log(`Atualizado [${table}] ID ${id}: ${newUrl}`)
      successCount++
    } catch (e: any) {
      console.error(`Falha ao atualizar [${table}] ID ${id}: ${e.message}`)
    }
  }

  console.log(`\n✅ Sucesso! ${successCount} links atualizados no banco de dados.`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
