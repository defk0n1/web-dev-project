import { Share2, Settings } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { AddWishButton } from '../wish/AddWishButton'
import EditWishlistButton from './EditWishlistButton'


const WishlistActions = ({wishlistId} : any) => {
  return (
<div className="px-4 flex gap-2 mb-4">
        <AddWishButton wishlistId={wishlistId}/>
        <Button>
          <Share2 className="h-5 w-5 mr-2" />
          Share
        </Button>
          <EditWishlistButton wishlistId={wishlistId}></EditWishlistButton>
      </div>
  )
}

export default WishlistActions