"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"


export default function CreateWishlistDialog() {
  const [open, setOpen] = useState(false)
  const [checkbox , setCheckbox] = useState(false)

  const handleCreateWishlist = (event: React.FormEvent) => {
    event.preventDefault()
    // Here you would typically handle the wishlist creation
    console.log("Creating wishlist...")
    console.log(checkbox)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#c97862] hover:bg-[#c97862]/90">
          <span className="mr-2">+</span>
          Create Wishlist
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Wishlist</DialogTitle>
          <DialogDescription>
            Give your wishlist a name and start adding items to it.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleCreateWishlist}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Wishlist Title
              </Label>
              <Input
                id="name"
                placeholder="Enter a title for this wishlist, e.g. 'Birthday Wishlist' "
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Wishlist Description
              </Label>
              <Input
                id="name"
                placeholder="Enter a description for this wishlist"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Show this wishlist on your profile
              </Label>
              <Checkbox checked={checkbox} onCheckedChange={()=>{setCheckbox(!checkbox)}}/>
            </div>
          </div>
          <DialogFooter>

            <Button className="bg-[#c97862] hover:bg-[#c97862]/90" type="submit">Create Wishlist</Button>

          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}


