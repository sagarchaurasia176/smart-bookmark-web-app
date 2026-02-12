"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Home, User, BookOpen, LogIn, UserPlus, LogOut, Loader2 } from "lucide-react";
import { DropdownMenuBasic } from "@/components/ui/DropDownButton";

const Navbar = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error checking session:", error);
        setIsLoggedIn(false);
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const handleGoogleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    router.push("/");
  };


  // move to dashboard
  const moveToDashboard = ()=>{
    router.push("/dashboard")
  }


  if (loading) {
    return (
      <nav className="flex items-center justify-between p-4 bg-white shadow-md">
        <div className="flex items-center space-x-8">
          <a
            href="/"
            className="flex items-center space-x-2 text-lg font-semibold text-gray-800 hover:text-blue-600"
          >
            <Home size={20} />
            <span>Home</span>
          </a>
          <a
            href="/about"
            className="flex items-center space-x-2 text-lg text-gray-600 hover:text-blue-600"
          >
            <User size={20} />
            <span>About</span>
          </a>
          <a href="/blog" className="flex items-center space-x-2 text-lg text-gray-600 hover:text-blue-600">
            <BookOpen size={20} />
            <span>Blog</span>
          </a>
        </div>
        <div className="flex items-center">
          <Loader2 className="animate-spin" size={20} />
        </div>
      </nav>
    );
  }

  return (
    <div>
      <nav className="flex items-center justify-between p-4 bg-white shadow-md">
        <div className="flex items-center space-x-8">
          <a
            href="/"
            className="flex items-center space-x-2 text-lg font-semibold text-gray-800 hover:text-blue-600"
          >
            <Home size={20} />
            <span>Home</span>
          </a>
          <a
            href="/about"
            className="flex items-center space-x-2 text-lg text-gray-600 hover:text-blue-600"
          >
            <User size={20} />
            <span>About</span>
          </a>
          <a href="/blog" className="flex items-center space-x-2 text-lg text-gray-600 hover:text-blue-600">
            <BookOpen size={20} />
            <span>Blog</span>
          </a>
        </div>
        <div className="flex items-center space-x-4">
          {!isLoggedIn ? (
            <>
              <button
                onClick={handleGoogleSignIn}
                id="login"
                className="flex items-center space-x-2 px-4 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
              >
                <LogIn size={18} />
                <span>Login</span>
              </button>
              <button
                onClick={handleGoogleSignIn}
                id="sign"
                className="flex items-center space-x-2 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                <UserPlus size={18} />
                <span>Sign Up</span>
              </button>
            </>
          ) : (

              <DropdownMenuBasic logout={handleSignOut}  moveToDashboard={moveToDashboard}/>
           
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
