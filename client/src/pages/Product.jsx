import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ProductForm from "../components/ProductForm";
import ProductCard from "../components/ProductCard";
import DeletePopup from "../components/DeletePopup";
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

  const loadProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchProductsApi();
      // Map database schema models to frontend expectations
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
      loadProducts();
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
      loadProducts();
      setEditingProduct(null);
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
    } catch (err) {
      console.error("Error deleting product:", err);
      alert(err.message || "Failed to delete product");
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 bg-white">
        <Header />

        <div className="mx-auto max-w-7xl px-8 py-6">
          {/* Loading & Error Indicators */}
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

          {/* Empty State */}
          {!loading && products.length === 0 ? (
            <div className="flex h-[520px] items-center justify-center rounded-lg bg-white border border-gray-200">
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
            /* Product Grid */
            !loading && (
              <div>
                {/* Top Bar */}
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

        {/* Modal */}
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
      </main>
    </div>
  );
};

export default Product;
