const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const readline = require('readline');

const prisma = new PrismaClient();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.stdoutMuted = true;

// Hack for hiding password input
rl._writeToOutput = function _writeToOutput(stringToWrite) {
  if (rl.stdoutMuted)
    rl.output.write("*");
  else
    rl.output.write(stringToWrite);
};

async function main() {
  const users = await prisma.user.findMany();
  
  if (users.length === 0) {
    console.log("Nenhum usuário encontrado no banco de dados.");
    rl.close();
    return;
  }

  const admin = users[0];
  console.log(`Usuário encontrado: ${admin.email}`);
  
  rl.question('Digite a nova senha: ', async (newPassword) => {
    rl.stdoutMuted = false;
    console.log('\nProcessando...');
    
    if (!newPassword || newPassword.trim() === '') {
      console.log("Senha não pode ser vazia.");
      rl.close();
      return;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    await prisma.user.update({
      where: { email: admin.email },
      data: { password: hashedPassword }
    });
    
    console.log(`Sucesso! A senha para ${admin.email} foi alterada.`);
    rl.close();
  });
}

main().catch(err => {
  console.error(err);
  rl.close();
}).finally(async () => {
  // We don't disconnect immediately because of the async prompt
});

rl.on('close', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
