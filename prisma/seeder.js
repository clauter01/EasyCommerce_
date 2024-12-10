import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { promises as fs } from "fs";
import path from "path";

const prisma = new PrismaClient();

async function main() {
  const seedDataPath = path.resolve("prisma","seed.json");
  const seedData = JSON.parse(await fs.readFile(seedDataPath, "utf-8"));

  // Seed users
  for (const user of seedData.users) {
    const { password, ...validUser } = user;
    validUser.password = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: validUser,
    });
  }

  // Seed categories
  for (const category of seedData.categories) {
    await prisma.category.create({
      data: category,
    });
  }

  // Seed products
  for (const product of seedData.products) {
    await prisma.product.create({
      data: product,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });