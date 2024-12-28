
import { PublicUserProfile } from "@/components/public-profile/public-user-profile"
import { fetchPublicUserData , fetchPublicWishlistData } from "../../lib/data"
import { Avatar } from '@/components/ui/avatar'


interface UserData {
  email: string
  id: string
  username: string
  wishlists:any
  socials:any

}


export default async function PublicProfilePage({
    params,
  }: {
    params: Promise<{ username: string }>
  }) {

  const username = (await params).username
  const userData = await fetchPublicUserData(username)
  console.log(userData)
  const wishlistsData = await fetchPublicWishlistData(username)
  console.log(wishlistsData)
  return <PublicUserProfile userData={userData} userWishlists={wishlistsData} />

}

function UnauthenticatedProfile() {
  // const router = useRouter()
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center space-y-4">
        <Avatar className="flex items-center justify-center h-32 w-32 bg-gray-300 text-gray-600 text-4xl">
          <span>?</span>
        </Avatar>
        <h1 className="text-2xl font-light">Guest User</h1>
        <p className="text-gray-400">Please sign in to view your profile</p>
        {/* <Button onClick={() => router.push('/login')} variant="default" size="sm">
          Sign In
        </Button> */}
      </div>
    </main>
  )
}



