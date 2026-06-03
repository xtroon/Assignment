import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import ProductForm from "../components/ProductForm";
import DeletePopup from "../components/DeletePopup";
import Toast from "../components/Toast";
import notFound from "../assets/notFound.png";
import {
  fetchProductsApi,
  updateProductApi,
  deleteProductApi,
} from "../services/productApi";

const Home = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("published");
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [itemPopup, setItemPopup] = useState(false);
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
      const data = await fetchProductsApi(active);
      const mapped = data.map((p) => ({
        ...p,
        id: p._id,
        images: p.productImages || [],
        exchangeReturn: p.exchangeEligible,
      }));
      setProducts(mapped);
    } catch (err) {
      setError("Failed to fetch products. Please ensure you are logged in.");
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [active]);

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

  return (
    <div className="flex min-h-screen relative overflow-x-hidden">
      {/* mobile view */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[1px] md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="flex-1 min-w-0 bg-white">
        <div className="bg-white">
          <Header onMenuClick={() => setSidebarOpen(true)} />

          {/* sections */}
          <div className="flex gap-8 px-6 border-b border-gray-200">
            <button
              onClick={() => setActive("published")}
              className={`py-3 text-sm font-medium cursor-pointer transition-colors ${active === "published"
                  ? "border-b-2 border-blue-500 text-black font-semibold"
                  : "text-slate-500 hover:text-black"
                }`}
            >
              Published
            </button>

            <button
              onClick={() => setActive("unpublished")}
              className={`py-3 text-sm font-medium cursor-pointer transition-colors ${active === "unpublished"
                  ? "border-b-2 border-blue-500 text-black font-semibold"
                  : "text-slate-500 hover:text-black"
                }`}
            >
              Unpublished
            </button>
          </div>
        </div>

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

          {!loading && products.length === 0 ? (
            <div className="rounded-lg bg-white h-[520px] flex items-center justify-center">
              <div className="text-center">
                <img src={notFound} alt="empty" className="mx-auto h-16 w-16 mb-4" />
                <h3 className="text-lg font-semibold text-black mb-2">
                  {active === "published"
                    ? "No Published Products"
                    : "No Unpublished Products"}
                </h3>
                <div className="text-sm text-slate-500">
                  {active === "published" ? (
                    <div>
                      <p>Your Published Products will appear here.</p>
                      <p>Create your first product to publish.</p>
                    </div>
                  ) : (
                    <div>
                      <p>Your Unpublished Products will appear here.</p>
                      <p>Create your first product to publish.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* products */
            !loading && (
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
            )
          )}
        </div>

        {/* pop edit */}
        {itemPopup && (
          <ProductForm
            onClose={() => {
              setItemPopup(false);
              setEditingProduct(null);
            }}
            initialData={editingProduct}
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

export default Home;
