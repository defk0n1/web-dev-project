'use client'

import { useRouter } from 'next/navigation'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Share, Edit, Gift } from 'lucide-react'
import CreateWishlistDialog from '@/components/profile/create-wishlist-dialogue'
import { Skeleton } from '@/components/ui/skeleton'

interface UserData {
  email: string
  id: string
  username: string
  wishlists:any
}



interface UserProfileProps {
  session: any
  status: 'loading' | 'authenticated' | 'unauthenticated'
  userData: UserData | null
}

export const UserProfile: React.FC<UserProfileProps> = ({ session, status, userData }) => {
  const router = useRouter()
  console.log(userData)
  

  if (status === 'loading') {
    return <ProfileSkeleton />
  }

  if (status === 'unauthenticated') {
    return <UnauthenticatedProfile />
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center space-y-4">
        <Avatar className="flex items-center justify-center h-32 w-32 bg-[#c97862] text-white text-4xl">
          <span>{userData?.email}</span>
        </Avatar>
        <h1 className="text-2xl font-light">{userData?.username}</h1>
        <p style={{ margin: '0' }} className="text-gray-400">@{userData?.username}</p>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="text-black border-white/20">
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button
            onClick={() => router.push('profile/options')}
            variant="outline"
            size="sm"
            className="text-black border-white/20"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </div>
        <div className="mt-16 w-full max-w-2xl p-8 rounded-lg bg-[#4a4a43]/50">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="bg-white p-4 rounded-lg">
              <Gift className="h-8 w-8 text-[#c97862]" />
            </div>
            <h2 className="text-xl">My Wishlists</h2>
            {!userData?.wishlists ?<>
            <p className="text-gray-400">You didn't create any wishlists yet.</p>
            <CreateWishlistDialog /></> : <p>you have some wishlists</p>

            
            }
            
          </div>
        </div>
      </div>
    </main>
  )
}

function ProfileSkeleton() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center space-y-4">
        <Skeleton className="h-32 w-32 rounded-full" />
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-24" />
        <div className="flex space-x-2">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-24" />
        </div>
        <div className="mt-16 w-full max-w-2xl p-8 rounded-lg bg-[#4a4a43]/50">
          <div className="flex flex-col items-center text-center space-y-4">
            <Skeleton className="h-16 w-16 rounded-lg" />
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-10 w-40" />
          </div>
        </div>
      </div>
    </main>
  )
}

function UnauthenticatedProfile() {
  const router = useRouter()
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center space-y-4">
        <Avatar className="flex items-center justify-center h-32 w-32 bg-gray-300 text-gray-600 text-4xl">
          <span>?</span>
        </Avatar>
        <h1 className="text-2xl font-light">Guest User</h1>
        <p className="text-gray-400">Please sign in to view your profile</p>
        <Button onClick={() => router.push('/login')} variant="default" size="sm">
          Sign In
        </Button>
      </div>
    </main>
  )
}
