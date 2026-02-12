import React from 'react'
import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'


const DashboardSidebar = () => {


  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold">
        </h2>
      </div>
      
      <nav className="space-y-2">
        <a href="#" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors">
          <span>📊</span>
          <span>Overview</span>
        </a>
        
        <a href="#" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors">
          <span>📈</span>
          <span>Analytics</span>
        </a>
        
        <a href="#" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors">
          <span>👥</span>
          <span>Users</span>
        </a>
        
        <a href="#" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors">
          <span>⚙️</span>
          <span>Settings</span>
        </a>
      </nav>
    </div>
  )
}

export default DashboardSidebar