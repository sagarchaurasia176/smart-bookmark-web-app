"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Bookmark,
  ExternalLink,
  Trash2,
  Calendar,
  Search,
  Grid3x3,
  List,
  SortAsc,
} from "lucide-react";

interface BookmarkItem {
  id: string;
  title: string;
  url: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

type ViewMode = "grid" | "list";
type SortBy = "newest" | "oldest" | "title";

const BookMarkCards = () => {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [filteredBookmarks, setFilteredBookmarks] = useState<BookmarkItem[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortBy, setSortBy] = useState<SortBy>("newest");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchBookmarks();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "bookmarks-updated") {
        fetchBookmarks();
      }
    };

    const handleCustomEvent = () => {
      fetchBookmarks();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("bookmarks-changed", handleCustomEvent);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("bookmarks-changed", handleCustomEvent);
    };
  }, []);

  useEffect(() => {
    let result = [...bookmarks];

    // Filter by search query
    if (searchQuery) {
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          b.url.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Sort bookmarks
    result.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "oldest":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    setFilteredBookmarks(result);
  }, [bookmarks, searchQuery, sortBy]);

  const fetchBookmarks = async () => {
    try {
      const response = await axios.get("/api/bookmark");
      const bookmarksData = response.data.data || [];
      setBookmarks(bookmarksData);
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
      toast.error("Failed to load bookmarks");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);

    try {
      await axios.delete(`/api/bookmark/${id}`);
      setBookmarks(bookmarks.filter((b) => b.id !== id));
      toast.success("Bookmark deleted successfully");

      localStorage.setItem("bookmarks-updated", Date.now().toString());
      window.dispatchEvent(new Event("bookmarks-changed"));
    } catch (error) {
      console.error("Error deleting bookmark:", error);
      toast.error("Failed to delete bookmark");
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getDomain = (url: string) => {
    try {
      return new URL(url).hostname.replace("www.", "");
    } catch {
      return url;
    }
  };

  const getFavicon = (url: string) => {
    try {
      const domain = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
    } catch {
      return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">
            Loading your bookmarks...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto sm:px-6 ">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <Bookmark className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                My Bookmarks
              </h1>
              <p className="text-slate-600 text-sm mt-0.5">
                {filteredBookmarks.length} of {bookmarks.length}{" "}
                {bookmarks.length === 1 ? "bookmark" : "bookmarks"}
                {searchQuery && " (filtered)"}
              </p>
            </div>
          </div>
        </div>

        {/* Controls */}
        {bookmarks.length > 0 && (
          <div className="mb-6 bg-white z-10 rounded-xl shadow-sm border border-slate-200 p-4">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search bookmarks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-[20rem] pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* View and Sort Controls */}
              <div className="flex items-center gap-2">
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortBy)}
                  className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer transition-all"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="title">A to Z</option>
                </select>

                {/* View Mode Toggle */}
                <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded transition-all ${
                      viewMode === "grid"
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-slate-400 hover:text-slate-600"
                    }`}
                    title="Grid view"
                  >
                    <Grid3x3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded transition-all ${
                      viewMode === "list"
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-slate-400 hover:text-slate-600"
                    }`}
                    title="List view"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {bookmarks.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <div className="bg-white border-2 border-dashed border-slate-300 rounded-2xl p-12 max-w-md text-center">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Bookmark className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                No bookmarks yet
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Start saving your favorite links and they'll appear here.
              </p>
            </div>
          </div>
        ) : filteredBookmarks.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <div className="bg-white rounded-2xl p-12 max-w-md text-center shadow-sm border border-slate-200">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                No results found
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Try adjusting your search query
              </p>
            </div>
          </div>
        ) : (
          /* Bookmarks Grid/List */
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                : "space-y-3"
            }
          >
            {filteredBookmarks.map((bookmark) => (
              <div
                key={bookmark.id}
                className={`bg-white border border-slate-200 rounded-xl hover:shadow-lg hover:border-slate-300 transition-all group ${
                  viewMode === "list" ? "p-5" : "p-6"
                }`}
              >
                <div
                  className={`flex ${viewMode === "list" ? "items-center" : "flex-col"} gap-4`}
                >
                  {/* Favicon and Content */}
                  <div
                    className={`flex items-start gap-3 ${viewMode === "list" ? "flex-1 min-w-0" : "w-full"}`}
                  >
                    {/* Favicon */}
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0 border border-slate-200">
                      {getFavicon(bookmark.url) ? (
                        <img
                          src={getFavicon(bookmark.url)!}
                          alt=""
                          className="w-5 h-5"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                            e.currentTarget.parentElement!.innerHTML = `<svg class="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>`;
                          }}
                        />
                      ) : (
                        <ExternalLink className="w-5 h-5 text-slate-400" />
                      )}
                    </div>

                    {/* Text Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-semibold text-slate-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {bookmark.title}
                      </h3>
                      <p className="text-sm text-slate-500 mb-2 truncate">
                        {getDomain(bookmark.url)}
                      </p>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{formatDate(bookmark.createdAt)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div
                    className={`flex items-center gap-2 ${viewMode === "list" ? "flex-shrink-0" : "w-full"}`}
                  >
                    <a
                      href={bookmark.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-all hover:shadow-md active:scale-95 ${
                        viewMode === "list" ? "" : "flex-1"
                      }`}
                    >
                      <span>Visit</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => handleDelete(bookmark.id)}
                      disabled={deletingId === bookmark.id}
                      className="p-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                      title="Delete bookmark"
                    >
                      {deletingId === bookmark.id ? (
                        <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookMarkCards;
