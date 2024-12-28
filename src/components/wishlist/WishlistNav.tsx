import React from 'react'

const WishlistNav = ({ title} :any) => {

  return (
    <nav className="p-4 text-gray-400">
    <div className="flex items-center gap-2">
      <span>›</span>
      <span>{title}</span>
    </div>
  </nav>  )
}

export default WishlistNav