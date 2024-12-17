import React, { useState } from 'react'
import { Trash2 , Eye } from 'lucide-react'

const Wishlist = ({wishlist, onDelete , onClick } : any) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const handleDeleteWishlist = async () => {
    try {

      const response = await fetch(`/api/user/remove-wishlist/${wishlist.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        next:{tags : ['Wishlists']
          
        }


      })

      if (response.ok) {
        onDelete()
      } else {
        const errorData = await response.json()
        console.error('Failed to delete wishlist', errorData)
        // Optionally show an error toast or notification
      }
    } catch (error) {
      console.error('Error deleting wishlist', error)
    }
  }

  return (
    <div key={wishlist.id} className="bg-gray-800 rounded-lg p-4 relative flex flex-col">
      <div className="mb-4">
        <h2 className="mb-2 text-xl font-semibold text-white">
          {wishlist.title || 'Untitled Wishlist'}
        </h2>
        {wishlist.description && (
          <p className="text-sm text-slate-400">{wishlist.description}</p>
        )}
      </div>
      
      {/* Delete Button */}
      <button 
        onClick={() => setIsConfirmOpen(true)}
        className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition-colors"
        aria-label="Delete Wishlist"
      >
        <Trash2 size={20} />
      </button>
      <button 
        onClick={onClick}
        className="flex flex-row justify-center align-center text-orange-500 hover:text-red-700 transition-colors cursor-pointer"
        aria-label="View Wishlist"
      >
        View
      </button>

      {/* Confirmation Dialog */}
      {isConfirmOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl text-black">
            <h3 className="text-lg font-semibold mb-2 font-semibold text-left">Confirm Deletion</h3>
            <p className="mb-4">Are you sure you want to delete this wishlist?</p>
            <div className="flex justify-end space-x-2">
              <button 
                onClick={() => setIsConfirmOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button 
                onClick={handleDeleteWishlist}
                className="px-4 py-2 text-white rounded bg-[#c97862] hover:bg-[#c97862]/90"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Wishlist