import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import PublicWishlist from './public-wishlist';
import cacheReval from '@/app/actions'
import { useRouter, usePathname } from 'next/navigation';

// Enum for Privacy (matching the Prisma model)
enum Privacy {
  PRIVATE = 'PRIVATE',
  PUBLIC = 'PUBLIC',
  SHARED = 'SHARED'
}

// Wishlist interface matching the Prisma model
interface Wishlist {
  id: number;
  title?: string | null;
  description?: string | null;
  privacy: Privacy;
  userId: string;
  wishes: Wish[];
  createdAt: Date;
  updatedAt: Date;
}

// Minimal Wish interface (assuming a basic structure)
interface Wish {
  id: number;
  // Add other wish-related properties as needed
}

interface WishlistViewProps {
  wishlists: Wishlist[];
  // onAddWishlist?: () => void;
}

const PublicWishlistWrapper: React.FC<WishlistViewProps> = ({ 
  wishlists, 
  // onAddWishlist 
}) => {
  console.log(wishlists)
  const router = useRouter()
  const pathname = usePathname();

  
  const handleWishlistClick = (wishlist:Wishlist) => {
    console.log('clicked',wishlist)
    router.push(`${pathname}/wishlist/${wishlist.id}`)

  }
  return (
    <div className="mx-auto max-w-6xl space-y-6" >
      {wishlists.length === 0 ? (
        <Card className="border-2 border-dashed border-[#c97862] bg-transparent">
          <div className="flex min-h-[200px] flex-col items-center justify-center gap-4">
            <p className="text-lg text-white">No Wishlists Found</p>

          </div>
        </Card>
      ) : (
        wishlists.map((wishlist) => (
          <PublicWishlist onClick={()=>{handleWishlistClick(wishlist)}} key={wishlist.id} wishlist={wishlist} onDelete={()=>{cacheReval("Wishlists")}}></PublicWishlist> 
        ))
      )}
      
      {wishlists.length > 0 && (
        <div className="text-center">

        </div>
      )}
    </div>
  );
};

export default PublicWishlistWrapper;