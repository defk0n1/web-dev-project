"use client"

import { DM_Sans } from 'next/font/google'
import { Dynalight } from 'next/font/google'
import { useEffect, useState } from 'react'
import { ProfileHeader } from '@/components/profile/profile-header'
import { WishlistSection } from '@/components/profile/wishlist-section'
import Wishlist from '@/components/profile/Wishlist'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus } from 'lucide-react'
import Link from 'next/link'

const dm_Sans = DM_Sans({ subsets: ['latin'] })
const dynalight = Dynalight({ weight: ['400'] })


interface User {
  name: string;
  username: string;
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/user')
        if (!response.ok) throw new Error('Failed to fetch user')
        const data = await response.json()
        setUser(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchUser()
    setUser({
      name: user?.name ?? "test",
      username: user?.username ? `@${user.username}` : "test",
    });
  }, []);

  if (!user) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }


  return (
    <main className={`container mx-auto px-4 py-8 ${dm_Sans.className}`}>
      <ProfileHeader 
        initials={user.name}
        name={user.username}
        username={`@${user.username}`}
      />
      {/* If number of wishlists is zero then
      <WishlistSection /> 
      */}
      {/* Else if number of wishlists is greater than zero then
       */}

      <div className="mb-6 mt-16 flex items-center justify-center space-x-24">
  <h1 className="text-2xl font-semibold text-white">My Wishlists</h1>
  <div className="flex gap-3">
    <Button className="bg-[#c97862] hover:bg-[#c97862]/90">
      <Plus className="mr-2 h-4 w-4" />
      Create Wishlist
    </Button>
  </div>
</div>
  <Link href="/wishlist">
    <Wishlist
      name='Sneakers collection'
      numberOfGifts={2}
      isEmpty={true}>
    </Wishlist>
  </Link>
    </main>
  );
}