import React from 'react'

const Wishlist = ({wishlist} : any) => {
  return (
    <div key={wishlist.id} className="bg-gray-800 rounded-lg p-4">
            <div className="mb-4">
              <h2 className="mb-2 text-xl font-semibold text-white">
                {wishlist.title || 'Untitled Wishlist'}
              </h2>
              {wishlist.description && (
                <p className="text-sm text-slate-400">{wishlist.description}</p>
              )}
            </div>
          </div>
  )
}

export default Wishlist