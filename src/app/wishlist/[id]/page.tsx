// import { ArrowLeft, Edit2, Share2, MoreHorizontal, Gift } from 'lucide-react'
// import { Button } from "@/components/ui/button"
// import { Card } from "@/components/ui/card"
// import Link from 'next/link'
// import { useEffect } from 'react'





// export default async function WishlistPage({
//   params,
// }: {
//   params: Promise<{ id: string }>
// }) {

//   console.log((await params).id)






//   return (
//     <div className="min-h-screen bg-black text-white">
//       {/* Navigation */}
//       <nav className="p-4 text-gray-400">
//         <div className="flex items-center gap-2">
//           <span>User</span>
//           <span>›</span>
//           <span>Name of wishlist</span>
//         </div>
//       </nav>

//       {/* Header */}
//       <header className="px-4 pb-4">
//         <div className="flex items-center gap-2">
//             <Link href="/profile">
//           <Button variant="ghost" size="icon" className="text-white">
//             <ArrowLeft className="h-6 w-6" />
//           </Button>
//           </Link>
//           <h1 className="text-2xl font-semibold">Name of wishlist</h1>
//           <div className="ml-auto flex items-center gap-2">
//             <Button variant="ghost" size="icon" className="text-white">
//               <Edit2 className="h-5 w-5" />
//             </Button>
//             <Button variant="ghost" size="icon" className="text-white">
//               <MoreHorizontal className="h-5 w-5" />
//             </Button>
//           </div>
//         </div>

       
//       </header>

//       {/* Action Buttons */}
//       <div className="px-4 flex gap-2 mb-4">
//         <Button className="bg-orange-600 hover:bg-orange-700 text-white">
//           <Gift className="h-5 w-5 mr-2" />
//           Add Wish
//         </Button>
//         <Button>
//           <Share2 className="h-5 w-5 mr-2" />
//           Share
//         </Button>
//       </div>

//       {/* Content Grid */}
      // <div className="px-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      //   {/* Empty Wish Card */}
      //   <Card className="border-2 border-dashed border-slate-800 bg-slate-900/50 aspect-square flex flex-col items-center justify-center text-gray-400">
      //     <Gift className="h-12 w-12 mb-4" />
      //     <Button className="bg-orange-600 hover:bg-orange-700">
      //       Add Wish
      //     </Button>
      //   </Card>

      //   {/* Wish Card */}   
      // </div>

//     {/* <a href="/wishlist/wishdetail" className="text-gray-400 text-xl">TEST GIFT DETAILS</a> */}
//     </div>
//   )
// }





"use server"


import { getServerSession } from "next-auth/next"
import { options } from "../../api/auth/[...nextauth]/options"
import { fetchSingleWishlist } from '@/lib/data'
import WishlistHeader from "@/components/wishlist/WishlistHeader"
import WishlistActions from "@/components/wishlist/WishlistActions"
import WishesWrapper from "@/components/wishlist/WishesWrapper"
import WishDetails from "@/components/wish/wishdetails"



export default async function WishlistPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {

  console.log((await params).id)



  const session = await getServerSession(options)
  console.log("ttt",session)
  const wishlistData = await fetchSingleWishlist((await params).id)
  const wishesData : Array<Object> = wishlistData.wishes 

  console.log(wishesData)
  return(
  <div className="min-h-screen bg-black text-white">
      <WishlistHeader title={wishlistData.title}/>
      <WishlistActions wishlistId={wishlistData.id}/>
      <WishesWrapper wishlistId={wishlistData.id}>
        {wishesData.map((wish)=> <WishDetails key={wish.id} {...wish}></WishDetails>)}
      </WishesWrapper>
  </div>

  )
}
