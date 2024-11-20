"use client";
import AdminHeader from "@/components/AdminHeader";
import AdminSidebar from "@/components/AdminSidebar";
import CheckAuth from "@/components/common/CheckAuth";
import { Skeleton } from "@/components/ui/skeleton";
import { checkAuth } from "@/redux/features/auth-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AdminLayout = ({ children }) => {
  const [openSidebar, setOpenSidebar] = useState(false);

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
        {/* admin sliebar */}
        <AdminSidebar open={openSidebar} setOpen={setOpenSidebar} />
        <div className="flex flex-1 flex-col">
          {/* admin header */}
          <AdminHeader setOpen={setOpenSidebar} />
          <main className="flex flex-1 bg-muted/40 p-4 md:p-6">{children}</main>
        </div>
      </div>
    </CheckAuth>
  );
};

export default AdminLayout;
