import fs from 'fs'
import path from 'path'
import { pipeline } from 'stream/promises'

async function downloadFile(url: string, dest: string) {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Falha ao baixar ${url}: ${response.statusText}`)
  if (!response.body) throw new Error(`Sem corpo de resposta para ${url}`)
  
  // Create dir if not exists
  const dir = path.dirname(dest)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  const arrayBuffer = await response.arrayBuffer()
  fs.writeFileSync(dest, Buffer.from(arrayBuffer))
}

function getFileName(url: string) {
  const urlParts = new URL(url).pathname.split('/')
  return urlParts[urlParts.length - 1]
}

async function main() {
  const backupFile = path.join(__dirname, '..', 'backup_full.json')
  const baseBackupDir = path.join('C:', 'Users', 'User', 'guitar_garage_backup_midias')
  
  if (!fs.existsSync(baseBackupDir)) {
    fs.mkdirSync(baseBackupDir, { recursive: true })
  }

  console.log('Lendo backup_full.json...')
  const data = JSON.parse(fs.readFileSync(backupFile, 'utf8'))
  
  const mapping: any[] = []

  const fieldsToCheck = [
    { table: 'marcas', field: 'logo_url', dir: 'marcas' },
    { table: 'categorias', field: 'imagemUrl', dir: 'categorias' },
    { table: 'imagens', field: 'url', dir: 'produtos_imagens' },
    { table: 'banners', field: 'imagemUrl', dir: 'banners' },
    { table: 'bannerMedia', field: 'url', dir: 'banner_media' },
    { table: 'projetosLutheria', field: 'videoUrl', dir: 'lutheria_videos' },
    { table: 'imagensProjeto', field: 'url', dir: 'lutheria_imagens' }
  ]

  let count = 0

  for (const config of fieldsToCheck) {
    const records = data[config.table] || []
    for (const record of records) {
      const url = record[config.field]
      if (url && typeof url === 'string' && url.includes('res.cloudinary.com')) {
        const filename = getFileName(url)
        const localRelPath = `${config.dir}/${record.id}_${filename}`
        const localAbsPath = path.join(baseBackupDir, localRelPath)
        
        console.log(`Baixando [${config.table}] ID ${record.id}: ${filename}`)
        
        try {
          await downloadFile(url, localAbsPath)
          mapping.push({
            table: config.table,
            id: record.id,
            field: config.field,
            original_url: url,
            local_file: localRelPath
          })
          count++
        } catch (e: any) {
          console.error(`Erro ao baixar ${url}: ${e.message}`)
        }
      }
    }
  }

  const mappingPath = path.join(baseBackupDir, 'mapping.json')
  fs.writeFileSync(mappingPath, JSON.stringify(mapping, null, 2))
  
  console.log(`\n✅ Download concluído! ${count} arquivos salvos em:`)
  console.log(baseBackupDir)
  console.log(`Mapa de restauração salvo em: ${mappingPath}`)
}

main().catch(console.error)
