export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-8 sm:py-10 md:py-12 mt-auto border-t border-gray-700">
      <div className="container h-full mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
          <div className="text-center sm:text-left">
            <p className="text-gray-300 font-medium tracking-wide text-sm sm:text-base">
              &copy; 2026 <span className="text-blue-400 font-semibold">Smart Bookmark</span>. All rights reserved.
            </p>
          </div>
          <div className="flex items-center space-x-2 text-sm sm:text-base">
            <span className="text-gray-400">Made with</span>
            <span className="text-red-500 text-lg animate-pulse">♥</span>
            <span className="text-gray-400">by</span>
            <span className="text-blue-400 font-semibold hover:text-blue-300 transition-colors duration-200 cursor-pointer">
              sagar
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
