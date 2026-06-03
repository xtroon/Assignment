import React from "react";
import { House, Search as SearchIcon, ShoppingBagIcon, X } from "lucide-react";
import { Link, useLocation } from 'react-router-dom'
import logo from "../assets/logo.svg";

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation()

  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#1D222B] text-white transition-transform duration-300 transform md:relative md:translate-x-0 flex-shrink-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
      <div className="flex items-center justify-between px-3 py-6">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold">Productr</span>
          <img src={logo} alt="logo" className="h-6 w-6" />
        </div>
        {/* clse btn */}
        <button
          onClick={onClose}
          className="md:hidden text-gray-400 hover:text-white p-1 cursor-pointer"
          aria-label="Close sidebar"
        >
          <X size={20} />
        </button>
      </div>

      <div className="relative px-1">
        <SearchIcon
          size={16}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search..."
          className="w-full rounded-lg bg-[#2F343D] py-2.5 pl-10 pr-3 text-sm text-white placeholder:text-gray-400 outline-none"
        />
      </div>

      <nav className="mt-6 px-2">
        <ul className="space-y-2">
          <li>
            <Link
              to="/home"
              onClick={onClose}
              className={`flex w-full items-center gap-3 rounded-md px-2 py-2 text-left ${location.pathname === '/home' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
            >
              <House />
              <span>Home</span>
            </Link>
          </li>

          <li>
            <Link
              to="/products"
              onClick={onClose}
              className={`flex w-full items-center gap-3 rounded-md px-2 py-2 text-left ${location.pathname === '/products' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
            >
              <ShoppingBagIcon />
              <span>Products </span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
