import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ProductForm from "../components/ProductForm";
import ProductCard from "../components/ProductCard";
import DeletePopup from "../components/DeletePopup";
import notFound from "../assets/notFound.png";

const Product = () => {
  const [itemPopup, setItemPopup] = useState(false);

  // Replace with API data later
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleCreate = (product) => {
    setProducts((prev) => [...prev, product]);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setItemPopup(true);
  };

  const handleUpdate = (updated) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    setEditingProduct(null);
  };

  const handleTogglePublish = (product) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === product.id
          ? { ...p, status: (p.status || "").toString().toLowerCase() === "published" ? "unpublished" : "published" }
          : p
      )
    );
  };

  const handleDelete = (product) => {
    // open confirmation modal
    setDeleteTarget(product);
  };

  const [deleteTarget, setDeleteTarget] = useState(null);

  const confirmDelete = (product) => {
    setProducts((prev) => prev.filter((p) => p.id !== product.id));
    setDeleteTarget(null);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 bg-white">
        <Header />

        <div className="mx-auto max-w-7xl px-8 py-6">
          {/* Empty State */}
          {products.length === 0 ? (
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
                  className="rounded-lg bg-blue-900 px-6 py-3 font-semibold text-white transition hover:bg-blue-800"
                >
                  Add your Products
                </button>
              </div>
            </div>
          ) : (
            /* Product Grid */
            <div>
              {/* Top Bar */}
              <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-slate-800">
                  Products
                </h1>

                <button
                  onClick={() => setItemPopup(true)}
                  className="rounded-lg bg-blue-900 px-5 py-2.5 font-medium text-white transition hover:bg-blue-800"
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
