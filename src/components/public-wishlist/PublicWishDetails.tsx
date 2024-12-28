'use client'

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Pencil, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { UpdateWish, DeleteWish } from "@/lib/clientData"
import { toast , ToastContainer } from "react-toastify";

interface WishProps {
  id: number
  productName: string
  description?: string
  retailer: string
  wishlistId: number
  createdAt: Date
  updatedAt: Date
  image: string
  amazonLink: string
}

export default function PublicWishDetails({
  id,
  productName,
  description,
  retailer,
  wishlistId,
  createdAt,
  updatedAt,
  image,
  amazonLink

}: WishProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const [editedWish, setEditedWish] = useState({
    productName,
    description,
    retailer,
  })
  const [error, setError] = useState<string | null>(null)


  

  return (
    <>
      <Card className="border-2 border-dashed border-slate-800 bg-slate-900/50 aspect-square flex flex-col items-center justify-center text-gray-400">
        <div className="text-white p-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Product Image */}
              <div className="bg-white rounded-lg p-8 flex">
               
              <Image
                  src={image || "/placeholder.svg?height=600&width=600"}
                  alt={productName}
                  width={600}
                  height={600}
                  className="w-full h-auto self-center"
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
                  Added on: {createdAt.split('T')[0]}
                </div>

                <div className="text-sm text-gray-400">
                  Last updated: {updatedAt.split('T')[0]}
                </div>

                <Button
                  className="w-full bg-[#c97862] hover:bg-[#c97862]/90"
                  asChild
                >
                  <Link rel="noopener noreferrer" target="_blank" href={amazonLink || "#"}  className="inline-flex items-center justify-center">
                    <Image
                      src="/amazon.png"
                      alt={retailer}
                      width={20}
                      height={20}
                      className="mr-2 h-5 w-5"
                    />
                    
                    <span className="ml-2">Product Page ↗</span>
                  </Link>
                </Button>

              
              </div>
            </div>
          </div>
        </div>
      </Card>

      
    </>
  )
}
