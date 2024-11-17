"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const CheckAuth = ({ isAuthenticated, user, children }) => {
  const pathName = usePathname();
  const router = useRouter();

  // Check if the current page is a login or register page
  const isAuthPage =
    pathName.includes("/login") || pathName.includes("/register");
  // Check if the current page is an admin-specific page
  const isAdminPage = pathName.includes("/admin");
  // Check if the current page is a shopping page
  const isShoppingPage = pathName.includes("/shopping");

  useEffect(() => {
    // If user is not authenticated and not on an auth page, redirect to login
    if (!isAuthenticated && !isAuthPage) {
      router.push("/auth/login");
      return;
    }

    // If user is authenticated and tries to access login/register pages, redirect based on their role
    if (isAuthenticated && isAuthPage) {
      if (user?.role === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/shopping/home");
      }
      return;
    }

    // Redirect non-admin users away from admin pages
    if (isAuthenticated && user?.role !== "admin" && isAdminPage) {
      router.push("/unauth");
      return;
    }

    // Redirect admin users away from shopping pages
    if (isAuthenticated && user?.role === "admin" && isShoppingPage) {
      router.push("/admin/dashboard");
      return;
    }

    // If the path is the root, redirect based on authentication and role
    if (pathName === "/") {
      if (!isAuthenticated) {
        router.push("/auth/login");
      } else {
        if (user?.role === "admin") {
          router.push("/admin/dashboard");
        } else {
          router.push("/shopping/home");
        }
      }
      return;
    }
  }, [isAuthenticated, pathName, router, user?.role]); // Dependencies ensure this runs when these change

  // Render the children if no redirection occurred
  return <div>{children}</div>;
};

export default CheckAuth;
