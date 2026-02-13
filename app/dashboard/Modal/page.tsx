"use client"
import { X, Link, Type, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState } from "react";

type Props = {
  open: boolean;
  setOpen: (val: boolean) => void;
  onBookmarkAdded?: () => void;
};

const BookmarkModal = ({ open, setOpen, onBookmarkAdded }: Props) => {
  if (!open) return null;

  const [bookmarkData, setBookmarkData] = useState({
    title: "",
    url: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  return (
    <div
      className="fixed inset-0 bg-black/60 min-h-screen backdrop-blur-md z-50 flex items-center justify-center p-4"
      onClick={() => setOpen(false)}
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md border border-gray-200 dark:border-gray-700 animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary/10 rounded-xl">
              <Link className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Add Bookmark</h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(false)}
            className="h-9 w-9 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <form onSubmit={submitBookmark}>
          <div className="p-6 space-y-5">
            {/* Title Input */}
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                <Type className="h-4 w-4 text-muted-foreground" />
                Title
              </label>
              <Input
                id="title"
                name="title"
                value={bookmarkData.title}
                onChange={formIputOnchangeHandler}
                placeholder="Enter bookmark title..."
                className="h-11"
                required
              />
            </div>

            {/* URL Input */}
            <div className="space-y-2">
              <label
                htmlFor="url"
                className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                <Link className="h-4 w-4 text-muted-foreground" />
                URL
              </label>
              <Input
                id="url"
                type="url"
                name="url"
                value={bookmarkData.url}
                onChange={formIputOnchangeHandler}
                placeholder="https://example.com"
                className="h-11"
                required
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 rounded-b-2xl">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" className="gap-2" disabled={isSubmitting}>
              <Save className="h-4 w-4" />
              {isSubmitting ? "Saving..." : "Save Bookmark"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookmarkModal;