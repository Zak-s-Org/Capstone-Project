const bcrypt = require("bcrypt")
const { PrismaClient} = require(`@prisma/client`)
const prisma = new PrismaClient()

async function hashExistingPasswords() {
    const users = await prisma.users.findMany();
  
    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 8);
      await prisma.users.update({
        where: { id: user.id },
        data: { password: hashedPassword },
      });
    }
  
    console.log("Existing passwords have been hashed!");
  }
  
  hashExistingPasswords();