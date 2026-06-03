import React, { useState } from "react";
import { Delete } from "lucide-react";

const ProductCard = ({ product, onEdit, onTogglePublish, onDelete }) => {
  const [activeImage, setActiveImage] = useState(0);

  const published =
    product?.published || product?.isPublished || product?.status === "published";

  const getImageSrc = (img) => {
    if (!img) return "https://placehold.co/200x200";
    if (typeof img === "string") return img;
    try {
      return URL.createObjectURL(img);
    } catch (e) {
      return "https://placehold.co/200x200";
    }
  };

  const displayType = product.productType === "Foods" ? "Food" : product.productType;
  const displayExchange = product.exchangeReturn
    ? `. ${product.exchangeReturn.toUpperCase()}`
    : ". NO";

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {/* img block */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 flex items-center justify-center h-48">
        <img
          src={getImageSrc(product.images?.[activeImage])}
          alt={product.productName}
          className="mx-auto h-full max-h-40 object-contain"
        />
      </div>

      {/* img dots */}
      <div className="mt-3 flex justify-center">
        <div className="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-full px-2.5 py-1">
          {(product.images?.length ? [...Array(product.images.length)] : [0]).map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(i)}
              className={`h-2 w-2 rounded-full transition-all cursor-pointer ${
                i === activeImage ? "bg-[#f95738]" : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`image-dot-${i}`}
            />
          ))}
        </div>
      </div>


      <h2 className="mt-4 text-base font-bold text-gray-900 truncate">
        {product.productName}
      </h2>


      <div className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between items-center">
          <span className="text-slate-400">Product type -</span>
          <span className="text-gray-800 font-semibold">{displayType}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-slate-400">Quantity Stock -</span>
          <span className="text-gray-800 font-semibold">{product.quantityStock}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-slate-400">MRP -</span>
          <span className="text-gray-800 font-semibold">₹ {product.mrp}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-slate-400">Selling Price -</span>
          <span className="text-gray-800 font-semibold">₹ {product.sellingPrice}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-slate-400">Brand Name -</span>
          <span className="text-gray-800 font-semibold">{product.brandName}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-slate-400">Total Number of images -</span>
          <span className="text-gray-800 font-semibold">{product.images?.length || 0}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-slate-400">Exchange Eligibility -</span>
          <span className="text-gray-800 font-semibold">{displayExchange}</span>
        </div>
      </div>

      {/* actn btns */}
      <div className="mt-5 flex items-center gap-3">
        <button
          onClick={() => onTogglePublish?.(product)}
          className={`flex-1 rounded-lg py-2.5 text-sm font-semibold text-white transition-colors cursor-pointer ${
            published
              ? "bg-[#48c70e] hover:bg-[#3eb00b]"
              : "bg-[#1a30f3] hover:bg-[#1527c7]"
          }`}
        >
          {published ? "Unpublish" : "Publish"}
        </button>

        <button
          onClick={() => onEdit?.(product)}
          className="flex-1 rounded-lg border border-gray-300 py-2.5 text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-colors cursor-pointer text-center"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete?.(product)}
          className="rounded-lg border border-gray-300 p-2.5 text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer flex items-center justify-center"
          aria-label="Delete product"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;