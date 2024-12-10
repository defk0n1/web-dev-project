"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus } from 'lucide-react'

interface WishlistProps {
  name?: string;
  numberOfGifts?: number;
  isEmpty?: boolean;
}
export default function Wishlist({ name = "My Wishlist", numberOfGifts = 0, isEmpty = true }: WishlistProps) {{
  return (
      <div className="mx-auto max-w-6xl">
        
        <Card className="mb-6 border-2 border-dashed border-[#c97862] bg-transparent">
          <div className="flex min-h-[200px] flex-col items-center justify-center gap-4">
            <p className="text-lg text-white">This Wishlist is empty</p>
            <Button className="bg-[#c97862] hover:bg-[#c97862]/90">
          <Plus className="mr-2 h-4 w-4" />
          Add Wish
        </Button>
          </div>
        </Card>
        <div>
          <h2 className="mb-2 text-xl font-semibold text-white">{name}</h2>
          <p className="text-sm text-slate-400">{numberOfGifts} gifts</p>
        </div>
      </div>
  )
}

