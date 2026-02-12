import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  Search,
  Filter,
  SortAsc,
  FolderPlus,
  Tags,
  Upload,
  LayoutGrid,
  List,
  Settings,
} from "lucide-react";

const HorizontalBar = () => {
  return (
    <div className="flex flex-col sm:flex-row p-4 w-full gap-4 items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Search Bar - Centered and Prominent */}
      <div className="relative flex-1 max-w-4xl w-full">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search bookmarks, tags, or folders..."
          className="pl-12 pr-4 h-12 text-base w-full rounded-full border-2 focus-visible:ring-2 focus-visible:ring-primary"
        />
      </div>

      {/* Action Buttons */}
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
            <DropdownMenuItem>
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
      </div>
      {/* add-button */}
    </div>
  );
};

export default HorizontalBar;
