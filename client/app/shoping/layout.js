import ShoppingHeader from "@/components/shoppingHeader";
import ShoppingSidebar from "@/components/shoppingSidebar";

const ShoppingLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen w-full">
      {/* common sliebar */}
      <ShoppingSidebar />
      <div className="flex flex-1 flex-col">
        {/* common header */}
        <ShoppingHeader />
        <main className="flex flex-1 bg-muted/40 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
};

export default ShoppingLayout;
