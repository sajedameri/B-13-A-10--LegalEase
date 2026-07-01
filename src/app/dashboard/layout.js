import { DashboardSidebar } from '@/components/DashboardSidebar';

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-background">
      <div className="flex flex-1 overflow-hidden">
        {/*sidebar  */}
        <DashboardSidebar />
        {/* navbar */}
        <div className="flex flex-1 overflow-y-auto">
          {/* navbar */}
          <div>Navbar</div>
          <main className="p-5">{children}</main>
        </div>
      </div>
    </div>
  );
}
