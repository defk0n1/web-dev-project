"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PencilIcon, Plus } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ProfileEditForm() {
  const [profileData, setProfileData] = useState({
    username: "zied",
    displayName: "Zied Kallel",
    socials: [] as string[]
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Saving profile changes:", profileData)
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-8 rounded-lg bg-[#4a4a43]/50">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Profile Picture */}
        <div className="flex justify-center">
          <div className="relative">
            <Avatar className="h-32 w-32 bg-white">
              <AvatarImage src="/placeholder.svg" alt="Profile picture" />
              <AvatarFallback>ZK</AvatarFallback>
            </Avatar>
            <Button
              size="sm"
              className="absolute top-0 right-0 h-8 w-8 rounded-full bg-[#c97862] hover:bg-[#c97862]/90 p-0"
            >
              <PencilIcon className="h-4 w-4" />
              <span className="sr-only">Edit profile picture</span>
            </Button>
          </div>
        </div>
        <p className="text-center text-gray-400">Click to Edit</p>

        {/* Username */}
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

        {/* Display Name */}
        <div className="space-y-2">
          <Label htmlFor="displayName" className="text-gray-400">
            Display Name
          </Label>
          <Input
            id="displayName"
            value={profileData.displayName}
            onChange={(e) => setProfileData({ ...profileData, displayName: e.target.value })}
            className="bg-[#5c5c54] border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>

        {/* Socials */}
        <div className="space-y-2">
          <Label className="text-gray-400">Socials</Label>
          <Button
            type="button"
            variant="outline"
            className="w-full bg-[#5c5c54] border-0 text-gray-400 hover:bg-[#6c6c64] hover:text-white"
            onClick={() => {
              // Handle adding social link
              setProfileData({ ...profileData, socials: [...profileData.socials, ""] })
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Social Link
          </Button>
        </div>

        {/* Save Button */}
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

