"use client";
import { X, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

type Props = {
  open: boolean;
  setOpen: (val: boolean) => void;
  onBookmarkAdded?: () => void;
};

const BookmarkModal = ({ open, setOpen, onBookmarkAdded }: Props) => {
  const [mounted, setMounted] = useState(false);
  const [bookmarkData, setBookmarkData] = useState({
    title: "",
    url: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  //stored the data into the db
  const submitBookmark = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // No need to get user here - server will handle authentication
      const bookmarkInputs = await axios.post("/api/bookmark", {
        title: bookmarkData.title,
        url: bookmarkData.url,
      });

      if (bookmarkInputs?.data) {
        setBookmarkData({ title: "", url: "" });
        setOpen(false);
        onBookmarkAdded?.();

        // Notify all tabs (including this one)
        localStorage.setItem("bookmarks-updated", Date.now().toString());
        window.dispatchEvent(new Event("bookmarks-changed"));
      }
    } catch (error) {
      console.error("Error saving bookmark:", error);
      alert("Failed to save bookmark");
    } finally {
      setIsSubmitting(false);
    }
  };

  //Onchange handler
  const formIputOnchangeHandler = (e: any) => {
    const { name, value } = e.target;
    //get all the data object
    setBookmarkData((currentValue) => {
      return {
        ...currentValue,
        [name]: value,
      };
    });
  };

  if (!open || !mounted) return null;

  const modalContent = (
    <div
      className="fixed inset-0 bg-black/10 backdrop-blur-lg flex items-end sm:items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200"
      onClick={() => setOpen(false)}
      style={{ zIndex: 99999 }}
    >
      <div
        className="bg-white rounded-t-2xl sm:rounded-xl shadow-2xl w-full max-w-md border border-slate-200 animate-in zoom-in slide-in-from-bottom-4 duration-300 mb-0 sm:mb-0 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        style={{ zIndex: 100000 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-200 sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Bookmark className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
              Add Bookmark
            </h2>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors text-slate-500 hover:text-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={submitBookmark}>
          <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
            {/* Title Input */}
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="text-xs sm:text-sm font-medium text-slate-700"
              >
                Title
              </label>
              <Input
                id="title"
                name="title"
                value={bookmarkData.title}
                onChange={formIputOnchangeHandler}
                placeholder="Enter bookmark title"
                className="h-10 sm:h-11 text-sm sm:text-base"
                required
              />
            </div>

            {/* URL Input */}
            <div className="space-y-2">
              <label
                htmlFor="url"
                className="text-xs sm:text-sm font-medium text-slate-700"
              >
                URL
              </label>
              <Input
                id="url"
                type="url"
                name="url"
                value={bookmarkData.url}
                onChange={formIputOnchangeHandler}
                placeholder="https://example.com"
                className="h-10 sm:h-11 text-sm sm:text-base"
                required
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-2 sm:gap-3 p-4 sm:p-6 border-t border-slate-200 bg-slate-50 rounded-b-xl sticky bottom-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
              className="px-4 sm:px-6 text-sm sm:text-base h-9 sm:h-10"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="px-4 sm:px-6 bg-blue-600 hover:bg-blue-700 text-sm sm:text-base h-9 sm:h-10"
            >
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default BookmarkModal;
