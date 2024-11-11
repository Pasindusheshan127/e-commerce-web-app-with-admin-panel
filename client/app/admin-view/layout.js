import AdminHeader from "@/components/AdminHeader";
import AdminSidebar from "@/components/AdminSidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen w-full">
      {/* admin sliebar */}
      <AdminSidebar />
      <div className="flex flex-1 flex-col">
        {/* admin header */}
        <AdminHeader />
        <main className="flex flex-1 bg-muted/40 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
