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
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const [editedWish, setEditedWish] = useState({
    productName,
    description,
    retailer,
  })
  const [error, setError] = useState<string | null>(null)


  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditedWish((prev) => ({ ...prev, [name]: value }))
  }
  const handleSave = async () => {
    console.log("Updated wish:", editedWish)
    // Add save logic here (e.g., API call)
    setError(null)

    try {
    const result  = await UpdateWish(editedWish,wishlistId,id)
    toast("Updated successfully")

    setIsEditing(false)
      
    } catch (error) {
    setError('An error occurred. Please try again.')
    }
    
  }

  const handleDeleteClick = async () => {
    setError(null)
    try {
    const result  = await DeleteWish(wishlistId,id)
    toast.success("Deleted successfully",{
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      })
    } catch (error) {
    setError('An error occurred. Please try again.')
    }
    

  }

  return (
    <>
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
                  Added on: {createdAt.split('T')[0]}
                </div>

                <div className="text-sm text-gray-400">
                  Last updated: {updatedAt.split('T')[0]}
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
                    onClick={() => setIsEditing(true)}
                  >
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="secondary"
                    className="w-full bg-red-800 hover:bg-gray-700 text-white"
                    onClick={() => setIsDeleting(true)}
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

      {/* Edit Modal */}
      {isEditing && (
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Wish</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="productName">Product Name</Label>
                <Input
                  id="productName"
                  name="productName"
                  value={editedWish.productName}
                  onChange={handleEditChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={editedWish.description}
                  onChange={handleEditChange}
                />
              </div>

              <div>
                <Label htmlFor="retailer">Retailer</Label>
                <Input
                  id="retailer"
                  name="retailer"
                  value={editedWish.retailer}
                  onChange={handleEditChange}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="secondary"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleSave}>Save</Button>
              {error && <p className="text-red-500">{error}</p>}

            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      {isDeleting && (
        <Dialog open={isDeleting} onOpenChange={setIsDeleting}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete wish</DialogTitle>
            </DialogHeader>
            
              <p>Are you sure you want to delete this wish?</p>

            
            
            <DialogFooter>
              <Button
                variant="secondary"
                onClick={() => setIsDeleting(false)}
              >
                Cancel
              </Button>
              <Button className="bg-red-800 hover:bg-gray-700 text-white" onClick={handleDeleteClick}>Delete</Button>
              {error && <p className="text-red-500">{error}</p>}

            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
