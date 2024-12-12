 import Image from "next/image"
import { Button } from "@/components/ui/button"
import { DM_Sans } from 'next/font/google'
import { Dynalight  } from 'next/font/google'
import Link from "next/link"
import { BrandImage } from '@/lib/types'


import InfiniteSliderCarousel from "@/components/home/InfiniteSliderCarousel"
 
const dm_Sans = DM_Sans({ subsets: ['latin'] })
const dynalight = Dynalight({ weight: ['400'] })

const brandImages: BrandImage[] = [
  { id: 1, name: "MyTek", link: "https://www.mytek.tn/" },
  { id: 2, name: "Ben Yaghlene Shops", link: "https://ben-yaghlane.com/" },
  { id: 3, name: "Peak", link: "https://www.peaksports.tn/" },
  { id: 4, name: "SBS Informatique", link: "https://www.sbsinformatique.com/" },
  { id: 5, name: "Tunisianet", link: "https://www.tunisianet.com.tn/" },
];


export default function Home() {
  return (
    
      <> 
      {/* Hero Section */}
      <main className={"container mx-auto px-4 text-center pt-20 pb-32 relative overflow-hidden "+ dm_Sans.className }>
        {/* Decorative shapes */}
        <div className="absolute top-0 left-0 w-1/4 h-full bg-[#4d1410] rounded-full blur-[150px] -translate-x-1/2" />
        <div className="absolute top-0 right-0 w-1/4 h-full bg-[#4d1410] rounded-full blur-[150px] translate-x-1/2" />
        
        <div className="relative">
          <h1 className="text-9xl font-bold mb-4 bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
            Wish
          </h1>
          <p className="text-3xl mb-2 text-gray-500	">
            and get what you
          </p>
          <p className="text-3xl mb-8">
            <span className={"italic " + dynalight.className}>actually</span>
            <span className="text-gray-500"> wished for</span>
          </p>
          <Link href="/signup">
          <Button 
            className="bg-[#c25e44] hover:bg-[#b35540] text-white text-lg px-8 py-6 rounded"
          >
            Create your wishlist!
          </Button>
          </Link>
        </div>

        {/* Partners Section */}
        <div className="mt-24">
          <p className="text-gray-400 mb-8">Our partners :</p>
          {/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {['ASUS', 'Amazon', 'Apple', 'Bose', 'Nespresso', 'Elgato'].map((brand) => (
              <div
                key={brand}
                className="bg-[#c25e44] rounded-lg px-6 py-4 flex items-center justify-center"
              >
                <span className="text-white font-bold">{brand}</span>
              </div>
            ))}
          </div>   */}
          <InfiniteSliderCarousel items={brandImages}></InfiniteSliderCarousel>



        </div>
      </main>
      </>
  )
}