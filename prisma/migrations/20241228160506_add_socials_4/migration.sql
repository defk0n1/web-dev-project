/*
  Warnings:

  - The primary key for the `SocialLink` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "SocialLink" DROP CONSTRAINT "SocialLink_pkey",
ADD CONSTRAINT "SocialLink_pkey" PRIMARY KEY ("platform", "userId");
