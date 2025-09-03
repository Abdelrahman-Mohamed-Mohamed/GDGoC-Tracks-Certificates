import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const defaultTrack = await prisma.track.upsert({
    where: { slug: "web" },
    update: {},
    create: {
      slug: "web",
      name: "Web Track",
    },
  });

  const email = process.env.SEED_LEAD_EMAIL || "lead@example.com";
  const password = process.env.SEED_LEAD_PASSWORD || "password123";
  const name = process.env.SEED_LEAD_NAME || "Track Lead";

  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      name,
      passwordHash,
      role: Role.LEAD,
      trackId: defaultTrack.id,
    },
  });

  // Ensure serial counter base exists by creating a placeholder serial for demo
  await prisma.serial.upsert({
    where: { value: "GDGCIC-2025-WEB-0000" },
    update: {},
    create: {
      value: "GDGCIC-2025-WEB-0000",
      year: 2025,
      index: 0,
      trackId: defaultTrack.id,
    },
  });

  console.log("Seed completed. Lead:", email);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

