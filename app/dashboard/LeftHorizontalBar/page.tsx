"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus} from "lucide-react";
import { useState } from "react";
import { useRefreshBookmarks } from "../layout";
import BookmarkModal from "../Modal/page";

const HeaderHorizontalBar = () => {
  const [isOpenBookmark, setBookMarkModal] = useState(false);
  const refreshBookmarks = useRefreshBookmarks();
  return (
    <div className="flex gap-2 items-center flex-shrink-0">
      {/* View Toggle */}
      <DropdownMenu></DropdownMenu>
      <DropdownMenu></DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="default"
            size="default"
            className="h-9 sm:h-11 px-3 sm:px-4 gap-1.5 sm:gap-2 text-sm sm:text-base"
            title="Add New"
          >
            <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="hidden sm:inline">Add</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40 sm:w-48">
          <DropdownMenuLabel className="text-sm">Add New</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setBookMarkModal(true);
            }}
            className="text-sm"
          >
            <Plus className="mr-2 h-4 w-4" />
            Bookmark
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {/* <DropdownMenuItem>
            <Upload className="mr-2 h-4 w-4" />
            Import
          </DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* render-the-bookmark-component  */}
      {isOpenBookmark && (
        <>
          <BookmarkModal
            open={isOpenBookmark}
            setOpen={setBookMarkModal}
            onBookmarkAdded={() => {
              refreshBookmarks?.();
            }}
          />
        </>
      )}
      {/* cards components */}
    </div>
  );
};

export default HeaderHorizontalBar;
