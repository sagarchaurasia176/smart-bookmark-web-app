import DashboardSidebar from "../layout/DashboardSidebar";
import HorizontalBar from "./SearchBar/page";

// app/dashboard/layout.tsx or page.tsx
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      {/* Sidebar - Fixed width */}
      <aside className="w-60 border-r bg-background flex-shrink-0">
        <DashboardSidebar/>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col  overflow-hidden">
        {/* Horizontal Bar - Fixed height */}
        <HorizontalBar />
        
        {/* Content Area - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </main>
    </div>
  );
}