import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import HeaderHorizontalBar from "../LeftHorizontalBar/page";
// import { HeaderHorizontalBar } from "../LeftHorizontalBar/page";


const HorizontalBar = () => {
  return (
    <div className="flex  sm:flex-row p-4 w-full gap-4 items-center justify-end border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <HeaderHorizontalBar/>
      {/* add-button */}
    </div>
  );
};

export default HorizontalBar;
