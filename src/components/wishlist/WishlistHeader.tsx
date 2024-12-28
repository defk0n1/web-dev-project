'use client'

import React, { useState } from 'react'
import { ArrowLeft, Edit2, Check, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Link from 'next/link'
import { UpdateWishlistTitle } from '@/lib/clientData'

interface WishlistHeaderProps {
  title: string
  wishlistId: string
}

const WishlistHeader: React.FC<WishlistHeaderProps> = ({ title , wishlistId}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(title)

  const handleSave = () => {
    setIsEditing(false)
    UpdateWishlistTitle(wishlistId , editedTitle )
  }

  const handleCancel = () => {
    console.log("test")
    setIsEditing(false)
    setEditedTitle(title)
  }

  return (
    <header className="px-4 pb-4">
      <div className="flex items-center gap-2">
        <Link href="/profile">
          <Button variant="ghost" size="icon" className="text-white">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        {isEditing ? (
          <Input
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="text-2xl font-semibold bg-transparent border-none focus-visible:ring-0 text-white"
            autoFocus
          />
        ) : (
          <h1 className="text-2xl font-semibold text-white">{title}</h1>
        )}
        <div className="flex items-center gap-2 ml-auto">
          {isEditing ? (
            <>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-white" onClick={handleSave}>
                      <Check className="h-5 w-5"  />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Save</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-white" onClick={handleCancel}>
                      <X className="h-5 w-5"  />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Cancel</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </>
          ) : (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white" onClick={() => setIsEditing(true)}>
                    <Edit2 className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Edit Wishlist Title</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>
    </header>
  )
}

export default WishlistHeader

