

import { fetchSinglePublicWishlist } from '@/lib/data'
import PublicWishlistHeader from "@/components/public-wishlist/PublicWishlistHeader"
import PublicWishesWrapper from "@/components/public-wishlist/PublicWishesWrapper"
import PublicWishDetails from "@/components/public-wishlist/PublicWishDetails"
 





export default async function PublicWishlistPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {

  console.log((await params).id)




 
  const wishlistData = await fetchSinglePublicWishlist((await params).id)
  console.log(wishlistData)
  const wishesData : Array<Object> = wishlistData.wishes 

  console.log(wishesData)
  return(
  <div className="min-h-screen bg-black text-white">
      <PublicWishlistHeader title={wishlistData.title} wishlistId={wishlistData.id}/>
      <PublicWishesWrapper wishlistId={wishlistData.id}>
        {wishesData.map((wish)=> <PublicWishDetails key={wish.id} {...wish}></PublicWishDetails>)}
      </PublicWishesWrapper>
  </div>

  )
}
