export default function Page() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
      <div className="text-center">
        <div className="animate-pulse">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
            🚧 Page Under Development 🚧
          </h1>
        </div>

        <p className="mt-4 text-gray-300 text-lg md:text-xl">
          We’re working hard to bring something amazing here.
        </p>

        <div className="mt-8">
          <div className="w-24 h-24 border-4 border-gray-600 border-t-white rounded-full animate-spin mx-auto"></div>
        </div>

        <p className="mt-6 text-gray-500 italic">
          Please check back soon…
        </p>
      </div>
    </div>
  );
}
