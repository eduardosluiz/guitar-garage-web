import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = formData.get('folder') as string || 'geral';

    if (!file) {
      return NextResponse.json({ error: "Nenhum arquivo enviado" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Gerar nome único ou usar o nome original (usado apenas no script de restauração)
    const restoreFilename = formData.get('restore_filename') as string;
    const uniqueFilename = restoreFilename ? restoreFilename : `${Date.now()}_${Math.floor(Math.random() * 10000)}_${file.name.replace(/\s+/g, '_')}`;
    const uploadDir = join(process.cwd(), 'public', 'uploads', folder);
    
    // Criar pasta se não existir
    await mkdir(uploadDir, { recursive: true });
    
    const filePath = join(uploadDir, uniqueFilename);
    await writeFile(filePath, buffer);

    const fileUrl = `/uploads/${folder}/${uniqueFilename}`;
    
    return NextResponse.json({ secure_url: fileUrl }, { status: 200 });
  } catch (error) {
    console.error('Erro no upload local:', error);
    return NextResponse.json({ error: "Erro ao fazer upload do arquivo" }, { status: 500 });
  }
}
