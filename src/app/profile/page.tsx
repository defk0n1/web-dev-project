"use client"

import { DM_Sans } from 'next/font/google'
import { Dynalight } from 'next/font/google'
import { useEffect, useState } from 'react'
import { ProfileHeader } from '@/components/profile/profile-header'
import { WishlistSection } from '@/components/profile/wishlist-section'

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
      <WishlistSection />
    </main>
  );
}