export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-12 mt-auto border-t border-gray-700">
      <div className="container h-full mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <p className="text-gray-300 font-medium tracking-wide">
              &copy; 2026 <span className="text-blue-400 font-semibold">Smart Bookmark</span>. All rights reserved.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-400 text-sm">Made with</span>
            <span className="text-red-500 text-lg animate-pulse">♥</span>
            <span className="text-gray-400 text-sm">by</span>
            <span className="text-blue-400 font-semibold hover:text-blue-300 transition-colors duration-200 cursor-pointer">
              sagar
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
