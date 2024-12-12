import { ProfileHeader } from "@/components/profile/profile-header";
import { UserProfile } from "@/components/profile/user-profile";
import { fetchUserData } from "@/lib/data";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { Gift } from "lucide-react";
import Wishlist from "@/components/profile/wishlist";

type Props = {
    params: {
      username: string
    }
  }
// Verification needs to happen that the username exists in the data base before rendering the page
// If the username does not exist, we should return a 404 page
  export default async function Page({ params }: Props) {
     const session = await getServerSession(options)
      console.log("ttt",session)
      const userData = await fetchUserData()
    return (
      <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center space-y-4">
      <ProfileHeader initials={userData?.username?.[0] ?? ''} name={userData?.username ?? ''} username={userData?.username ?? ''} isPublic = {true} />

        <div className="mt-16 w-full max-w-2xl p-8 rounded-lg bg-[#4a4a43]/50">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="bg-white p-4 rounded-lg">
              <Gift className="h-8 w-8 text-[#c97862]" />
            </div>
            <h2 className="text-xl">{params.username}'s Wishlists</h2>
            {userData?.wishlists.length > 0 ? <Wishlist wishlists={userData?.wishlists} isPublic={true}></Wishlist> : 
            <>
            <p className="text-gray-400">This user does not have any wishes</p>

            </>
            }
            
          </div>
        </div>
      </div>
    </main>
      
    );
  }