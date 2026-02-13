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
import { Plus, Filter, SortAsc, Upload, LayoutGrid, List } from "lucide-react";
import { useState } from "react";
import { BookmarkModal } from "../Modal/page";

export const HeaderHorizontalBar = () => {
  const [isOpenBookmark, setBookMarkModal] = useState(false);
  return (
    <div className="flex gap-2 items-center flex-shrink-0">
      {/* View Toggle */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="h-11 w-11"
            title="View Options"
          >
            <LayoutGrid className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>View</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LayoutGrid className="mr-2 h-4 w-4" />
            Grid View
          </DropdownMenuItem>
          <DropdownMenuItem>
            <List className="mr-2 h-4 w-4" />
            List View
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Sort & Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="h-11 w-11"
            title="Sort & Filter"
          >
            <Filter className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>Sort By</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SortAsc className="mr-2 h-4 w-4" />
            Date Added
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SortAsc className="mr-2 h-4 w-4" />
            Name (A-Z)
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="default"
            size="default"
            className="h-11 px-4 gap-2"
            title="Add New"
          >
            <Plus className="h-5 w-5" />
            Add
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>Add New</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setBookMarkModal(true);
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Bookmark
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Upload className="mr-2 h-4 w-4" />
            Import
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* render-the-bookmark-component  */}
      {isOpenBookmark && (
        <>
          <BookmarkModal open={isOpenBookmark} setOpen={setBookMarkModal} />
        </>
      )}
      {/* cards components */}
      

    </div>
  );
};
