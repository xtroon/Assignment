import React, { useState } from 'react'
import LeftArea from './LeftArea'

const Otp = () => {
  const [email, setEmail] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    
    console.log('otp submit', email)
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <LeftArea/>
      <div className="flex flex-1 flex-col justify-center items-center px-16 py-12 gap-50">
        {/* login form */}
        <div className="w-full max-w-md">
          {/* head txt */}
          <h1 className="mb-12 text-center text-2xl font-bold text-gray-900">
            Login to your Productr Account
          </h1>

          {/* main form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* email input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email or phone number
              </label>
              <input
                type="text"
                placeholder="Enter email or phone number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg cursor-pointer bg-blue-900 py-3 font-semibold text-white hover:bg-blue-800 transition"
            >
              Login
            </button>
          </form>
        </div>

      </div>
    </div>
  )
}

export default Otp
