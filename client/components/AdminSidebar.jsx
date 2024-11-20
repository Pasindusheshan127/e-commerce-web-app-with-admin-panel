"use client";

import {
  BadgeCheck,
  ChartNoAxesCombined,
  LayoutDashboard,
  ShoppingBasket,
} from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

// Sidebar menu items configuration
const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <BadgeCheck />,
  },
];

// MenuItems component to render the sidebar menu
// Takes an optional `setOpen` function for controlling sidebar state
const MenuItems = ({ setOpen }) => {
  return (
    <div className="mt-8 flex flex-col gap-2">
      {adminSidebarMenuItems.map((menuItem) => (
        <Link
          key={menuItem.id}
          href={menuItem.path}
          aria-label={menuItem.label}
        >
          <div
            // Handles closing the sidebar if `setOpen` is provided (useful for mobile view)
            onClick={() => {
              if (setOpen) setOpen(false);
            }}
            className="flex cursor-pointer text-xl items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <div className="flex gap-4">
              {menuItem.icon}
              <span>{menuItem.label}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

// AdminSidebar component to render both mobile and desktop sidebars
const AdminSidebar = ({ open, setOpen }) => {
  return (
    <Fragment>
      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64 bg-white">
          <div className="flex flex-col h-full">
            {/* Sidebar Header */}
            <SheetHeader className="border-b">
              <SheetTitle className="flex items-center gap-2 mt-5 mb-5">
                <ChartNoAxesCombined size={30} />
                <span className="text-2xl font-extrabold">Admin Panel</span>
              </SheetTitle>
            </SheetHeader>

            {/* Sidebar Menu Items */}
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        {/* Sidebar Header */}
        <Link href={"/admin/dashboard"} aria-label="Admin Panel">
          <div className="flex cursor-pointer items-center gap-2">
            <ChartNoAxesCombined size={30} />
            <h1 className="text-2xl font-extrabold">Admin Panel</h1>
          </div>
        </Link>

        {/* Sidebar Menu Items */}
        <MenuItems />
      </aside>
    </Fragment>
  );
};

export default AdminSidebar;
