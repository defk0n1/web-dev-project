import { Share2, Gift } from 'lucide-react'
import { Button } from "@/components/ui/button"


const WishlistActions = () => {
  return (
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
  )
}

export default WishlistActions