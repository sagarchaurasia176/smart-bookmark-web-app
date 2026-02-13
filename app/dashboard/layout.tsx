"use client";

import DashboardSidebar from "../layout/DashboardSidebar";
import HorizontalBar from "./SearchBar/page";
import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const RefreshContext = createContext<(() => void) | null>(null);

export const useRefreshBookmarks = () => useContext(RefreshContext);

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const triggerRefresh = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push("/");
      } else {
        setUser(session.user);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.push("/");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <RefreshContext.Provider value={triggerRefresh}>
      <div className="flex h-screen">
        {/* Sidebar - Fixed width */}
        <aside className="w-60 border-r bg-background flex-shrink-0">
          <DashboardSidebar />
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col  overflow-hidden">
          {/* Horizontal Bar - Fixed height */}
          <HorizontalBar />

          {/* Content Area - Scrollable */}
          <div className="flex-1 overflow-y-auto p-6">
            <div key={refreshTrigger}>{children}</div>
          </div>
        </main>
      </div>
    </RefreshContext.Provider>
  );
}
