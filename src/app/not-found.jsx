export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 px-4">
      <h1 className="text-7xl font-bold text-red-500">404</h1>

      <h2 className="text-2xl font-semibold mt-4 text-gray-800">Page Not Found</h2>

      <p className="text-gray-500 mt-2 text-center">
        Sorry! The page you are looking for does not exist.
      </p>

      <a
        href="/"
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Go Home
      </a>
    </div>
  );
}
