import React from 'react';

export default function SecondSection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-pink-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 px-4">
            Designed for ✏️ creatives, built for {'{coders}'}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-4 px-4">
            Smart Bookmark is the best place to keep all your favorite books, songs,
            <br className="hidden sm:block" />
            articles or whatever else you come across while browsing.
          </p>
   
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
          {/* Left Side - Features */}
          <div className="space-y-6 sm:space-y-8 px-4">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Organize with ease</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                Smart Bookmark is not just a pretty interface, it can help you
                untangle your bookmarks mess.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="text-xl sm:text-2xl">📁</div>
                <div>
                  <h4 className="font-semibold text-base sm:text-lg mb-1">Collections</h4>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    Group related bookmarks within the same context.
                    Thousands of predefined icons.{' '}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - App Preview */}
          <div className="relative px-4">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl p-3 sm:p-4 md:p-6 border border-gray-200">
              {/* Mock App Interface */}
              <div className="space-y-3 sm:space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 sm:pb-4 border-b">
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-semibold">Smart Bookmark</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 sm:p-2 hover:bg-gray-100 rounded text-sm sm:text-base">+</button>
                    <div className="flex items-center gap-2 bg-gray-100 px-2 sm:px-3 py-1 rounded">
                      <span className="text-xs sm:text-sm">🔍 Books</span>
                    </div>
                  </div>
                </div>

                {/* Sidebar and Content */}
                <div className="grid grid-cols-5 gap-2 sm:gap-4">
                  {/* Sidebar */}
                  <div className="col-span-2 space-y-1 sm:space-y-2">
                    <div className="text-[10px] sm:text-xs text-gray-500 px-1 sm:px-2">📋 All bookmarks</div>
                    <div className="bg-blue-100 text-blue-900 px-2 sm:px-3 py-1.5 sm:py-2 rounded font-medium text-[10px] sm:text-sm">
                      📚 Books
                    </div>
                    <div className="px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-sm">🌱 Development</div>
                    <div className="px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-sm">💎 Design</div>
                    <div className="px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-sm">🎨 Lifestyle</div>
                    <div className="px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-sm text-gray-400 hidden sm:block">Psychology</div>
                    <div className="px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-sm text-gray-400 hidden sm:block">Retro Games</div>
                    <div className="px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-sm text-gray-400 hidden sm:block">Pokémon</div>
                  </div>

                  {/* Content Area */}
                  <div className="col-span-3 space-y-2 sm:space-y-3">
                    {[
                      { title: 'LOGO Modernism', author: 'Jens Müller', site: 'goodreads.com' },
                      { title: 'Sapiens: A Brief History', author: 'Hardcover', site: 'amazon.com' },
                      { title: 'Design+Code', author: 'React and Swift', site: 'designcode.io' },
                      { title: 'Refactoring UI', author: 'Design awesome UIs', site: 'refactoringui.com' }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-2 sm:gap-3 p-1.5 sm:p-2 hover:bg-gray-50 rounded">
                        <div className="w-6 h-6 sm:w-10 sm:h-10 bg-gradient-to-br from-orange-400 to-pink-400 rounded flex-shrink-0"></div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-[10px] sm:text-sm truncate">{item.title}</div>
                          <div className="text-[9px] sm:text-xs text-gray-500 truncate">{item.author}</div>
                          <div className="text-[8px] sm:text-xs text-gray-400 hidden sm:block">{item.site}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
