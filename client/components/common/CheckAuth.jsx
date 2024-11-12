import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";

const CheckAuth = ({ isAuthenticated, user, children }) => {
  const pathName = usePathname();

  // Check if the current path is for login or register
  const isAuthPage =
    pathName.includes("/login") || pathName.includes("/register");
  const isAdminPage = pathName.includes("/admin");
  const isShoppingPage = pathName.includes("/shopping");

  // Redirect to login if not authenticated and on an auth page
  if (!isAuthenticated && isAuthPage) {
    return (
      <Link href="/auth/login">
        <a>Redirecting to login...</a>
      </Link>
    );
  }

  // Redirect authenticated users away from login/register pages
  if (isAuthenticated && isAuthPage) {
    if (user?.role === "admin") {
      return (
        <Link href="/admin/dashboard">
          <a>Redirecting to admin dashboard...</a>
        </Link>
      );
    } else {
      return (
        <Link href="/shopping/home">
          <a>Redirecting to home...</a>
        </Link>
      );
    }
  }

  // Prevent non-admin users from accessing admin pages
  if (isAuthenticated && user?.role !== "admin" && isAdminPage) {
    return (
      <Link href="/unauth-page">
        <a>Redirecting to unauthorized page...</a>
      </Link>
    );
  }

  // Prevent admin users from accessing shopping pages directly
  if (isAuthenticated && user?.role === "admin" && isShoppingPage) {
    return (
      <Link href="/admin/dashboard">
        <a>Redirecting to admin dashboard...</a>
      </Link>
    );
  }

  // Render children if no redirect is necessary
  return <div>{children}</div>;
};

export default CheckAuth;
