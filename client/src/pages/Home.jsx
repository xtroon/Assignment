import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  const handleDelete = async (product) => {
    if (window.confirm(`Are you sure you want to delete "${product.productName}"?`)) {
      try {
        await deleteProductApi(product.id);
        loadProducts();
      } catch (err) {
        console.error("Error deleting product:", err);
      }
    }
  };

  const handleEdit = () => {
    // Navigate to products management page to edit
    navigate("/products");
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 bg-white">
        <div className="bg-white">
          <Header />

          {/* Tabs */}
          <div className="flex gap-8 px-6 border-b border-gray-200">
            <button
              onClick={() => setActive("published")}
              className={`py-3 text-sm font-medium cursor-pointer transition-colors ${
                active === "published"
                  ? "border-b-2 border-blue-500 text-black font-semibold"
                  : "text-slate-500 hover:text-black"
              }`}
            >
              Published
            </button>

            <button
              onClick={() => setActive("unpublished")}
              className={`py-3 text-sm font-medium cursor-pointer transition-colors ${
                active === "unpublished"
                  ? "border-b-2 border-blue-500 text-black font-semibold"
                  : "text-slate-500 hover:text-black"
              }`}
            >
              Unpublished
            </button>
          </div>
        </div>

        <div className="mx-auto max-w-5xl px-8 py-6">
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
            <div className="border border-gray-200 rounded-lg bg-white h-[520px] flex items-center justify-center">
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
            /* Products Grid */
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
      </main>
    </div>
  );
};

export default Home;
