import 'dotenv/config';
import bcrypt from 'bcrypt';
import { prisma } from './lib/db/mongodb';

async function updateMainAdmin() {
  try {
    console.log('Updating main admin user...');

    const hashedPassword = await bcrypt.hash('main@P0109', 10);

    const admin = await prisma.user.upsert({
      where: { email: 'priviledgemukunga@gmail.com' },
      update: {
        name: 'Main Admin',
        password: hashedPassword,
        role: 'ADMIN',
        isApproved: true,
      },
      create: {
        email: 'priviledgemukunga@gmail.com',
        name: 'Main Admin',
        password: hashedPassword,
        role: 'ADMIN',
        isApproved: true,
      },
    });

    console.log('Main admin updated:', admin.email);
    console.log('Password: main@P0109');

  } catch (error) {
    console.error('Error updating main admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateMainAdmin();