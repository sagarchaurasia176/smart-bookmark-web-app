"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import axios from "axios";
import HorizontalBar from "../dashboard/SearchBar/page";

interface User {
  name: string;
  email: string;
}

const DashboardSidebar = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUserName = async () => {
      try {
        const response = await axios.get("/api/user-details");
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    getUserName();
  }, []);

  return (
    <div className="flex bg-slate-900 h-screen">
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 text-center border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Hello, {user?.name || "User"}
          </h2>
          <p className="text-sm text-gray-500 mt-1">{user?.email}</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-1">
            <a
              href="#"
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-900 rounded-md hover:bg-gray-100 transition-colors duration-150"
            >
              <svg
                className="w-5 h-5 mr-3 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
              All Bookmarks
            </a>

            <a
              href="#"
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-gray-900 transition-colors duration-150"
            >
              <svg
                className="w-5 h-5 mr-3 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Trash
            </a>
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <button className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-gray-900 transition-colors duration-150">
            <svg
              className="w-5 h-5 mr-3 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
