const BASE =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/v1/api/product";

// Get Products
export const fetchProductsApi = async () => {
  const res = await fetch(`${BASE}/get-products`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return await res.json();
};

// Create Product
export const createProductApi = async (product) => {
  const formData = new FormData();

  formData.append("productName", product.productName);
  formData.append("productType", product.productType);
  formData.append("quantityStock", product.quantityStock);
  formData.append("mrp", product.mrp);
  formData.append("sellingPrice", product.sellingPrice);
  formData.append("brandName", product.brandName);
  formData.append("exchangeReturn", product.exchangeReturn);

  if (product.images) {
    product.images.forEach((img) => {
      formData.append("images", img);
    });
  }

  const res = await fetch(`${BASE}/create-product`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Failed to create product");
  }

  return await res.json();
};

// Update Product
export const updateProductApi = async (id, product) => {
  const formData = new FormData();

  formData.append("productName", product.productName);
  formData.append("productType", product.productType);
  formData.append("quantityStock", product.quantityStock);
  formData.append("mrp", product.mrp);
  formData.append("sellingPrice", product.sellingPrice);
  formData.append("brandName", product.brandName);
  formData.append("exchangeReturn", product.exchangeReturn);

  if (product.images) {
    product.images.forEach((img) => {
      formData.append("images", img);
    });
  }

  const res = await fetch(`${BASE}/update-product/${id}`, {
    method: "PUT",
    credentials: "include",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Failed to update product");
  }

  return await res.json();
};

// Delete Product
export const deleteProductApi = async (id) => {
  const res = await fetch(`${BASE}/delete-product/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to delete product");
  }

  return await res.json();
};