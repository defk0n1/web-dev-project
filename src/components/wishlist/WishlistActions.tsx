import { Share2, Gift } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { AddWishButton } from '../wish/AddWishButton'


const WishlistActions = ({wishlistId} : any) => {
  return (
<div className="px-4 flex gap-2 mb-4">
        <AddWishButton wishlistId={wishlistId}/>
        <Button>
          <Share2 className="h-5 w-5 mr-2" />
          Share
        </Button>
      </div>
  )
}

export default WishlistActions