import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ProductForm from "../components/ProductForm";
import ProductCard from "../components/ProductCard";
import DeletePopup from "../components/DeletePopup";
import Toast from "../components/Toast";
import notFound from "../assets/notFound.png";
import {
  fetchProductsApi,
  createProductApi,
  updateProductApi,
  deleteProductApi,
} from "../services/productApi";

const Product = () => {
  const [itemPopup, setItemPopup] = useState(false);
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const savedToast = sessionStorage.getItem("toastMessage");
    if (savedToast) {
      setToast(savedToast);
      sessionStorage.removeItem("toastMessage");
    }
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchProductsApi();
      // map db schema
      const mapped = data.map((p) => ({
        ...p,
        id: p._id,
        images: p.productImages || [],
        exchangeReturn: p.exchangeEligible,
      }));
      setProducts(mapped);
    } catch (err) {
      setError("Failed to load products. Please check server or log in again.");
      console.error("Error loading products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleCreate = async (product) => {
    try {
      await createProductApi(product);
      sessionStorage.setItem("toastMessage", "Product added Successfully");
      window.location.reload();
    } catch (err) {
      console.error("Error creating product:", err);
      alert(err.message || "Failed to create product");
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setItemPopup(true);
  };

  const handleUpdate = async (updated) => {
    try {
      await updateProductApi(updated.id, updated);
      sessionStorage.setItem("toastMessage", "Product updated Successfully");
      window.location.reload();
    } catch (err) {
      console.error("Error updating product:", err);
      alert(err.message || "Failed to update product");
    }
  };

  const handleTogglePublish = async (product) => {
    const nextStatus = (product.status || "").toLowerCase() === "published" ? "unpublished" : "published";
    try {
      await updateProductApi(product.id, {
        ...product,
        status: nextStatus,
      });
      loadProducts();
    } catch (err) {
      console.error("Error toggling publish status:", err);
    }
  };

  const handleDelete = (product) => {
    setDeleteTarget(product);
  };

  const confirmDelete = async (product) => {
    try {
      await deleteProductApi(product.id);
      loadProducts();
      setDeleteTarget(null);
      setToast("Product Deleted Successfully");
    } catch (err) {
      console.error("Error deleting product:", err);
      alert(err.message || "Failed to delete product");
    }
  };

  return (
    <div className="flex min-h-screen relative overflow-x-hidden">
      {/* siebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[1px] md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="flex-1 min-w-0 bg-white">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <div className="mx-auto p-8">
          {loading && (
            <div className="text-center py-10 text-slate-500 font-medium">
              Loading products...
            </div>
          )}

          {error && (
            <div className="mb-4 text-center py-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {/* empty */}
          {!loading && products.length === 0 ? (
            <div className="flex h-[520px] items-center justify-center rounded-lg bg-white">
              <div className="text-center">
                <img
                  src={notFound}
                  alt="empty"
                  className="mx-auto mb-4 h-16 w-16"
                />

                <h3 className="mb-2 text-lg font-semibold text-black">
                  Feels a little empty over here...
                </h3>

                <div className="mb-8 text-sm text-slate-500">
                  <p>You can create products without connecting store</p>
                  <p>You can add products to store anytime</p>
                </div>

                <button
                  onClick={() => setItemPopup(true)}
                  className="rounded-lg bg-blue-900 px-6 py-3 font-semibold text-white transition hover:bg-blue-800 cursor-pointer"
                >
                  Add your Products
                </button>
              </div>
            </div>
          ) : (
            /* products */
            !loading && (
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <h1 className="text-2xl font-semibold text-slate-800">
                    Products
                  </h1>

                  <button
                    onClick={() => setItemPopup(true)}
                    className="rounded-lg bg-blue-900 px-5 py-2.5 font-medium text-white transition hover:bg-blue-800 cursor-pointer"
                  >
                    Add Product
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onEdit={handleEdit}
                      onTogglePublish={handleTogglePublish}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              </div>
            )
          )}
        </div>

        {/* form add product */}
        {itemPopup && (
          <ProductForm
            onClose={() => {
              setItemPopup(false);
              setEditingProduct(null);
            }}
            initialData={editingProduct}
            onCreate={handleCreate}
            onUpdate={handleUpdate}
          />
        )}

        <DeletePopup
          open={!!deleteTarget}
          product={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={confirmDelete}
        />

        <Toast message={toast} onClose={() => setToast("")} />
      </main>
    </div>
  );
};

export default Product;
