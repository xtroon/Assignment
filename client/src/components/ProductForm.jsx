import { X, Upload } from "lucide-react";
import { useState, useEffect } from "react";

const ProductForm = ({ onClose, onCreate, initialData, onUpdate }) => {
  const [formData, setFormData] = useState({
    productName: "",
    productType: "Foods",
    quantityStock: "",
    mrp: "",
    sellingPrice: "",
    brandName: "",
    exchangeReturn: "Yes",
  });

  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});

  // edit edit
  useEffect(() => {
    if (initialData) {
      setFormData({
        productName: initialData.productName || "",
        productType: initialData.productType || "Foods",
        quantityStock: initialData.quantityStock || "",
        mrp: initialData.mrp || "",
        sellingPrice: initialData.sellingPrice || "",
        brandName: initialData.brandName || "",
        exchangeReturn: initialData.exchangeReturn || "Yes",
      });

      if (initialData.images) {
        setImages(initialData.images);
      }
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = (e) => {
    setImages([...images, ...Array.from(e.target.files)]);
  };

  const removeImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  const getImagePreviewUrl = (img) => {
    if (!img) return "";
    if (typeof img === "string") return img;
    try {
      return URL.createObjectURL(img);
    } catch (err) {
      console.warn("Could not create object URL for preview:", err);
      return "";
    }
  };


  const validateForm = () => {
    let newErrors = {};

    // name
    if (!formData.productName.trim()) {
      newErrors.productName = "Enter product name";
    }

    // stoxck
    if (!formData.quantityStock) {
      newErrors.quantityStock = "Enter quantity";
    } else if (Number(formData.quantityStock) <= 0) {
      newErrors.quantityStock = "Quantity must be greater than 0";
    }

    // mrp
    if (!formData.mrp) {
      newErrors.mrp = "Enter MRP";
    } else if (Number(formData.mrp) <= 0) {
      newErrors.mrp = "MRP must be greater than 0";
    }

    // price
    if (!formData.sellingPrice) {
      newErrors.sellingPrice = "Enter selling price";
    } else if (Number(formData.sellingPrice) <= 0) {
      newErrors.sellingPrice = "Selling price must be greater than 0";
    }

    // price <= mrp
    if (
      formData.mrp &&
      formData.sellingPrice &&
      Number(formData.sellingPrice) > Number(formData.mrp)
    ) {
      newErrors.sellingPrice = "Selling price cannot be greater than MRP";
    }

    // brand
    if (!formData.brandName.trim()) {
      newErrors.brandName = "Enter brand name";
    }

    // image
    if (images.length === 0) {
      newErrors.images = "Please upload at least one image";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const submitProduct = {
      id: initialData?.id || Date.now(),
      ...formData,
      images,
      status: initialData?.status || "published",
    };

    if (initialData && onUpdate) {
      onUpdate(submitProduct);
    } else if (!initialData && onCreate) {
      onCreate(submitProduct);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <div className="w-full max-w-md rounded-lg bg-white shadow-lg">
        {/* header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-4">
          <h2 className="text-lg font-semibold">{initialData ? "Edit Product" : "Add Product"}</h2>

          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* form */}
        <form onSubmit={handleSubmit} className="space-y-2 p-5">
          {/* name */}
          <div>
            <label className="block mb-1 text-sm">Product Name</label>

            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
            />

            {errors.productName && (
              <p className="text-red-500 text-sm mt-1">{errors.productName}</p>
            )}
          </div>

          {/* type */}
          <div>
            <label className="block mb-1 text-sm">Product Type</label>

            <select
              name="productType"
              value={formData.productType}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
            >
              <option>Foods</option>
              <option>Electronics</option>
              <option>Clothes</option>
              <option>Beauty Products</option>
              <option>Others</option>
            </select>
          </div>

          {/* quantity */}
          <div>
            <label className="block mb-1 text-sm">Quantity Stock</label>

            <input
              type="number"
              name="quantityStock"
              value={formData.quantityStock}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
            />

            {errors.quantityStock && (
              <p className="text-red-500 text-sm mt-1">
                {errors.quantityStock}
              </p>
            )}
          </div>

          {/* mrp */}
          <div>
            <label className="block mb-1 text-sm">MRP</label>

            <input
              type="number"
              name="mrp"
              value={formData.mrp}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
            />

            {errors.mrp && (
              <p className="text-red-500 text-sm mt-1">{errors.mrp}</p>
            )}
          </div>

          {/* sell pricxe */}
          <div>
            <label className="block mb-1 text-sm">Selling Price</label>

            <input
              type="number"
              name="sellingPrice"
              value={formData.sellingPrice}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
            />

            {errors.sellingPrice && (
              <p className="text-red-500 text-sm mt-1">{errors.sellingPrice}</p>
            )}
          </div>

          {/* brand */}
          <div>
            <label className="block mb-1 text-sm">Brand Name</label>

            <input
              type="text"
              name="brandName"
              value={formData.brandName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
            />

            {errors.brandName && (
              <p className="text-red-500 text-sm mt-1">{errors.brandName}</p>
            )}
          </div>

          {/* images */}
          <div>
            <label className="block mb-2 text-sm">Upload Images</label>

            <label className="flex flex-col items-center justify-center h-24 border border-gray-300 rounded cursor-pointer">
              <Upload size={24} />

              <span className="text-sm">Click to upload</span>

              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>

            {images.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {images.map((img, index) => (
                  <div key={index} className="relative">
                    <img
                      src={getImagePreviewUrl(img)}
                      alt=""
                      className="w-16 h-16 rounded border object-cover"
                    />

                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* return */}
          <div>
            <label className="block mb-1 text-sm ">Exchange / Return</label>

            <select
              name="exchangeReturn"
              value={formData.exchangeReturn}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
            >
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>

          {/* submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
            >
              {initialData ? "Update Product" : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
