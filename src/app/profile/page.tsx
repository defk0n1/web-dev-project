"use server"

import { DM_Sans } from 'next/font/google'
import { Dynalight  } from 'next/font/google'
import { getServerSession } from "next-auth/next"
import { UserProfile } from "@/components/profile/user-profile"
import { fetchUserData } from "../../lib/data"
import { options } from "../api/auth/[...nextauth]/options"




 
const dm_Sans = DM_Sans({ subsets: ['latin'] })
const dynalight = Dynalight({ weight: ['400'] })

interface UserData {
  email: string
  id: string
  username: string
  wishlists:any
}


export default async function ProfilePage() {
  const session = await getServerSession(options)
  console.log("ttt",session)
  const userData = await fetchUserData()

  return <UserProfile session={session} userData={userData} />
}


