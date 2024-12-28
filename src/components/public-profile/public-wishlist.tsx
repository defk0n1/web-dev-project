import React, { useState } from 'react'
import { Trash2 , Eye } from 'lucide-react'

const PublicWishlist = ({wishlist, onDelete , onClick } : any) => {
  

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
      
      <button 
        onClick={onClick}
        className="flex flex-row justify-center align-center text-orange-500 hover:text-red-700 transition-colors cursor-pointer"
        aria-label="View Wishlist"
      >
        View
      </button>

      
    </div>
  )
}

export default PublicWishlist