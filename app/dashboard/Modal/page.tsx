import { X, Link, Type, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";
import axios from "axios";
import React, { useState } from "react";

type Props = {
  open: boolean;
  setOpen: (val: boolean) => void;
  onBookmarkAdded?: () => void;
};

export const BookmarkModal = ({ open, setOpen, onBookmarkAdded }: Props) => {
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
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert("User not authenticated");
        return;
      }

      const bookmarkInputs = await axios.post("/api/bookmark", {
        title: bookmarkData.title,
        url: bookmarkData.url,
        userId: user.id,
      });
      if (bookmarkInputs?.data) {
        setBookmarkData({ title: "", url: "" });
        setOpen(false);
        onBookmarkAdded?.();
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
      className="fixed inset-0 backdrop-blur-sm z-[100] p-4"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={() => setOpen(false)}
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-md border relative"
        style={{ margin: "auto" }}
        onClick={(e) => e.stopPropagation()} // help to not refersh the page
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Link className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Add Bookmark</h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(false)}
            className="h-8 w-8 rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <form onSubmit={submitBookmark}>
          <div className="p-6 space-y-4">
            {/* Title Input */}
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="flex items-center gap-2 text-sm font-medium"
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
                className="h-10"
                required
              />
            </div>

            {/* URL Input */}
            <div className="space-y-2">
              <label
                htmlFor="url"
                className="flex items-center gap-2 text-sm font-medium"
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
                className="h-10"
                required
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 p-6 border-t bg-gray-50 dark:bg-gray-800/50">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
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


