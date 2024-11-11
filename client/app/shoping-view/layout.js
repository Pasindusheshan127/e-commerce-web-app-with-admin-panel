const ShoppingLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen w-full">
      {/* admin sliebar */}
      <div className="flex flex-1 flex-col">
        {/* admin header */}
        <main className="flex flex-1 bg-muted/40 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
};

export default ShoppingLayout;