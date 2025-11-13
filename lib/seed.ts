import 'dotenv/config';
import bcrypt from 'bcrypt';
import { prisma } from './db/mongodb';

async function seed() {
  try {
    console.log('Seeding database...');

    // Hash a common password for all test users
    const hashedPassword = await bcrypt.hash('password123', 10);

    // Create admin user
    const admin = await prisma.user.upsert({
      where: { email: 'admin@test.com' },
      update: {},
      create: {
        email: 'admin@test.com',
        name: 'Admin User',
        password: hashedPassword,
        role: 'admin',
      },
    });

    // Create seller user
    const seller = await prisma.user.upsert({
      where: { email: 'seller@test.com' },
      update: {},
      create: {
        email: 'seller@test.com',
        name: 'Seller User',
        password: hashedPassword,
        role: 'seller',
      },
    });

    // Create buyer user
    const buyer = await prisma.user.upsert({
      where: { email: 'buyer@test.com' },
      update: {},
      create: {
        email: 'buyer@test.com',
        name: 'Buyer User',
        password: hashedPassword,
        role: 'buyer',
      },
    });

    // Create regular user (default role)
    const user = await prisma.user.upsert({
      where: { email: 'user@test.com' },
      update: {},
      create: {
        email: 'user@test.com',
        name: 'Regular User',
        password: hashedPassword,
        role: 'user',
      },
    });

    console.log('Seeded users:');
    console.log('Admin:', admin.email);
    console.log('Seller:', seller.email);
    console.log('Buyer:', buyer.email);
    console.log('User:', user.email);
    console.log('Password for all: password123');

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();