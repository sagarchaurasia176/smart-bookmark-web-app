import React from 'react';

export default function SecondSection() {
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-pink-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Designed for ✏️ creatives, built for {'{coders}'}
          </h2>
          <p className="text-xl text-gray-600 mb-4">
            Smart Bookmark is the best place to keep all your favorite books, songs,
            <br />
            articles or whatever else you come across while browsing.
          </p>
   
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Features */}
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold mb-4">Organize with ease</h3>
              <p className="text-gray-600 mb-6">
                Smart Bookmark is not just a pretty interface, it can help you
                untangle your bookmarks mess.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="text-2xl">📁</div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">Collections</h4>
                  <p className="text-gray-600 text-sm">
                    Group related bookmarks within the same context.
                    Thousands of predefined icons.{' '}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - App Preview */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-200">
              {/* Mock App Interface */}
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">Smart Bookmark</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded">+</button>
                    <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded">
                      <span className="text-sm">🔍 Books</span>
                    </div>
                  </div>
                </div>

                {/* Sidebar and Content */}
                <div className="grid grid-cols-5 gap-4">
                  {/* Sidebar */}
                  <div className="col-span-2 space-y-2">
                    <div className="text-xs text-gray-500 px-2">📋 All bookmarks</div>
                    <div className="bg-blue-100 text-blue-900 px-3 py-2 rounded font-medium">
                      📚 Books
                    </div>
                    <div className="px-3 py-2 text-sm">🌱 Development</div>
                    <div className="px-3 py-2 text-sm">💎 Design</div>
                    <div className="px-3 py-2 text-sm">🎨 Lifestyle</div>
                    <div className="px-3 py-2 text-sm text-gray-400">Psychology</div>
                    <div className="px-3 py-2 text-sm text-gray-400">Retro Games</div>
                    <div className="px-3 py-2 text-sm text-gray-400">Pokémon</div>
                  </div>

                  {/* Content Area */}
                  <div className="col-span-3 space-y-3">
                    {[
                      { title: 'LOGO Modernism', author: 'Jens Müller', site: 'goodreads.com' },
                      { title: 'Sapiens: A Brief History', author: 'Hardcover', site: 'amazon.com' },
                      { title: 'Design+Code', author: 'React and Swift', site: 'designcode.io' },
                      { title: 'Refactoring UI', author: 'Design awesome UIs', site: 'refactoringui.com' }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-3 p-2 hover:bg-gray-50 rounded">
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-400 rounded flex-shrink-0"></div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm truncate">{item.title}</div>
                          <div className="text-xs text-gray-500 truncate">{item.author}</div>
                          <div className="text-xs text-gray-400">{item.site}</div>
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
