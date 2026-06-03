import React from 'react'

const DeletePopup = ({ open, product, onClose, onConfirm }) => {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md mx-4 rounded-lg bg-white p-6 shadow-lg">
        <h3 className="text-lg font-semibold mb-2">Delete Product</h3>
        <p className="text-sm text-gray-600 mb-6">
          Are you sure you really want to delete this Product 
          <span className="text-gray-800 font-semibold">"{product?.productName}"</span> ?
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200"
          >
            Cancel
          </button>

          <button
            onClick={() => onConfirm(product)}
            className="px-4 py-2 rounded bg-blue-700 text-white hover:bg-blue-800"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeletePopup
