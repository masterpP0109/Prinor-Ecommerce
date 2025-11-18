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
      update: {
        role: 'ADMIN',
        isApproved: true,
      },
      create: {
        email: 'admin@test.com',
        name: 'Admin User',
        password: hashedPassword,
        role: 'ADMIN',
        isApproved: true,
      },
    });

    // Create seller user
    const seller = await prisma.user.upsert({
      where: { email: 'seller@test.com' },
      update: {
        role: 'SELLER',
        isApproved: true,
      },
      create: {
        email: 'seller@test.com',
        name: 'Seller User',
        password: hashedPassword,
        role: 'SELLER',
        isApproved: true,
      },
    });

    // Create buyer user
    const buyer = await prisma.user.upsert({
      where: { email: 'buyer@test.com' },
      update: {
        role: 'BUYER',
      },
      create: {
        email: 'buyer@test.com',
        name: 'Buyer User',
        password: hashedPassword,
        role: 'BUYER',
      },
    });

    // Create regular user (default role)
    const user = await prisma.user.upsert({
      where: { email: 'user@test.com' },
      update: {
        role: 'BUYER',
      },
      create: {
        email: 'user@test.com',
        name: 'Regular User',
        password: hashedPassword,
        role: 'BUYER',
      },
    });

    // Create sample products
    const products = await Promise.all([
      prisma.product.upsert({
        where: { id: 'product-1' },
        update: {},
        create: {
          id: 'product-1',
          name: 'MacBook Pro M3 Max',
          description: 'Powerful laptop with M3 Max chip, 32GB RAM, and 1TB SSD',
          price: 3199,
          image: '/images/products/imac1.jpg',
          category: 'computers',
          available: true,
        },
      }),
      prisma.product.upsert({
        where: { id: 'product-2' },
        update: {},
        create: {
          id: 'product-2',
          name: 'iPhone 15 Pro Max',
          description: 'Latest iPhone with A17 Pro chip and advanced camera system',
          price: 1199,
          image: '/images/products/iphone1.jpg',
          category: 'phones',
          available: true,
        },
      }),
      prisma.product.upsert({
        where: { id: 'product-3' },
        update: {},
        create: {
          id: 'product-3',
          name: 'PlayStation 5 Console',
          description: 'Next-gen gaming console with 825GB SSD and 4K gaming',
          price: 499,
          image: '/images/products/PS5.jpg',
          category: 'gaming',
          available: false,
        },
      }),
      prisma.product.upsert({
        where: { id: 'product-4' },
        update: {},
        create: {
          id: 'product-4',
          name: 'AirPods Pro (3rd Gen)',
          description: 'Wireless earbuds with active noise cancellation',
          price: 249,
          image: '/images/products/airpods1.jpg',
          category: 'accessories',
          available: true,
        },
      }),
    ]);

    console.log('Seeded users:');
    console.log('Admin:', admin.email);
    console.log('Seller:', seller.email);
    console.log('Buyer:', buyer.email);
    console.log('User:', user.email);
    console.log('Password for all: password123');
    console.log('Seeded products:', products.length);

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();