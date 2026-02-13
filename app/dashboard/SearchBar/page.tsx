import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import HeaderHorizontalBar from "../LeftHorizontalBar/page";
// import { HeaderHorizontalBar } from "../LeftHorizontalBar/page";


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

        <HeaderHorizontalBar/>
      {/* add-button */}
    </div>
  );
};

export default HorizontalBar;
