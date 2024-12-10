import Link from "next/link"
import { Gift } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function PartnersPage() {
  const partners = [
    { name: "Tunisianet", logo: "Tunisianet" },
    { name: "Mytek", logo: "Mytek" },
    { name: "Apple", logo: "" },
    { name: "Nespresso", logo: "NESPRESSO" },
    { name: "Elgato", logo: "elgato" },
    { name: "Dyson", logo: "dyson" },
    { name: "Amazon", logo: "amazon" },
    { name: "Bose", logo: "BOSE" },
    { name: "Nintendo", logo: "Nintendo" },
    { name: "Nike", logo: "" },
    { name: "G FUEL", logo: "G FUEL" },
    { name: "HEALTH-ADE", logo: "HEALTH-ADE" },
    { name: "Adidas", logo: "adidas" },
  ]

  return (
    <div className="min-h-screen bg-black text-white">

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-16">
          Partners
        </h1>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="bg-[#C97862] rounded-lg p-6 flex items-center justify-center h-24 transition-transform hover:scale-105"
            >
              <span className="text-white text-xl font-bold">
                {partner.logo || partner.name}
              </span>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
