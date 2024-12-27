import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function updateUserProfilePicture(userId: string, profilePictureUrl: string) {
    try {
      const userUpdated = await prisma.user.update({
        where: { id: userId },
        data: { image: profilePictureUrl }
      })
      console.log("updated successfully!")
      return userUpdated;
      
    } catch (error) {
      console.log(error)
      
    }
    

    
  }

export { prisma };


