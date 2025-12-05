"use client";

import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-4">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => router.back()}
          className="text-gray-300 hover:text-white transition"
        >
          ← Back
        </button>

        <h1 className="text-3xl font-extrabold tracking-wide">MYAVA</h1>

        <span className="text-gray-700"> {/* spacer */} </span>
      </div>

      {/* CENTER CONTAINER */}
      <div className="w-full max-w-5xl mx-auto bg-gray-900/40 border border-gray-700 rounded-xl p-6 shadow-xl backdrop-blur">
        
        <h2 className="text-xl font-semibold text-gray-200 mb-4">
          Developed with NIT Innovation
        </h2>

        <p className="text-gray-400 mb-6">
          Embedded Excel interface powered by OneDrive
        </p>

        {/* YOUR IFRAME */}
        <div className="w-full rounded-lg overflow-hidden border border-gray-700 shadow-lg">
          <iframe
            width="100%"
            height="600px"
            frameBorder="0"
            scrolling="no"
            src="https://1drv.ms/x/c/df9143904c2fef47/IQSKTwr0ubGAQoZ4bvuuD7pVAZRPgUO9_hKLTYNYl8MY8dE?em=2&wdAllowInteractivity=False&AllowTyping=True&wdHideGridlines=True&wdHideHeaders=True&wdInConfigurator=True"
          ></iframe>
        </div>

        <p className="mt-6 text-right text-gray-500 italic">
          Created by <span className="font-semibold text-gray-300">Newton Yankho Siyani</span>
        </p>
      </div>
    </div>
  );
}
