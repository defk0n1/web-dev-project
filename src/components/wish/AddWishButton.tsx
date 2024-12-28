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
import { AddWishForm } from './AddWishForm'
import cacheReval from "@/app/actions" 

export function AddWishButton({ wishlistId }: { wishlistId: number }) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add a Wish</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a Wish</DialogTitle>
          <DialogDescription>
            Fill in the details of your wish. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <AddWishForm wishlistId={wishlistId} onSuccess={() =>{setOpen(false),cacheReval("Wishlists")} } />
      </DialogContent>
    </Dialog>
  )
}

