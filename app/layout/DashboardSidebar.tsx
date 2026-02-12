"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import axios from "axios";

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
    <div className="w-64 h-screen bg-gray-900 text-white p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold">Hello, {user?.name || ""}</h2>
      </div>

      <nav className="space-y-2">
        <a
          href="#"
          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <span>📊</span>
          <span>Overview</span>
        </a>

        <a
          href="#"
          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <span>📈</span>
          <span>Analytics</span>
        </a>

        <a
          href="#"
          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <span>👥</span>
          <span>Users</span>
        </a>

        <a
          href="#"
          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <span>⚙️</span>
          <span>Settings</span>
        </a>
      </nav>
    </div>
  );
};

export default DashboardSidebar;
