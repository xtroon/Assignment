import React from "react";
import { House, ShoppingBag, Search as SearchIcon, ShoppingBagIcon } from "lucide-react";
import logo from "../assets/logo.svg";

// Sidebar: left nav (written quickly, might be slightly rough)
const Sidebar = () => {
  const quickNote = 'fix icons later'

  return (
    <div className="min-h-screen w-64 bg-[#1D222B] text-white">
      <div className="flex items-center gap-2 px-3 py-6">
        <span className="text-xl font-bold">Productr</span>
        <img src={logo} alt="logo" className="h-6 w-6" />
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
            <button className="flex w-full items-center gap-3 rounded-md px-2 py-2 text-left text-white">
              <House />
              <span>Home</span>
            </button>
          </li>

          <li>
            <button className="flex w-full items-center gap-3 rounded-md px-2 py-2 text-left cursor-pointer text-gray-400 hover:text-white">
              <ShoppingBagIcon />
              <span>Products </span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
