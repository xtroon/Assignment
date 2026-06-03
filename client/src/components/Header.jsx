import React from "react";
import { ChevronDown, Menu } from 'lucide-react'
import profilePic from '../assets/profilePic.jpeg'

const Header = ({ onMenuClick }) => {
  return (
    <div className="bg-[#D1D5DB]">
      {/* top header */}
      <div className="flex items-center justify-between md:justify-end px-6 py-4 gap-4">
        {/* hamberger*/}
        <button 
          onClick={onMenuClick}
          className="md:hidden p-1 rounded-md text-gray-700 hover:text-gray-900 cursor-pointer"
          aria-label="Open sidebar"
        >
          <Menu size={24} />
        </button>

        <button className="flex items-center gap-2">
          <img src={profilePic} alt="profile" className="h-8 w-8 rounded-full" />
          <ChevronDown size={16} />
        </button>
      </div>
    </div>
  )
}

export default Header
