import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nome, email, texto } = body;

    if (!nome || !texto) {
      return NextResponse.json(
        { error: "Nome e depoimento são obrigatórios." },
        { status: 400 }
      );
    }

    const depoimento = await prisma.depoimento.create({
      data: {
        nome,
        email: email || null,
        texto,
        isAtivo: false, // Inicia como inativo para moderação
      },
    });

    return NextResponse.json(depoimento);
  } catch (error) {
    console.error("ERRO AO SALVAR DEPOIMENTO:", error);
    return NextResponse.json(
      { error: "Falha ao enviar depoimento." },
      { status: 500 }
    );
  }
}
