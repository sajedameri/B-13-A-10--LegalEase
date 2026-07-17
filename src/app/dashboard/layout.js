import DashboardNavbar from "@/components/DashboardNavbar";
import { DashboardSidebar } from "@/components/DashboardSidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Right Section */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Navbar */}
        <DashboardNavbar />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-5">
          {children}
        </main>
      </div>
    </div>
  );
}