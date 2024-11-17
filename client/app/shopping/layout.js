"use client";
import CheckAuth from "@/components/common/CheckAuth";
import ShoppingHeader from "@/components/shoppingHeader";
import ShoppingSidebar from "@/components/shoppingSidebar";
import { useSelector } from "react-redux";

const ShoppingLayout = ({ children }) => {
  // const isAuthenticated = false; //dummy for testing
  // const user = null; //dummy for testing

  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );

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
