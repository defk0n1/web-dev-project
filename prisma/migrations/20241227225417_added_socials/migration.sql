-- CreateEnum
CREATE TYPE "SocialNetwork" AS ENUM ('tiktok', 'facebook', 'linkedin', 'instagram');

-- CreateTable
CREATE TABLE "SocialLink" (
    "platform" "SocialNetwork" NOT NULL,
    "url" TEXT NOT NULL,
    "id" TEXT NOT NULL,

    CONSTRAINT "SocialLink_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SocialLink" ADD CONSTRAINT "SocialLink_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
