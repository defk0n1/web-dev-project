'use client'

import React, { useState } from 'react'
import { ArrowLeft, Edit2, Check, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Link from 'next/link'
import { UpdateWishlistTitle } from '@/lib/clientData'
import { useRouter } from 'next/navigation'

interface WishlistHeaderProps {
  title: string
  wishlistId: string
}

const PublicWishlistHeader: React.FC<WishlistHeaderProps> = ({ title , wishlistId}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(title)
  const router = useRouter()

 

  return (
    <header className="px-4 pb-4">
      <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-white" onClick={()=>{router.back()}}>
            <ArrowLeft className="h-6 w-6" />
          </Button>
        
          <h1 className="text-2xl font-semibold text-white">{title}</h1>
        
        
      </div>
    </header>
  )
}

export default PublicWishlistHeader

