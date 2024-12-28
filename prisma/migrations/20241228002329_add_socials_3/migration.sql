/*
  Warnings:

  - The primary key for the `SocialLink` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `SocialLink` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SocialLink" DROP CONSTRAINT "SocialLink_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "SocialLink_pkey" PRIMARY KEY ("userId");
