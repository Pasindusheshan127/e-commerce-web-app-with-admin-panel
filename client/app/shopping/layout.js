"use client";
import CheckAuth from "@/components/common/CheckAuth";
import ShoppingHeader from "@/components/shoppingHeader";
import ShoppingSidebar from "@/components/shoppingSidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { checkAuth } from "@/redux/features/auth-slice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ShoppingLayout = ({ children }) => {
  // const isAuthenticated = false; //dummy for testing
  // const user = null; //dummy for testing

  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch the checkAuth action to verify user authentication
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading)
    return <Skeleton className="w-[600px] h-[600px] rounded-full" />;

  console.log(isLoading, user);

  return (
    <CheckAuth isAuthenticated={isAuthenticated} user={user}>
      <div className="flex min-h-screen w-full">
        {/* common sliebar */}
        <ShoppingSidebar />
        <div className="flex flex-1 flex-col">
          {/* common header */}
          <ShoppingHeader />
          <main className="flex flex-1 bg-muted/40 p-4 md:p-6">{children}</main>
        </div>
      </div>
    </CheckAuth>
  );
};

export default ShoppingLayout;
