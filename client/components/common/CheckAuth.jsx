"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const CheckAuth = ({ isAuthenticated, user, children }) => {
  const pathName = usePathname();
  const router = useRouter();

  const [redirecting, setRedirecting] = useState(false); // State to manage redirection logic

  useEffect(() => {
    if (redirecting) return; // Prevent rerunning after redirection

    const isAuthPage =
      pathName.includes("/login") || pathName.includes("/register");
    const isAdminPage = pathName.includes("/admin");
    const isShoppingPage = pathName.includes("/shopping");

    // Redirect to login if not authenticated and not on an auth page
    if (!isAuthenticated && !isAuthPage) {
      setRedirecting(true); // Set to prevent re-triggering
      router.push("/auth/login");
      return;
    }

    // Redirect authenticated users away from login/register pages
    if (isAuthenticated && isAuthPage) {
      setRedirecting(true);
      if (user?.role === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/shopping/home");
      }
      return;
    }

    // Prevent non-admin users from accessing admin pages
    if (isAuthenticated && user?.role !== "admin" && isAdminPage) {
      setRedirecting(true);
      router.push("/unauth");
      return;
    }

    // Prevent admin users from accessing shopping pages directly
    if (isAuthenticated && user?.role === "admin" && isShoppingPage) {
      setRedirecting(true);
      router.push("/admin/dashboard");
      return;
    }
  }, [isAuthenticated, user, pathName, router, redirecting]);

  // Render children if no redirect is necessary
  return <div>{children}</div>;
};

export default CheckAuth;
