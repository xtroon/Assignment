const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/v1/api";
const PRODUCT_BASE = `${API_URL}/product`;
const AUTH_BASE = `${API_URL}/login`;

// get auth tkn
const getAuthToken = () => localStorage.getItem("token");

// get prod list
export const fetchProductsApi = async (status = "") => {
  const token = getAuthToken();
  const query = status ? `?status=${status}` : "";
  
  const res = await fetch(`${PRODUCT_BASE}/get-products${query}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return await res.json();
};

// add new prod
export const createProductApi = async (product) => {
  const token = getAuthToken();
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

  if (product.status) {
    formData.append("status", product.status);
  }

  const res = await fetch(`${PRODUCT_BASE}/create-product`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`
    },
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to create product");
  }

  return await res.json();
};

// edit prod info
export const updateProductApi = async (id, product) => {
  const token = getAuthToken();
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

  if (product.status) {
    formData.append("status", product.status);
  }

  const res = await fetch(`${PRODUCT_BASE}/update-product/${id}`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`
    },
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to update product");
  }

  return await res.json();
};

// del prod item
export const deleteProductApi = async (id) => {
  const token = getAuthToken();
  const res = await fetch(`${PRODUCT_BASE}/delete-product/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  if (!res.ok) {
    throw new Error("Failed to delete product");
  }

  return await res.json();
};

// req otp backend
export const createOtpApi = async (emailOrPhone) => {
  const res = await fetch(`${AUTH_BASE}/create-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ emailOrPhone }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to send OTP");
  }

  return await res.json();
};

// chck otp sign
export const verifyOtpApi = async (emailOrPhone, otp) => {
  const res = await fetch(`${AUTH_BASE}/verify-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ emailOrPhone, otp }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Please enter a valid OTP");
  }

  return await res.json();
};