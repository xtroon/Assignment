import React, { useState } from "react";

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

  return (
    <div className="w-[320px] rounded-xl border bg-white p-4 shadow-sm">
      {/* Image */}
      <div className="rounded-lg border bg-gray-50 p-4 flex items-center justify-center">
        <img
          src={getImageSrc(product.images?.[activeImage])}
          alt={product.productName}
          className="mx-auto h-40 object-contain"
        />
      </div>

      {/* Dots */}
      <div className="mt-3 flex justify-center gap-2">
        {(product.images?.length ? [...Array(product.images.length)] : [0]).map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveImage(i)}
            className={`h-2.5 w-2.5 rounded-full transition-colors ${
              i === activeImage ? "bg-orange-400" : "bg-gray-300"
            }`}
            aria-label={`image-dot-${i}`}
          />
        ))}
      </div>

      {/* Product Name */}
      <h2 className="mt-3 text-lg font-semibold text-gray-800 truncate">
        {product.productName}
      </h2>

      {/* Details */}
      <div className="mt-3 space-y-1 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Product Type</span>
          <span>{product.productType}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Quantity</span>
          <span>{product.quantityStock}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">MRP</span>
          <span>₹ {product.mrp}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Selling Price</span>
          <span>₹ {product.sellingPrice}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Brand</span>
          <span>{product.brandName}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Images</span>
          <span>{product.images?.length || 0}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">
            Exchange Eligibility
          </span>
          <span>{product.exchangeReturn}</span>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-4 flex items-center gap-2">
        <button
          onClick={() => onTogglePublish?.(product)}
          className={`flex-1 rounded-md py-2 text-white disabled:opacity-60 transition-colors ${
            published
              ? "bg-green-500 hover:bg-green-600"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {published ? "Unpublish" : "Publish"}
        </button>

        <button
          onClick={() => onEdit?.(product)}
          className="flex-1 rounded-md border-2 border-green-500 py-2 text-green-600 bg-white hover:bg-green-50"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete?.(product)}
          className="rounded-md border px-3 py-2 hover:bg-red-50 text-gray-600"
        >
          🗑
        </button>
      </div>
    </div>
  );
};

export default ProductCard;