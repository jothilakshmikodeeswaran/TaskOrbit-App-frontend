import Sidebar from "./Sidebar";

function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8 space-y-12">{children}</main>
    </div>
  );
}

export default MainLayout;