"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { AlignJustifyIcon } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { UserButton } from "@clerk/nextjs";

function Header({ profileInfo , user }) {
  const menuItems = [
    { label: "Home", path: "/", show: true },
    { label: "Login", path: "/sign-in", show: !user },
    { label: "Register", path: "/sign-up", show: !user },
    { label: "Jobs", path: "/jobs", show: user },
    { label: "Activity", path: "/activity", show: profileInfo?.role === 'candidate' },
    { label: "Membership", path: "/membership", show: user },
    { label: "Account", path: "/account", show: user },
  ];

  return (
    <div className="border-b shadow-sm bg-white">
      <header className="flex h-16 w-full shrink-0 items-center px-4">

        <Link href="/" className="mr-6   text-3xl font-bold text-blue-600">
          JOBSCO
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-4 ml-auto">
          {menuItems.map((menuItem) =>
            menuItem.show ? (
              <Link
                key={menuItem.label}
                href={menuItem.path}
                onClick={()=>sessionStorage.removeItem('filterParams')}
                className="text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors"
              >
                {menuItem.label}
              </Link>
            ) : null
          )}
          {/* ✅ Show UserButton on desktop when logged in */}
          {user && <UserButton afterSignOutUrl="/" />}
        </nav>

        {/* Mobile Hamburger */}
        <div className="lg:hidden ml-auto flex items-center gap-3">
          {/* ✅ Show UserButton on mobile header when logged in */}
          {user && <UserButton afterSignOutUrl="/" />}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <AlignJustifyIcon className="h-6 w-6" />
                <span className="sr-only">Toggle Navigation Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] p-0">
              <VisuallyHidden>
                <SheetTitle>Navigation Menu</SheetTitle>
              </VisuallyHidden>
              <div className="flex items-center h-16 px-6 border-b">
                <Link className="mr-6 lg:flex" href="/">
                  <h3 className="text-xl font-bold text-blue-600">JOBSCO</h3>
                </Link>
              </div>
              <div className="grid gap-1 p-4">
                {menuItems.map((menuItem) =>
                  menuItem.show ? (
                    <Link
                      key={menuItem.label}
                      href={menuItem.path}
                      className="flex w-full items-center px-4 py-3 text-sm font-semibold rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      {menuItem.label}
                    </Link>
                  ) : null
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </header>
    </div>
  );
}

export default Header;