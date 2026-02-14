"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import {
  Home,
  User,
  BookOpen,
  LogIn,
  UserPlus,
  LogOut,
  Loader2,
} from "lucide-react";
import { DropdownMenuBasic } from "@/components/ui/DropDownButton";
import {
  Navbar as NavbarComponent,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
const Navbar = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: Home,
      target:"_blank"
    },
    {
      name: "Video Demo",
      link: "https://youtu.be/8Q1S3jmiIl8?si=tx3ZjW3cZZMK0xYy",
      icon: BookOpen,
      target:"_blank"

    },
    {
      name: "Github",
      link:"https://github.com/sagarchaurasia176/smart-bookmark-web-app",
      icon: User,
      target:"_blank"
    },
   
  ];

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

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
  const moveToDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <div className="relative w-full sticky top-0 left-0 z-50 ">
      <NavbarComponent>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems}/>
          <div className="hidden p-3 md:flex items-center gap-3">
            {loading ? (
              <div className="flex items-center justify-center p-2">
                <Loader2 size={18} className="animate-spin text-neutral-500" />
              </div>
            ) : !isLoggedIn ? (
              <>
                <NavbarButton
                  variant="secondary"
                  onClick={handleGoogleSignIn}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg transition-colors"
                >
                  <LogIn size={16} />
                  <span className="hidden lg:inline">Login</span>
                </NavbarButton>
                <NavbarButton
                  variant="primary"
                  onClick={handleGoogleSignIn}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  <UserPlus size={16} />
                  <span className="hidden lg:inline">Sign Up</span>
                </NavbarButton>
              </>
            ) : (
              <DropdownMenuBasic
                logout={handleSignOut}
                moveToDashboard={moveToDashboard}
              />
            )}
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <div className="flex md:hidden items-center gap-2">
              {!isLoggedIn ? (
                <NavbarButton
                  variant="primary"
                  onClick={handleGoogleSignIn}
                  className="px-3 py-2 text-sm"
                >
                  <LogIn size={16} />
                </NavbarButton>
              ) : (
                <DropdownMenuBasic
                  logout={handleSignOut}
                  moveToDashboard={moveToDashboard}
                />
              )}
              <MobileNavToggle
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </div>
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            <div className="flex flex-col space-y-4 p-4">
              {navItems.map((item, idx) => (
                <a
                  key={`mobile-link-${idx}`}
                  href={item.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="relative text-neutral-600 dark:text-neutral-300 flex items-center space-x-3 py-2 px-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  <item.icon size={20} />
                  <span className="text-base font-medium">{item.name}</span>
                </a>
              ))}

              {!isLoggedIn && (
                <div className="flex flex-col gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                  <NavbarButton
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleGoogleSignIn();
                    }}
                    variant="secondary"
                    className="w-full justify-center py-3 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                  >
                    <LogIn
                      size={18}
                      className="text-neutral-700 dark:text-neutral-300"
                    />
                    Login
                  </NavbarButton>
                  <NavbarButton
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleGoogleSignIn();
                    }}
                    variant="primary"
                    className="w-full justify-center py-3 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <UserPlus size={18} className="text-white" />
                    Sign Up
                  </NavbarButton>
                </div>
              )}
            </div>
          </MobileNavMenu>
        </MobileNav>
      </NavbarComponent>
    </div>
  );
};

export default Navbar;
