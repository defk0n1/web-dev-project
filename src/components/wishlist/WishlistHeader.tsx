import React from 'react'
import { ArrowLeft, Edit2, MoreHorizontal } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

const WishlistHeader = ({title}:any) => {
  return (
    <header className="px-4 pb-4">
        <div className="flex items-center gap-2">
             <Link href="/profile">
           <Button variant="ghost" size="icon" className="text-white">
             <ArrowLeft className="h-6 w-6" />
          </Button>
          </Link>
           <h1 className="text-2xl font-semibold">{title}</h1>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-white">
               <Edit2 className="h-5 w-5" />
             </Button>
             {/* <Button variant="ghost" size="icon" className="text-white">
               <MoreHorizontal className="h-5 w-5" />
            </Button> */}
           </div>
         </div>
    </header>
  )
}

export default WishlistHeader