"use client"

import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Share, Edit } from 'lucide-react'
import { useRouter } from "next/navigation"
  import { toast , ToastContainer } from "react-toastify";
interface ProfileHeaderProps {
  initials: string;
  name: string;
  username: string;
  isPublic: boolean;
}
const copyProfileUrl = (username: string) => {
    // Get base URL without trailing path
    const baseUrl = window.location.origin
  
    // Create full profile URL with username
    const profileUrl = `${baseUrl}/${username.split("@")[1]}`
  
    // Create temporary input for copying
    const el = document.createElement('input')
    el.value = profileUrl
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)

  }

export function ProfileHeader({ initials, name, username, isPublic }: ProfileHeaderProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center space-y-4">
      <Avatar className="flex items-center justify-center h-32 w-32 bg-[#c97862] text-white text-4xl">
        <span>{initials}</span>
      </Avatar>
      <h1 className="text-2xl font-light">{name}</h1>
      <p className="text-gray-400 m-0">{username}</p>
      {!isPublic && (
  <div className="flex space-x-2">
    <Button variant="outline" size="sm" className="text-black border-white/20" onClick={() => {
      toast.success("Link Copied!");
      copyProfileUrl(username);
    }}>
      <Share className="h-4 w-4 mr-2" />
      Share
    </Button>
    <Button 
      onClick={() => router.push('/profile/options')} 
      variant="outline" 
      size="sm" 
      className="text-black border-white/20"
    >
      <Edit className="h-4 w-4 mr-2" />
      Edit
    </Button>
    <Button 
      onClick={() => router.push('/' + username)} 
      variant="outline" 
      size="sm" 
      className="text-black border-white/20"
    >
      View My public profile ! 
    </Button>
  </div>
)}
    </div>
  );
}
