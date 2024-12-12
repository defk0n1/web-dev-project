import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CreateWishlistDialog from './create-wishlist-dialogue';

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
  isPublic?: boolean;
  // onAddWishlist?: () => void;
}

const Wishlist: React.FC<WishlistViewProps> = ({ 
  wishlists, 
  isPublic
  // onAddWishlist 
}) => {


  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {wishlists.length === 0 ? (
        <Card className="border-2 border-dashed border-[#c97862] bg-transparent">
          <div className="flex min-h-[200px] flex-col items-center justify-center gap-4">
            <p className="text-lg text-white">No Wishlists Found</p>
            {!isPublic && <CreateWishlistDialog />}

          </div>
        </Card>
      ) : (
        wishlists.map((wishlist) => (
          <div key={wishlist.id} className="bg-gray-800 rounded-lg p-4">
            <div className="mb-4">
              <h2 className="mb-2 text-xl font-semibold text-white">
                {wishlist.title || 'Untitled Wishlist'}
              </h2>
              {wishlist.description && (
                <p className="text-sm text-slate-400">{wishlist.description}</p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">
                {wishlist.wishes?.length} gifts | 
                {' '}{wishlist.privacy === Privacy.PRIVATE ? 'Private' : 
                      wishlist.privacy === Privacy.PUBLIC ? 'Public' : 
                      'Shared'}
              </p>
            </div>
          </div>
        ))
      )}
      
      {wishlists.length > 0 &&  (
        <div className="text-center">
            {!isPublic && <CreateWishlistDialog />}
        </div>
      )}
    </div>
  );};

export default Wishlist;