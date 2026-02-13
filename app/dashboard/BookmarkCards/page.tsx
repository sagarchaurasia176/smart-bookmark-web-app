"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Bookmark, ExternalLink, Trash2, Calendar } from "lucide-react";

interface BookmarkItem {
  id: string;
  title: string;
  url: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

const BookMarkCards = () => {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookmarks();
  }, [bookmarks]);

  const fetchBookmarks = async () => {
    try {
      const response = await axios.get("/api/bookmark");
      const bookmarksData = response.data.data || [];
      console.log("Bookmarks:", bookmarksData);
      setBookmarks(bookmarksData);
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
      toast.error("Failed to load bookmarks");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this bookmark?")) {
      return;
    }

    try {
      await axios.delete(`/api/bookmark/${id}`);
      setBookmarks(bookmarks.filter((b) => b.id !== id));
      toast.success("Bookmark deleted!");
    } catch (error) {
      console.error("Error deleting bookmark:", error);
      toast.error("Failed to delete bookmark");
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

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Bookmarks</h1>
          <p className="text-gray-600">
            {bookmarks.length} {bookmarks.length === 1 ? "bookmark" : "bookmarks"}
          </p>
        </div>

        {/* Empty State */}
        {bookmarks.length === 0 ? (
          <div className="py-20">
            <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-12 max-w-lg">
              <Bookmark className="w-12 h-12 text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No bookmarks yet
              </h3>
              <p className="text-gray-600">
                Start saving your favorite links.
              </p>
            </div>
          </div>
        ) : (
          /* Bookmarks List */
          <div className="space-y-3 grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 gap-12 ">
            {bookmarks.map((bookmark) => (
              <div
                key={bookmark.id}
                className="bg-white border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  {/* Left side - Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {bookmark.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2 truncate">
                      {getDomain(bookmark.url)}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{formatDate(bookmark.createdAt)}</span>
                    </div>
                  </div>

                  {/* Right side - Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <a
                      href={bookmark.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                      Visit
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => handleDelete(bookmark.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
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