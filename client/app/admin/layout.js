"use client";
import AdminHeader from "@/components/AdminHeader";
import AdminSidebar from "@/components/AdminSidebar";
import CheckAuth from "@/components/common/CheckAuth";
import { useSelector } from "react-redux";

const AdminLayout = ({ children }) => {
  // const isAuthenticated = false; //dummy for testing
  // const user = null; //dummy for testing

  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );

  return (
    <CheckAuth isAuthenticated={isAuthenticated} user={user}>
      <div className="flex min-h-screen w-full">
        {/* admin sliebar */}
        <AdminSidebar />
        <div className="flex flex-1 flex-col">
          {/* admin header */}
          <AdminHeader />
          <main className="flex flex-1 bg-muted/40 p-4 md:p-6">{children}</main>
        </div>
      </div>
    </CheckAuth>
  );
};

export default AdminLayout;
