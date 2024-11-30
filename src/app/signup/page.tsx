'use client'
import Link from "next/link"
import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { GoogleIcon } from '@/components/icons/GoogleIcon'
import { FacebookIcon } from '@/components/icons/FacebookIcon'


export default function WishlistForm() {
  const [step, setStep] = useState(1)

  return (
    <div className="flex flex-col md:flex-row max-h-screen md:h-screen">
      <div className="flex-1 bg-[#A65A45] text-white flex flex-col justify-center items-start p-10">
        <Link href="\" className="flex items-center mb-4 text-white">
          <ArrowLeft className="mr-2" />
          Back to Home
        </Link>
        <h1 className="text-4xl font-bold">Create your wishlist in seconds</h1>
      </div>
      <div className="flex-1 bg-black text-white flex flex-col justify-center items-center p-10">
        {step === 1 ? (
          <div className="max-w-sm w-full">
            <h2 className="text-2xl font-bold mb-2">Create your account</h2>
            <p className="mb-6">First, choose a username for Wed</p>
            <div className="flex items-center mb-4">
              <span className="bg-white text-black px-3 py-2 rounded-l-md">wed.tn/</span>
              <Input
              type="text"
              placeholder="Enter Username"
              className="flex-1 rounded-r-md rounded-tl-none rounded-bl-none"
              />
            </div>
            <Button className="w-full bg-[#5A2D1F]" onClick={() => setStep(2)}>Next</Button>
            <p className="mt-4 text-center">
              Already have an account? <Link href="\login" className="text-[#A65A45]">Login</Link>
            </p>
          </div>
        ) : (
          <div className="max-w-sm w-full">
            <h2 className="text-2xl font-bold mb-2">Welcome, User</h2>
            <p className="mb-6">Already have an account? <Link href="\login" className="text-[#A65A45]">Login</Link></p>
            <Button className="w-full mb-2 bg-white text-black flex items-center justify-center">
  <GoogleIcon className="mr-2" /> Sign up with Google
</Button>
<Button className="w-full mb-4 bg-white text-black flex items-center justify-center">
  <FacebookIcon className="mr-2" /> Sign up with Facebook
</Button>
            <div className="flex items-center mb-4">
              <hr className="flex-1 border-gray-600" />
              <span className="px-2">or</span>
              <hr className="flex-1 border-gray-600" />
            </div>
            <Input type="email" placeholder="Email" className="mb-2" />
            <Input type="password" placeholder="Password" className="mb-2" />
            <Input type="password" placeholder="Confirm Password" className="mb-4" />
            <Link href="\profile"><Button className="w-full bg-[#5A2D1F]">Sign Up</Button></Link>
          </div>
        )}
      </div>
    </div>
  )
}

