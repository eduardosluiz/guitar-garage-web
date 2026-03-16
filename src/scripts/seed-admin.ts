// src/scripts/seed-admin.ts
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  const email = 'admin@guitargarage.com.br'
  const hashedPassword = await bcrypt.hash('Admin123!', 10)

  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      name: 'Admin Guitar Garage',
      password: hashedPassword,
    },
  })

  console.log('Admin user created/verified:', user.email)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
