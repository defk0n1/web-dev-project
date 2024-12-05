'use client'

import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from "next/link"
import { GoogleIcon } from '@/components/icons/GoogleIcon'
import { FacebookIcon } from '@/components/icons/FacebookIcon'
import { useState } from "react"
import { useRouter } from 'next/navigation'

import {signIn} from "next-auth/react"

export default function LoginPage() {
  const router = useRouter()

  const [ data , setData ] = useState({
    email:'',
    password:''
  });

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    signIn("credentials",{
      ...data,
      redirect:false
    });
    router.push('/profile')
    



  }


  return (
    <div className="flex flex-col md:flex-row max-h-screen md:h-screen">
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
          <Input onChange={(e) => { setData({ ...data, email: e.target.value }) }} value={data.email} type="email" placeholder="Email" className="mb-2" />
          <Input onChange={(e) => { setData({ ...data, password: e.target.value }) }} value={data.password} type="password" placeholder="Password" className="mb-4" />
          <Button onClick={handleSubmit} className="w-full bg-[#5A2D1F]">Sign in</Button>
          <p className="mt-4 text-center">
            Don’t have an account? <Link href="\signup" className="text-[#A65A45]">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}