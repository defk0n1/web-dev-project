'use client'

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Pencil, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"


interface WishProps {
  id: number
  productName: string
  description?: string
  retailer: string
  wishlistId: number
  createdAt: Date
  updatedAt: Date
}

export default function WishDetails({
  id,
  productName,
  description,
  retailer,
  wishlistId,
  createdAt,
  updatedAt
}: WishProps) {

  console.log("rendered")
  return (
    <Card className="border-2 border-dashed border-slate-800 bg-slate-900/50 aspect-square flex flex-col items-center justify-center text-gray-400">

    <div className="text-white p-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-white rounded-lg p-8">
            <Image
              src="/placeholder.svg?height=600&width=600"
              alt={productName}
              width={600}
              height={600}
              className="w-full h-auto"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div className="inline-flex items-center px-2.5 py-1 rounded-md text-sm bg-gray-800 text-gray-300">
              {retailer}
            </div>

            <h1 className="text-2xl font-semibold leading-tight">
              {productName}
            </h1>
            
            {description && (
              <p className="text-gray-300">{description}</p>
            )}

            <div className="text-sm text-gray-400">
              Added on: {createdAt}
            </div>

            <div className="text-sm text-gray-400">
              Last updated: {updatedAt}
            </div>

            <Button
              className="w-full bg-[#c97862] hover:bg-[#c97862]/90"
              asChild
            >
              <Link href="#" className="inline-flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=20&width=20"
                  alt={retailer}
                  width={20}
                  height={20}
                  className="mr-2 h-5 w-5"
                />
                {retailer}
                <span className="ml-2">↗</span>
              </Link>
            </Button>

            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="secondary"
                className="w-full bg-[#c97862] hover:bg-[#c97862]/90"
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
    </Card>
  )
}

