import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function updateUserProfilePicture(userId: string, profilePictureUrl: string) {
    return await prisma.user.update({
      where: { id: userId },
      data: { image: profilePictureUrl }
    });
  }

export { prisma };


