const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Create a user
  const user = await prisma.user.create({
    data: {
      username: 'john_doe',
      fullName: 'John Doe',
      email: 'john@example.com',
      password: 'securepassword123',
      wishlists: {
        create: [
          {
            title: 'Electronics Wishlist',
            description: 'Gadgets and tech stuff',
            privacy: 'PUBLIC',
            wishes: {
              create: [
                { productName: 'Smartphone', description: 'Latest model', retailer: 'Tech Store' },
                { productName: 'Laptop', description: 'High performance', retailer: 'Online Shop' },
              ],
            },
          },
          {
            title: 'Books Wishlist',
            description: 'Books to read',
            privacy: 'PRIVATE',
            wishes: {
              create: [
                { productName: 'The Pragmatic Programmer', description: 'Great book on coding', retailer: 'Bookstore' },
                { productName: 'Clean Code', description: 'Coding principles', retailer: 'Online Shop' },
              ],
            },
          },
        ],
      },
    },
  });

  console.log('Seed data created:', user);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
