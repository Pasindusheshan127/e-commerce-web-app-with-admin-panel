"use client";
import CheckAuth from "@/components/common/CheckAuth";
import { Skeleton } from "@/components/ui/skeleton";
import { checkAuth } from "@/redux/features/auth-slice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const AuthLayout = ({ children }) => {
  // const isAuthenticated = false;        //dummy for testing
  // const user = {
  //   name: "sara",
  //   role: "user",
  // };         //dummy for testing
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
        <div className="hidden lg:flex items-center justify-center bg-black w-1/2 px-12">
          <div className="max-w-md space-y-6 text-center text-primary-foreground">
            <h1 className="text-white text-4xl font-extrabold tracking-tight">
              Welcome to ECommerce Shopping
            </h1>
          </div>
        </div>
        <main className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </CheckAuth>
  );
};

export default AuthLayout;
