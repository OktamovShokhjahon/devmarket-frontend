"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/context/auth-context";
import { cn } from "@/lib/utils";
import { Code, Menu, Search, User } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { mockProjects } from "@/lib/mock-data";

export default function Header() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof mockProjects>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const getDashboardLink = () => {
    if (!user) return "/auth/login";
    return `/${user.role}-dashboard`;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearchResults(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim().length > 1) {
      // Filter projects based on search query
      const results = mockProjects
        .filter(
          (project) =>
            project.title.toLowerCase().includes(query.toLowerCase()) ||
            project.description.toLowerCase().includes(query.toLowerCase()) ||
            project.category.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 5);

      setSearchResults(results);
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  };

  const handleNavLinkClick = () => {
    setIsSheetOpen(false);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur transition-shadow duration-200",
        isScrolled && "shadow-sm"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md2:gap-8 lg:gap-10">
          <Link href="/" className="flex items-center gap-2">
            <Code className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">DevMarket</span>
          </Link>

          <nav className="hidden md2:flex items-center gap-6">
            <Link
              href="/projects"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/projects"
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              Browse
            </Link>
            <Link
              href="/categories"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/categories"
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              Categories
            </Link>
            <Link
              href="/sellers"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/sellers"
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              Sellers
            </Link>
            {user && user.role != "admin" && (
              <>
                <Link
                  href="/messages"
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    pathname === "/messages"
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  Messages
                </Link>
                <Link
                  href="/orders"
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    pathname === "/orders"
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  Orders
                </Link>
              </>
            )}
          </nav>
        </div>

        <div className="hidden md2:flex md2:flex-1 md2:items-center md2:justify-end md2:gap-4">
          <div className="w-full max-w-sm relative">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full rounded-full bg-background pl-8 md2:w-[300px] lg:w-[400px]"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() =>
                    searchQuery.trim().length > 1 && setShowSearchResults(true)
                  }
                  onBlur={() =>
                    setTimeout(() => setShowSearchResults(false), 200)
                  }
                />
              </div>
            </form>

            {showSearchResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 rounded-md2 border bg-background shadow-lg z-50">
                <ul className="py-2">
                  {searchResults.map((result) => (
                    <li key={result.id}>
                      <Link
                        href={`/projects/${result.id}`}
                        className="flex items-center gap-3 px-4 py-2 hover:bg-muted"
                        onClick={() => setShowSearchResults(false)}
                      >
                        <div className="h-8 w-8 rounded-md2 border overflow-hidden flex-shrink-0">
                          <img
                            src={result.image || "/placeholder.svg"}
                            alt={result.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">
                            {result.title}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {result.category}
                          </div>
                        </div>
                        <div className="font-medium">
                          ${result.price.toFixed(2)}
                        </div>
                      </Link>
                    </li>
                  ))}
                  <li className="border-t mt-1 pt-1">
                    <Link
                      href={`/search?q=${encodeURIComponent(searchQuery)}`}
                      className="block px-4 py-2 text-sm text-primary hover:bg-muted text-center"
                      onClick={() => setShowSearchResults(false)}
                    >
                      See all results
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <ThemeToggle />

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={getDashboardLink()}>Dashboard</Link>
                </DropdownMenuItem>
                {user.role != "admin" && (
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                  <Link href="/profile?tab=wallet">Wallet</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/auth/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button size="sm">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 md2:hidden">
          <ThemeToggle />

          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="grid gap-6 py-6">
                <div className="space-y-3">
                  <h4 className="font-medium">Navigation</h4>
                  <div className="grid gap-2">
                    <Link
                      href="/projects"
                      className="text-sm font-medium transition-colors hover:text-primary"
                      onClick={handleNavLinkClick}
                    >
                      Browse
                    </Link>
                    <Link
                      href="/categories"
                      className="text-sm font-medium transition-colors hover:text-primary"
                      onClick={handleNavLinkClick}
                    >
                      Categories
                    </Link>
                    <Link
                      href="/sellers"
                      className="text-sm font-medium transition-colors hover:text-primary"
                      onClick={handleNavLinkClick}
                    >
                      Sellers
                    </Link>
                    {user && user.role != "admin" && (
                      <>
                        <Link
                          href="/messages"
                          className="text-sm font-medium transition-colors hover:text-primary"
                          onClick={handleNavLinkClick}
                        >
                          Messages
                        </Link>
                        <Link
                          href="/orders"
                          className="text-sm font-medium transition-colors hover:text-primary"
                          onClick={handleNavLinkClick}
                        >
                          Orders
                        </Link>
                      </>
                    )}
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium">Account</h4>
                  <div className="grid gap-2">
                    {user ? (
                      <>
                        <Link
                          href={getDashboardLink()}
                          className="text-sm font-medium transition-colors hover:text-primary"
                          onClick={handleNavLinkClick}
                        >
                          Dashboard
                        </Link>
                        {user.role != "admin" && (
                          <Link
                            href="/profile"
                            className="text-sm font-medium transition-colors hover:text-primary"
                            onClick={handleNavLinkClick}
                          >
                            Profile
                          </Link>
                        )}
                        <Link
                          href="/profile?tab=wallet"
                          className="text-sm font-medium transition-colors hover:text-primary"
                          onClick={handleNavLinkClick}
                        >
                          Wallet
                        </Link>
                        <button
                          onClick={() => {
                            handleLogout();
                            handleNavLinkClick();
                          }}
                          className="text-left text-sm font-medium transition-colors hover:text-primary"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/auth/login"
                          className="text-sm font-medium transition-colors hover:text-primary"
                          onClick={handleNavLinkClick}
                        >
                          Login
                        </Link>
                        <Link
                          href="/auth/register"
                          className="text-sm font-medium transition-colors hover:text-primary"
                          onClick={handleNavLinkClick}
                        >
                          Sign Up
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
