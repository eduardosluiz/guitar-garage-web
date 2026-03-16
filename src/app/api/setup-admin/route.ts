import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const password = "Admin123!";
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await prisma.user.upsert({
      where: { email: "admin@guitargarage.com.br" },
      update: { 
        password: hashedPassword,
        name: "Admin Guitar Garage"
      },
      create: {
        email: "admin@guitargarage.com.br",
        name: "Admin Guitar Garage",
        password: hashedPassword,
      },
    });

    return NextResponse.json({ 
      success: true, 
      message: "Usuário Admin configurado com sucesso!",
      user: user.email
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
