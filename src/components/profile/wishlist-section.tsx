"use client"

import { Gift } from 'lucide-react'
import CreateWishlistDialog from "./create-wishlist-dialogue"

export function WishlistSection() {
  return (
    <div className="mt-16 w-full max-w-2xl p-8 rounded-lg bg-[#4a4a43]/50">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="bg-white p-4 rounded-lg">
          <Gift className="h-8 w-8 text-[#c97862]" />
        </div>
        <h2 className="text-xl">My Wishlist</h2>
        <p className="text-gray-400">You didnt create any wishlists yet.</p>
        <CreateWishlistDialog />
      </div>
    </div>
  );
}