'use client'

import { useState } from 'react'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { EditWishlist } from '@/lib/clientData'

function SubmitButton({ pending }: { pending: boolean }) {
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Adding...' : 'Save'}
    </Button>
  )
}

export function EditWishlistForm({ wishlistId, onSuccess }: { wishlistId: any, onSuccess: () => void }) {
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setPending(true)

    const formData = new FormData(event.currentTarget)
    const payload = Object.fromEntries(formData.entries())
    console.log(payload) // Log all form data

    try {
      // Replace this with your actual API call
      console.log(wishlistId , " " , payload)
      const result = await EditWishlist(payload, wishlistId)

      // Mock result

      // Use toast or your desired notification
      // onSuccess()
      
    } catch (error) {
      setError('An error occurred. Please try again.')
    } finally {
      setPending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="hidden" name="wishlistId" value={wishlistId} />
      
      

      <div>
        <Label htmlFor="privacy">Privacy</Label>
        <select
          id="privacy"
          name="privacy"
          required
          className="block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
        >
          <option value="PRIVATE">Private</option>
          <option value="PUBLIC">Public</option>
        </select>
      </div>
      
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" />
      </div>
      
     
      
      {error && <p className="text-red-500">{error}</p>}
      
      <SubmitButton pending={pending} />
    </form>
  )
}
