import { ArrowLeft, Edit2, Share2, MoreHorizontal, Gift } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from 'next/link'

export default function WishlistPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="p-4 text-gray-400">
        <div className="flex items-center gap-2">
          <span>User</span>
          <span>›</span>
          <span>Name of wishlist</span>
        </div>
      </nav>

      {/* Header */}
      <header className="px-4 pb-4">
        <div className="flex items-center gap-2">
            <Link href="/">
          <Button variant="ghost" size="icon" className="text-white">
            <ArrowLeft className="h-6 w-6" />
          </Button>
          </Link>
          <h1 className="text-2xl font-semibold">Name of wishlist</h1>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-white">
              <Edit2 className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </div>

       
      </header>

      {/* Action Buttons */}
      <div className="px-4 flex gap-2 mb-4">
        <Button className="bg-orange-600 hover:bg-orange-700 text-white">
          <Gift className="h-5 w-5 mr-2" />
          Add Wish
        </Button>
        <Button>
          <Share2 className="h-5 w-5 mr-2" />
          Share
        </Button>
      </div>

      {/* Content Grid */}
      <div className="px-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {/* Empty Wish Card */}
        <Card className="border-2 border-dashed border-slate-800 bg-slate-900/50 aspect-square flex flex-col items-center justify-center text-gray-400">
          <Gift className="h-12 w-12 mb-4" />
          <Button className="bg-orange-600 hover:bg-orange-700">
            Add Wish
          </Button>
        </Card>

        {/* Wish Card */}   
      </div>

    <a href="/wishlist/wishdetail" className="text-gray-400 text-xl">TEST GIFT DETAILS</a>
    </div>
  )
}
