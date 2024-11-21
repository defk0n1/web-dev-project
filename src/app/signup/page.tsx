'use client'
import Link from 'next/link'

import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export const metadata = {
  fullScreen: true
}

export default function WishlistForm() {
  return (
    <div className="flex h-screen">
      <div className="flex-1 bg-[#A65A45] text-white flex flex-col justify-center items-start p-10">
        <Link href="/" className="flex items-center mb-4 text-white">
          <ArrowLeft className="mr-2" />
          Back to Home
        </Link>
        <h1 className="text-4xl font-bold">Create your wishlist in seconds</h1>
      </div>
      <div className="flex-1 bg-black text-white flex flex-col justify-center items-center p-10">
        <div className="max-w-sm w-full">
          <h2 className="text-2xl font-bold mb-2">Create your account</h2>
          <p className="mb-6">First, choose a username for Wed</p>
          <div className="flex items-center mb-4">
            <span className="bg-white text-black px-3 py-2 rounded-l-md">wed.tn/</span>
            <Input 
              className="rounded-l-none" 
              placeholder="username" 
            />
          </div>
          <Button className="w-full bg-[#5A2D1F]">Next</Button>
          <p className="mt-4 text-center">
            Already have an account? <a href="#" className="text-[#A65A45]">Login</a>
          </p>
        </div>
      </div>
    </div>
  )
}
