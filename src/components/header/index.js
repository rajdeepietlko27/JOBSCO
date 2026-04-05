"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { AlignJustifyIcon } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { UserButton } from "@clerk/nextjs";

function Header({ profileInfo, user }) {
  const menuItems = [
    { label: "Home", path: "/", show: true },
    { label: "Login", path: "/sign-in", show: !user },
    { label: "Register", path: "/sign-up", show: !user },
    { label: "Jobs", path: "/jobs", show: user },
    { label: "Activity", path: "/activity", show: profileInfo?.role === "candidate" },
    { label: "Membership", path: "/membership", show: user },
    { label: "Account", path: "/account", show: user },
  ];

  return (
    <header className="w-full bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex h-16 items-center px-6 lg:px-8">

       
        <Link href="/" className="text-2xl font-extrabold tracking-tight">
          <span className="text-gray-900">JOBS</span>
          <span className="text-blue-600">CO</span>
        </Link>

     
        <nav className="hidden lg:flex items-center gap-1 ml-auto">
          {menuItems.map((menuItem) =>
            menuItem.show ? (
              <Link
                key={menuItem.label}
                href={menuItem.path}
                onClick={() => sessionStorage.removeItem("filterParams")}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
              >
                {menuItem.label}
              </Link>
            ) : null
          )}
          {user && (
            <div className="ml-2 pl-2 border-l border-gray-200">
              <UserButton afterSignOutUrl="/" />
            </div>
          )}
        </nav>

        <div className="lg:hidden ml-auto flex items-center gap-3">
          {user && <UserButton afterSignOutUrl="/" />}
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <AlignJustifyIcon className="h-5 w-5 text-gray-700" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] p-0">
              <VisuallyHidden>
                <SheetTitle>Navigation Menu</SheetTitle>
              </VisuallyHidden>
              <div className="flex items-center h-16 px-6 border-b">
                <span className="text-xl font-extrabold">
                  <span className="text-gray-900">JOBS</span>
                  <span className="text-blue-600">CO</span>
                </span>
              </div>
              <div className="grid gap-1 p-4">
                {menuItems.map((menuItem) =>
                  menuItem.show ? (
                    <Link
                      key={menuItem.label}
                      href={menuItem.path}
                      className="flex w-full items-center px-4 py-3 text-sm font-medium rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all"
                    >
                      {menuItem.label}
                    </Link>
                  ) : null
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </header>
  );
}

export default Header;