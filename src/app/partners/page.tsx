import Link from "next/link"
import { Gift } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { BrandImage } from "@/lib/types"
import Image from 'next/image'


export default function PartnersPage() {
  const partners: BrandImage[] = [
    { id: 1, name: "MyTek", link: "https://www.mytek.tn/" },
  { id: 2, name: "Ben Yaghlene Shops", link: "https://ben-yaghlane.com/" },
  { id: 3, name: "Peak", link: "https://www.peaksports.tn/" },
  { id: 4, name: "SBS Informatique", link: "https://www.sbsinformatique.com/" },
  { id: 5, name: "Tunisianet", link: "https://www.tunisianet.com.tn/" },
];
  return (
    <div className="min-h-screen bg-black text-white">

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-16">
          Partners
        </h1>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-12 mt-6" style={{height:"fit-content" , alignItems:"center"}}>
          {partners.map((partner) => (
            <Link href={partner.link} key={partner.id}>
            <div
              key={partner.name}
              className="rounded-lg p-6 flex items-center justify-center h-24 transition-transform hover:scale-105"
              style={{height:"fit-content"}}
            >
               <Image src={`/images/${partner.id}.png`} alt={partner.name} width={200} height={200} />
            </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
