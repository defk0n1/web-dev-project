import React from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Pencil, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

interface WishProps {
  image: string
  name: string
  price: number
  link: string
  vendor?: string
  vendorlogo?: string
}

export default function WishDetails({ name, price, link, image, vendor, vendorlogo }: WishProps) {
  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-white rounded-lg p-8">
            <Image
              src={image}
              alt="dreame D10 Plus Gen 2"
              width={600}
              height={600}
              className="w-full h-auto"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div className="inline-flex items-center px-2.5 py-1 rounded-md text-sm bg-gray-800 text-gray-300">
              {vendor}
            </div>

            <h1 className="text-2xl font-semibold leading-tight">
              {name}
            </h1>
            <div className="text-3xl font-bold">${price}</div>

            <Button
              className="w-fullbg-[#c97862] hover:bg-[#c97862]/90"
              asChild
            >
              <Link href="#" className="inline-flex items-center justify-center">
                <Image
                  src={vendorlogo}
                  alt="Amazon"
                  width={20}
                  height={20}
                  className="mr-2 h-5 w-5"
                />
                {vendor}
                <span className="ml-2">↗</span>
              </Link>
            </Button>

            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="secondary"
                className="w-fullbg-[#c97862] hover:bg-[#c97862]/90"
              >
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button
                variant="secondary"
                className="w-full bg-gray-800 hover:bg-gray-700 text-white"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
