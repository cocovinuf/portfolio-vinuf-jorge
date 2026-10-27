import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const usuario = await prisma.usuario.upsert({
    where: { email: 'admin@portfolio.com' },
    update: {},
    create: {
      nombre: 'Jorge',
      apellido: 'Vinuf',
      email: 'admin@portfolio.com',
      password: 'admin123'
    }
  });
  console.log('Usuario administrador listo:', usuario.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });