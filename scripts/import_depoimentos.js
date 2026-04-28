const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  const filePath = path.join(__dirname, '..', 'src', 'depoimentos.txt');
  const content = fs.readFileSync(filePath, 'utf-8');

  // Dividir por asteriscos e limpar blocos vazios
  const blocks = content.split('*').map(b => b.trim()).filter(b => b.length > 0);

  console.log(`Encontrados ${blocks.length} depoimentos para processar.`);

  for (const block of blocks) {
    const lines = block.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    
    if (lines.length < 2) continue;

    // A última linha contém Nome (Email) - Data - Hora
    const infoLine = lines.pop();
    // O restante é a mensagem
    const texto = lines.join('\n');

    // Regex para extrair: Nome (Email) - DD/MM/AAAA - HH:MM
    // Ex: Patrick Grunevald (grunevald.lorenzetti@gmail.com) - 24/02/2019 - 16:46
    const match = infoLine.match(/(.+) \((.*)\) - (\d{2}\/\d{2}\/\d{4}) - (\d{2}:\d{2})/);

    let nome, email, dataStr, horaStr;

    if (match) {
      nome = match[1].trim();
      email = match[2].trim();
      dataStr = match[3];
      horaStr = match[4];
    } else {
      // Fallback simples se o regex falhar (ex: Sandro Albert que tem formato levemente diferente no final)
      const parts = infoLine.split(' - ');
      nome = parts[0] || "Cliente Guitar Garage";
      dataStr = parts[1] || "01/01/2013";
      horaStr = parts[2] || "00:00";
      email = null;
    }

    // Converter data DD/MM/AAAA para objeto Date
    const [day, month, year] = dataStr.split('/');
    const [hour, minute] = horaStr.split(':');
    const createdAt = new Date(year, month - 1, day, hour, minute);

    try {
      await prisma.depoimento.create({
        data: {
          nome,
          email,
          texto,
          isAtivo: true, // Já entram como ativos por serem antigos e validados
          createdAt
        }
      });
      console.log(`Inserido: ${nome} (${dataStr})`);
    } catch (err) {
      console.error(`Erro ao inserir depoimento de ${nome}:`, err);
    }
  }

  console.log('Processamento concluído.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
