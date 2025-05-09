"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Globe, Menu, LogIn, User, Heart } from "lucide-react"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DarkModeToggle } from "@/components/dark-mode-toggle"
import { useSession } from "next-auth/react"
import Image from "next/image"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const { data: session } = useSession()

  const isActive = (path) => pathname === path

  const navItems = [{ name: "Home", path: "/" }]
  
  // Add favorites to nav items only for logged in users
  if (session) {
    navItems.push({ name: "Favorites", path: "/favorites" })
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <Globe className="h-6 w-6" />
            <span className="font-bold">Country Explorer</span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 ${
                  isActive(item.path) ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {item.path === "/favorites" && <Heart className="h-3.5 w-3.5" />}
                {item.name}
              </Link>
            ))}
          </nav>

          {!session ? (
            <Link href="/login" passHref>
              <Button variant="ghost" size="sm" className="gap-1">
                <LogIn className="h-4 w-4" />
                <span>Login</span>
              </Button>
            </Link>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  {session.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user.name || "Profile"}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                  <span className="hidden md:inline">
                    {session.user?.name?.split(" ")[0] || "Account"}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer w-full">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/favorites" className="cursor-pointer w-full">
                    My Favorites
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/api/auth/signout" className="cursor-pointer w-full">
                    Sign Out
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <DarkModeToggle />

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      isActive(item.path) ? "text-foreground" : "text-muted-foreground"
                    } ${item.path === "/favorites" ? "flex items-center gap-1" : ""}`}
                    onClick={() => setOpen(false)}
                  >
                    {item.path === "/favorites" && <Heart className="h-3.5 w-3.5" />}
                    {item.name}
                  </Link>
                ))}
                {!session ? (
                  <Link
                    href="/login"
                    className="text-sm font-medium transition-colors hover:text-primary text-muted-foreground flex items-center gap-2"
                    onClick={() => setOpen(false)}
                  >
                    <LogIn className="h-4 w-4" />
                    <span>Login</span>
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/profile"
                      className="text-sm font-medium transition-colors hover:text-primary text-muted-foreground flex items-center gap-2"
                      onClick={() => setOpen(false)}
                    >
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                    <Link
                      href="/api/auth/signout"
                      className="text-sm font-medium transition-colors hover:text-primary text-muted-foreground"
                      onClick={() => setOpen(false)}
                    >
                      Sign out
                    </Link>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
