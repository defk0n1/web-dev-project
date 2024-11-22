import React from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { usePathname } from 'next/navigation'
import { Divide } from 'lucide-react'
import Image from 'next/image'


const Navbar = () => {
    const pathname = usePathname();
    console.log(pathname)


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
          {pathname === "/" ?  <><Link href="/login" className="text-sm hover:text-gray-300">
          Login
        </Link>
        <Link href="\signup"><Button
          className="bg-[#c25e44] hover:bg-[#b35540] text-white rounded-full px-6"
        >
          Sign up
        </Button> </Link> </> :  <><Link href="\signup"><Button
          className="bg-[#c25e44] hover:bg-[#b35540] text-white rounded-full px-6"
        >
          Add wish
        </Button> </Link>
         <Link href="/" className="flex items-center">
         <Image
           src="/globe.svg"
           alt="Logo"
           width={32}
           height={32}
           className="text-[#c97862]"
         />
       </Link></> }
       
       
    </div>
  </nav> 
 </> )
}

export default Navbar