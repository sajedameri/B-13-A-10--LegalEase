"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Avatar, Button } from "@heroui/react";

export default function Navbar() {
    const { data: session,isPending } = authClient.useSession();
    console.log(session,"meri")
  const user = session?.user;

   const handleSignOut = async () => {
    await authClient.signOut();
  }; 
  const pathname = usePathname();
  if(pathname.includes('dashboard')){
    return null;
  }
  const [open, setOpen] = useState(false);


  return (
    <nav className="sticky top-0 z-50 bg-white shadow">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          LegalEase
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className={
              pathname === "/"
                ? "font-semibold text-blue-600"
                : "text-gray-700"
            }
          >
            Home
          </Link>

          <Link
            href="/browse-lawyers"
            className={
              pathname === "/browse-lawyers"
                ? "font-semibold text-blue-600"
                : "text-gray-700"
            }
          >
            Browse Lawyers
          </Link>

          {/* Dashboard Dropdown */}
          <div className="group relative">
            <button className="flex items-center gap-1 text-gray-700">
              Dashboard
              <ChevronDown size={18} />
            </button>

            <div className="absolute top-10 hidden w-48 rounded-lg bg-white p-2 shadow-lg group-hover:block">
              <Link
                href="/dashboard/user"
                className="block rounded px-3 py-2 hover:bg-gray-100 text-gray-900"
              >
                User Dashboard
              </Link>

              <Link
                href="/dashboard/lawyer"
                className="block rounded px-3 py-2 hover:bg-gray-100 text-gray-900"
              >
                Lawyer Dashboard
              </Link>

              <Link
                href="/dashboard/admin"
                className="block rounded px-3 py-2 hover:bg-gray-100 text-gray-900"
              >
                Admin Dashboard
              </Link>
            </div>
          </div>

          {/* Search */}
          <input
            type="text"
            placeholder="Search lawyers..."
            className="rounded-lg border px-4 py-2 outline-none focus:border-blue-500 text-gray-900"
          />

          {/* Login */}
    
           {user ? (
          <div className="flex items-center gap-3">

            {/* Avatar */}
            <Avatar>
              <Avatar.Image
                referrerPolicy="no-referrer"
                src={user?.image}
              />
              <Avatar.Fallback>
                {user?.name?.[0]}
              </Avatar.Fallback>
            </Avatar>
             <li>
                  <Button
                    onClick={handleSignOut}
                    variant="gost"
                    className="mt-2 w-full"
                  >
                    Logout
                  </Button>
                </li>

            {/* Dropdown */}
         
          </div>
        ) : (
          <div className="hidden lg:flex gap-3">
            <Link href="/login">Login</Link>
            <Link href="/signup">SignUp</Link>
          </div>
        )}
       
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-900"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="space-y-4 border-t bg-white p-5 md:hidden text-gray-900">
          <Link
            href="/"
            className="block"
          >
            Home
          </Link>

          <Link
            href="/browse-lawyers"
            className="block"
          >
            Browse Lawyers
          </Link>

          <Link
            href="/dashboard"
            className="block"
          >
            Dashboard
          </Link>

          <input
            type="text"
            placeholder="Search lawyers..."
            className="w-full rounded-lg border px-4 py-2"
          />

          <Link
            href="/login"
            className="block rounded-lg bg-blue-600 py-2 text-center text-white"
          >
            Login
          </Link>

            <Link
            href="/signup"
            className="block rounded-lg bg-blue-600 py-2 text-center text-white"
          >
            SignUp
          </Link>
        </div>
      )}
    </nav>
  );
}