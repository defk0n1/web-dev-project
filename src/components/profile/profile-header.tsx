"use client"

import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Share, Edit } from 'lucide-react'
import { useRouter } from "next/navigation"
import { toast } from 'react-toastify';
import Image from "next/image"
  import 'react-toastify/dist/ReactToastify.css';
import ProfilePictureUpload from "./profile-picture-upload"
import { PencilIcon, Plus, Trash2, Facebook, Instagram, Linkedin } from 'lucide-react'


interface ProfileHeaderProps {
  fullName: string | undefined;
  username: string | undefined;
  image:string | undefined ;
  socials : any
}
const notify = () => alert("Link copied to clipboard.");
const copyProfileUrl = (username: string) => {
    // Get base URL without trailing path
    const baseUrl = window.location.origin
  
    // Create full profile URL with username
    const profileUrl = `${baseUrl}/${username}`
  
    // Create temporary input for copying
    const el = document.createElement('input')
    el.value = profileUrl
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)

  }

  const TikTokIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M19.32 6.95c-1.96-.23-3.48-1.83-3.48-3.83h-3.18v13.88c0 1.96-1.59 3.56-3.55 3.56s-3.55-1.6-3.55-3.56c0-1.97 1.59-3.56 3.55-3.56.27 0 .53.03.78.08v-3.23c-.26-.03-.52-.05-.78-.05-3.73 0-6.75 3.02-6.75 6.75S5.38 23.75 9.11 23.75s6.75-3.02 6.75-6.75v-6.6c1.23.75 2.69 1.19 4.25 1.19v-3.23c-.27 0-.53-.01-.79-.04z"
        fill="currentColor"
      />
    </svg>
  );
  
  // Icon mapping
  const platformIcons: Record<string, JSX.Element> = {
    tiktok: <TikTokIcon />,
    facebook: <Facebook className="w-4 h-4" />,
    instagram: <Instagram className="w-4 h-4" />,
    linkedin: <Linkedin className="w-4 h-4" />,
  };
  
  interface SocialLink {
    platform: string;
    url: string;
  }
  
  interface Props {
    socials: SocialLink[];
  }
  
  const SocialLinksDisplay: React.FC<Props> = ({ socials }) => {
    return (
      <>
        {socials.map((social, index) => (
        
          <p
            key={index}
            // href={social.url}
            // target="_blank"
            // rel="noopener noreferrer"
            className="flex justify-center w-fit align-center"          >
            {platformIcons[social.platform] || <span>?</span>}
            <span className="ml-2">{social.url}</span>
          </p>
        ))}
      </>
    );
  };
  

export function ProfileHeader({ fullName, username, image , socials }: ProfileHeaderProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center space-y-4">
      <Avatar className="flex items-center justify-center h-32 w-32 bg-[#c97862] text-white text-4xl">
        {/* <Image alt="globe" src="/globe.svg" width={900} height={900}></Image> */}
        <ProfilePictureUpload image={image}></ProfilePictureUpload>
      </Avatar>
      <h1 className="text-2xl font-light">{fullName}</h1>
      <p className="text-gray-400 m-0">{username}</p>
      <div className="flex space-x-4">
      <SocialLinksDisplay socials={socials}/>
      </div>
      <div className="flex space-x-2">
        <Button variant="outline" size="sm" className="text-black border-white/20" onClick={() => {
    copyProfileUrl(username);
    notify();
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
      </div>
    </div>
  );
}
