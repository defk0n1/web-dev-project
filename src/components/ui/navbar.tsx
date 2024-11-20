import React from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"


const Navbar = () => {
  return (<>
    <nav className="container mx-auto px-4 py-4">
    <div className="flex items-center justify-center gap-12 ">
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-bold">W</span>
        </Link>
          <Link href="/" className="text-sm hover:text-gray-300">
            Home
          </Link>
          <Link href="/partners" className="text-sm hover:text-gray-300">
            Partners
          </Link>
        <Link href="/login" className="text-sm hover:text-gray-300">
          Login
        </Link>
        <Button
          className="bg-[#c25e44] hover:bg-[#b35540] text-white rounded-full px-6"
        >
          Sign up
        </Button>
    </div>
  </nav> 
 </> )
}

export default Navbar