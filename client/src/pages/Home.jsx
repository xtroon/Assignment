import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import notFound from "../assets/notFound.png";

const Home = () => {
  const [active, setActive] = useState('published')

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 bg-white">
        <div className=" bg-white">
          
          <Header />

          {/* Tabs */}
          <div className="flex gap-8 px-6 border-2 border-gray-200">
            <button
              onClick={() => setActive('published')}
              className={`py-2 text-sm font-medium ${active === 'published' ? 'border-b-2 border-blue-500 py-3 text-black' : 'text-slate-500'}`}>
              Published
            </button>

            <button
              onClick={() => setActive('unpublished')}
              className={`py-2 text-sm font-medium ${active === 'unpublished' ? 'border-b-2 border-blue-500 py-3 text-black' : 'text-slate-500'}`}>
              Unpublished
            </button>
          </div>
        </div>

        <div className="mx-auto max-w-5xl px-8 py-2">
          <div className="border-4rounded-sm bg-white h-[520px] flex items-center justify-center">
            <div className="text-center">
              <img src={notFound} alt="empty" className="mx-auto h-16 w-16 mb-4" />
              <h3 className="text-lg font-semibold text-black mb-2">
                {active === 'published' ? 'No Published Products' : 'No Unpublished Products'}
              </h3>
              <p className="text-sm text-slate-500">
                {active === 'published'
                  ? <div><p>Your Published Products will appear here.</p> <p> Create your first product to publish. </p> </div>
                  : <div><p>Your Unpublished Products will appear here.</p> <p> Create your first product to publish. </p> </div>}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
