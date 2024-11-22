"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { DM_Sans } from 'next/font/google'
import { Dynalight  } from 'next/font/google'
import Link from "next/link"
import { Avatar } from "@/components/ui/avatar"
import { Gift, Share, Edit } from 'lucide-react'
import CreateWishlistDialog from "@/components/profile/create-wishlist-dialogue"
import { useRouter } from "next/navigation"

 
const dm_Sans = DM_Sans({ subsets: ['latin'] })
const dynalight = Dynalight({ weight: ['400'] })


export default function Profile() {
  const router = useRouter()

  
  return (
    <main className="container mx-auto px-4 py-8">
    <div className="flex flex-col items-center space-y-4">
      <Avatar className="flex items-center justify-center h-32 w-32 bg-[#c97862] text-white text-4xl">
        <span>ZK</span>
      </Avatar>
      <h1 className="text-2xl font-light">Zied Kallel</h1>
      <p style={{margin:"0"}}className="text-gray-400">@zied</p>
      <div className="flex space-x-2">
        <Button variant="outline" size="sm" className="text-black border-white/20">
          <Share className="h-4 w-4 mr-2" />
          Share
        </Button>
        <Button onClick={() => router.push('profile/options')} variant="outline" size="sm" className="text-black border-white/20">
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </Button>
      </div>
      <div className="mt-16 w-full max-w-2xl p-8 rounded-lg bg-[#4a4a43]/50">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="bg-white p-4 rounded-lg">
            <Gift className="h-8 w-8 text-[#c97862]" />
          </div>
          <h2 className="text-xl">My Wishlist</h2>
          <p className="text-gray-400">You didn't create any wishlists yet.</p>
          <CreateWishlistDialog />

        </div>
      </div>
    </div>
  </main>
    
     
  )
}