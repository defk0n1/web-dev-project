-- DropForeignKey
ALTER TABLE "Wish" DROP CONSTRAINT "Wish_wishlistId_fkey";

-- AddForeignKey
ALTER TABLE "Wish" ADD CONSTRAINT "Wish_wishlistId_fkey" FOREIGN KEY ("wishlistId") REFERENCES "Wishlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
