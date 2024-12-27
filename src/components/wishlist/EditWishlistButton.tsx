'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {EditWishlistForm}  from './EditWishlistForm'
import cacheReval from "@/app/actions" 
import { Settings } from 'lucide-react'

export default function EditWishlistButton({ wishlistId }: { wishlistId: number }) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
            <Settings></Settings>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Wishlist</DialogTitle>
          <DialogDescription>
           Edit your wishlist. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <EditWishlistForm wishlistId={wishlistId} onSuccess={() =>{setOpen(false),cacheReval("Wishes")} } />
      </DialogContent>
    </Dialog>
  )
}

