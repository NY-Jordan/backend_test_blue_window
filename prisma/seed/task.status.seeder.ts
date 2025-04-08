// prisma/seed.ts
import { prisma } from "../../src/utils/prisma.ts";

export default async function taskStatusSeeder() {
  // Créer des utilisateurs de test
  await prisma.status.createMany({
    data: [
      {
        name: 'completed',
      },
      {
        name: 'In Progress',
      },
    ],
  });

  console.log('taskStatusSeeder completed ')
}


