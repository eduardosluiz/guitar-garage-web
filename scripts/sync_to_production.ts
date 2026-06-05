import fs from 'fs';
import path from 'path';

async function main() {
  const urlBase = process.argv[2];
  if (!urlBase) {
    console.error('Por favor, informe a URL do site em producao. Exemplo: npx tsx scripts/sync_to_production.ts https://guitargarage.com.br');
    process.exit(1);
  }

  const mappingPath = path.join('C:', 'Users', 'User', 'guitar_garage_backup_midias', 'mapping.json');
  if (!fs.existsSync(mappingPath)) {
    console.error('mapping.json nao encontrado!');
    return;
  }

  const mappings = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));
  console.log(`Iniciando upload de ${mappings.length} arquivos para ${urlBase}...`);

  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < mappings.length; i++) {
    const item = mappings[i];
    // local_file looks like "banners/1_id.jpg"
    const filePath = path.join('C:', 'Users', 'User', 'guitar_garage_backup_midias', item.local_file.replace('/', '\\'));
    
    if (!fs.existsSync(filePath)) {
      console.warn(`[AVISO] Arquivo não encontrado fisicamente: ${filePath}`);
      continue;
    }

    const folder = item.local_file.split('/')[0];
    const filename = item.local_file.split('/')[1];

    const fileBuffer = fs.readFileSync(filePath);
    const blob = new Blob([fileBuffer]);
    const formData = new FormData();
    formData.append('file', blob, filename);
    formData.append('folder', folder);
    formData.append('restore_filename', filename);

    try {
      const response = await fetch(`${urlBase}/api/upload`, {
        method: 'POST',
        body: formData as any
      });

      if (response.ok) {
        successCount++;
        console.log(`[${i+1}/${mappings.length}] SUCESSO: ${item.local_file}`);
      } else {
        failCount++;
        console.error(`[${i+1}/${mappings.length}] FALHA (${response.status}): ${item.local_file}`);
      }
    } catch (e: any) {
      failCount++;
      console.error(`[${i+1}/${mappings.length}] ERRO DE REDE: ${item.local_file} - ${e.message}`);
    }
  }

  console.log(`\n✅ Upload finalizado! Sucessos: ${successCount} | Falhas: ${failCount}`);
}

main().catch(console.error);
