import React from "react";
import { ChevronDown } from 'lucide-react'
import profilePic from '../assets/profilePic.jpeg'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className="bg-[#D1D5DB]">
      {/* Top Header */}
      <div className="flex items-center justify-end px-6 py-4 gap-4">
        <button className="flex items-center gap-2">
          <img src={profilePic} alt="profile" className="h-8 w-8 rounded-full" />
          <ChevronDown size={16} />
        </button>
      </div>
    </div>
  )
}

export default Header
