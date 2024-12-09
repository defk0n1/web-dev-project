"use client"

import { Button } from "@/components/ui/button"
import { DM_Sans } from 'next/font/google'
import { Dynalight  } from 'next/font/google'
import Link from "next/link"
import { Avatar } from "@/components/ui/avatar"
import { Gift, Share, Edit } from 'lucide-react'
import CreateWishlistDialog from "@/components/profile/create-wishlist-dialogue"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { UserProfile } from "@/components/profile/user-profile"

 
const dm_Sans = DM_Sans({ subsets: ['latin'] })
const dynalight = Dynalight({ weight: ['400'] })

interface UserData {
  email: string
  id: string
  username: string
}


export default function ProfilePage() {
  const { data: session, status } = useSession()
  const [userData, setUserData] = useState<UserData | null>(null)

  useEffect(() => {
    if (status === "authenticated") {
      console.log(session)
      fetch(`/api/user`)
      .then((res) => res.json())
      .then((data) => setUserData(data))
      .then(() => console.log(userData))
    }
  }, [status])

  return <UserProfile session={session} status={status} userData={userData} />
}