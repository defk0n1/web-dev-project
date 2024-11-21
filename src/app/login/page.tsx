'use client'

import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from "next/link"
import { GoogleIcon } from '@/components/icons/GoogleIcon'
import { FacebookIcon } from '@/components/icons/FacebookIcon'


export default function LoginPage() {
  return (
    <div className="flex h-screen">
      <div className="flex-1 bg-[#A65A45] text-white flex flex-col justify-center items-start p-10">
        <Link href="\" className="flex items-center mb-4 text-white">
          <ArrowLeft className="mr-2" />
          Back to Home
        </Link>
        <h1 className="text-4xl font-bold">Login</h1>
      </div>
      <div className="flex-1 bg-black text-white flex flex-col justify-center items-center p-10">
        <div className="max-w-sm w-full">
          <h2 className="text-2xl font-bold mb-2">Login to your account</h2>
          <Button className="w-full mb-2 bg-white text-black flex items-center justify-center">
  <GoogleIcon className="mr-2" /> Sign in with Google
</Button>
<Button className="w-full mb-4 bg-white text-black flex items-center justify-center">
  <FacebookIcon className="mr-2" /> Sign in with Facebook
</Button>
          <div className="flex items-center mb-4">
            <hr className="flex-1 border-gray-600" />
            <span className="px-2">or</span>
            <hr className="flex-1 border-gray-600" />
          </div>
          <Input type="email" placeholder="Email" className="mb-2" />
          <Input type="password" placeholder="Password" className="mb-4" />
          <Button className="w-full bg-[#5A2D1F]">Sign in</Button>
          <p className="mt-4 text-center">
            Don’t have an account? <Link href="\signup" className="text-[#A65A45]">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}