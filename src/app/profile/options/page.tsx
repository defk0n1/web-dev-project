"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PencilIcon, Plus, Trash2, Facebook, Instagram, Linkedin } from 'lucide-react'
import { Skeleton } from "@/components/ui/skeleton"
import {ProfilePictureUpload} from "@/components/profile/profile-picture-upload"
import { EditUserProfile } from "@/lib/clientData"


interface SocialLink {
  platform: 'facebook' | 'instagram' | 'tiktok' | 'linkedin';
  url: string;
}

interface User {
  username: string;
  fullName: string;
  socials: SocialLink[];
  image: string
}

const SOCIAL_PLATFORMS = [
  { id: 'facebook', label: 'Facebook', icon: Facebook, placeholder: 'Enter Facebook profile URL' },
  { id: 'instagram', label: 'Instagram', icon: Instagram, placeholder: 'Enter Instagram profile URL' },
  { id: 'tiktok', label: 'TikTok', icon: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.32 6.95c-1.96-.23-3.48-1.83-3.48-3.83h-3.18v13.88c0 1.96-1.59 3.56-3.55 3.56s-3.55-1.6-3.55-3.56c0-1.97 1.59-3.56 3.55-3.56.27 0 .53.03.78.08v-3.23c-.26-.03-.52-.05-.78-.05-3.73 0-6.75 3.02-6.75 6.75S5.38 23.75 9.11 23.75s6.75-3.02 6.75-6.75v-6.6c1.23.75 2.69 1.19 4.25 1.19v-3.23c-.27 0-.53-.01-.79-.04z" fill="currentColor"/>
    </svg>
  ), placeholder: 'Enter TikTok profile URL' },
  { id: 'linkedin', label: 'LinkedIn', icon: Linkedin, placeholder: 'Enter LinkedIn profile URL' }
] as const;

export default function ProfileEditForm() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [profileData, setProfileData] = useState<User>({
    username: "",
    fullName: "",
    socials: [],
    image:""
  })

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/user')
        if (!response.ok) throw new Error('Failed to fetch user')
        const data = await response.json()
        console.log(data)
        setProfileData({
          username: data.username || "",
          fullName: data.fullName || "",
          socials: data.socials || [],
          image: data.image || ""
        })
      } catch (err: any) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchUser()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log(profileData)
   
    try {
      const response = await EditUserProfile(profileData)
      console.log("Profile updated successfully")
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleSocialChange = (index: number, field: 'platform' | 'url', value: string) => {
    const newSocials = [...profileData.socials]
    newSocials[index] = {
      ...newSocials[index],
      [field]: value
    }
    setProfileData({ ...profileData, socials: newSocials })
  }

  const addSocialLink = () => {
    setProfileData({
      ...profileData,
      socials: [...profileData.socials, { platform: 'facebook', url: '' }]
    })
  }

  const removeSocialLink = (index: number) => {
    const newSocials = profileData.socials.filter((_, i) => i !== index)
    setProfileData({ ...profileData, socials: newSocials })
  }

  if (isLoading) return 
      <div className="w-full max-w-2xl mt-8 mx-auto p-8 rounded-lg bg-[#4a4a43]/50">
        <div className="space-y-8">
          {/* Profile Picture Skeleton */}
          <div className="flex justify-center">
            <div className="relative">
              <Skeleton className="h-32 w-32 rounded-full" />
              <Skeleton className="absolute bottom-0 right-0 h-8 w-8 rounded-full" />
            </div>
          </div>
          
          {/* Edit Profile Text */}
          <div className="flex justify-center">
            <Skeleton className="h-4 w-24" />
          </div>
  
          {/* Username Field */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <div className="flex rounded-md overflow-hidden">
              <Skeleton className="h-10 w-20" />
              <Skeleton className="h-10 flex-1" />
            </div>
          </div>
  
          {/* Full Name Field */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-10 w-full" />
          </div>
  
          {/* Socials Section */}
          <div className="space-y-4">
            <Skeleton className="h-4 w-24" />
            
            {/* Three skeleton social entries */}
            {[1, 2, 3].map((index) => (
              <div key={index} className="flex gap-2">
                <Skeleton className="h-10 w-[140px]" />
                <Skeleton className="h-10 flex-1" />
                <Skeleton className="h-10 w-10" />
              </div>
            ))}
            
            {/* Add Social Button */}
            <Skeleton className="h-10 w-full" />
          </div>
  
          {/* Save Button */}
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    
  
  if (error) return <div className="text-center text-red-500">{error}</div>

  return (
    <div className="w-full max-w-2xl mt-8 mx-auto p-8 rounded-lg bg-[#4a4a43]/50">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* <div className="flex justify-center">
          <div className="relative">
            <Avatar className="h-32 w-32 bg-white">
              <AvatarImage src="/placeholder.svg" alt="Profile picture" />
              <AvatarFallback>
                {profileData.fullName?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <Button
              type="button"
              size="sm"
              className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-[#c97862] hover:bg-[#c97862]/90 p-0"
            >
              <PencilIcon className="h-4 w-4" />
              <span className="sr-only">Change profile picture</span>
            </Button>
          </div>
        </div> */}
        <ProfilePictureUpload image={profileData.image || "/pfpplaceholder.png"}></ProfilePictureUpload>
        
        <p className="text-center text-gray-400">Edit profile info</p>

        <div className="space-y-2">
          <Label htmlFor="username" className="text-gray-400">
            Username
          </Label>
          <div className="flex rounded-md overflow-hidden bg-[#5c5c54]">
            <span className="px-3 py-2 bg-[#4a4a43] text-gray-400 border-r border-gray-600">
              wed.tn/
            </span>
            <Input
              id="username"
              value={profileData.username}
              onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
              className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-gray-400">
            Full Name
          </Label>
          <Input
            id="fullName"
            value={profileData.fullName}
            onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
            className="bg-[#5c5c54] border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>

        <div className="space-y-4">
          <Label className="text-gray-400">Social Media Links</Label>
          {profileData.socials.map((social, index) => (
            <div key={index} className="flex gap-2">
              <Select
                value={social.platform}
                onValueChange={(value) => handleSocialChange(index, 'platform', value)}
              >
                <SelectTrigger className="w-[140px] bg-[#5c5c54] border-0">
                  <SelectValue>
                    <div className="flex items-center gap-2">
                      {SOCIAL_PLATFORMS.find(p => p.id === social.platform)?.label}
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {SOCIAL_PLATFORMS.map((platform) => (
                    <SelectItem key={platform.id} value={platform.id}>
                      <div className="flex items-center gap-2">
                        <platform.icon className="w-4 h-4" />
                        {platform.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                value={social.url}
                onChange={(e) => handleSocialChange(index, 'url', e.target.value)}
                placeholder={SOCIAL_PLATFORMS.find(p => p.id === social.platform)?.placeholder}
                className="flex-1 bg-[#5c5c54] border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => removeSocialLink(index)}
                className="bg-[#5c5c54] border-0 text-gray-400 hover:bg-[#6c6c64] hover:text-white"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            className="w-full bg-[#5c5c54] border-0 text-gray-400 hover:bg-[#6c6c64] hover:text-white"
            onClick={addSocialLink}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Social Link
          </Button>
        </div>

        <Button
          type="submit"
          className="w-full bg-[#c97862] hover:bg-[#c97862]/90 text-white"
        >
          Save Profile Changes
        </Button>
      </form>
    </div>
  )
}