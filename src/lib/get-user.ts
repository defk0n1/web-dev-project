import { prisma } from "@/lib/prisma";

export async function getUser(email: string) {
  try {
    const user = await prisma.user.findFirst({
      where: { email }
    });
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}