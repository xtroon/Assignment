import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import notFound from "../assets/notFound.png";

const Product = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 bg-white">
        <div className=" bg-white">
          <Header />
        </div>

        <div className="mx-auto max-w-5xl px-8 py-2">
          <div className="border-4rounded-sm bg-white h-[520px] flex items-center justify-center">
            <div className="text-center">
              <img
                src={notFound}
                alt="empty"
                className="mx-auto h-16 w-16 mb-4"
              />
              <h3 className="text-lg font-semibold text-black mb-2">
                Feels a little empty over here...
              </h3>
              <div className="text-sm text-slate-500 mb-8">
                <p>You can create products without connecting store </p>
                <p>you can add products to store anytime </p>

              </div>
                <button className="w-full rounded-lg cursor-pointer bg-blue-900 py-3 font-semibold text-white hover:bg-blue-800 transition">
                  Add your Products
                </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Product;
