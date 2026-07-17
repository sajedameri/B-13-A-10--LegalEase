import { auth } from '@/lib/auth';
import {
  LayoutSideContentLeft,
  Bell,
  Envelope,
  Gear,
  House,
  Magnifier,
  Person,
  LayoutCellsLarge,
  PersonPlus,
  PersonFill,
  Receipt,
} from '@gravity-ui/icons';
import { Button, Drawer } from '@heroui/react';
import { ChartArea, UserCheck2 } from 'lucide-react';
import { headers } from 'next/headers';
import Link from 'next/link';
import { BiMoney } from 'react-icons/bi';
import { TbAsset } from 'react-icons/tb';

export async function DashboardSidebar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;
  const role = user?.role || 'client';
  console.log(user);
  const dashboardItems = {
   lawyer :[
  { 
    icon: LayoutCellsLarge, // Changed from LayoutFeed
    label: 'Home', 
    link: '/dashboard/lawyer' 
  },
  { 
    icon: PersonPlus, 
    label: 'New Hiring Requests', 
    link: '/dashboard/lawyer/new-hiring' 
  },
  {
    icon: PersonFill,
    label: 'Profile Management',
    link: '/dashboard/lawyer/manage-legal-profile',
  },
  { 
    icon: Receipt, 
    label: 'Hiring History', 
    link: '/dashboard/lawyer/hiring' 
  },
],
    client: [
      { icon: ChartArea, label: 'My Profile', link: '/dashboard/client' },
      { icon: TbAsset, label: 'Hiring History', link: '/dashboard/client/hiring-history' },
      { icon: BiMoney, label: 'Update Profile', link: '/dashboard/client/update-profile' },
      { icon: BiMoney, label: 'Update Profile', link: '/dashboard/client/comments' },
    ],
    admin: [
      { icon: ChartArea, label: 'Home', link: '/dashboard/admin' },
      { icon: UserCheck2, label: 'User Manege', link: '/dashboard/client/products' },
      { icon: BiMoney, label: 'Transection', link: '/dashboard/client/transection' },
    ],
  };
  const navItems = dashboardItems[role];
  console.log(navItems);
  // {icon: House, label: "Home"},
  // {icon: Magnifier, label: "Search"},
  // {icon: Bell, label: "Notifications"},
  // {icon: Envelope, label: "Messages"},
  // {icon: Person, label: "Profile"},
  // {icon: Gear, label: "Settings"},
  const navconten = (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => (
        <Link
          key={item.label}
          href={item.link}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
          type="button"
        >
          <item.icon className="size-5 text-muted" />
          {item.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <>
     <aside className="hidden w-64 shrink-0 border-r border-default lg:block">

  {/* Company Logo */}
  <div className="flex items-center gap-3 border-b border-default px-4 py-5">
    

    <div>
      <h2 className="text-xl font-bold">LegalEase</h2>
      <p className="text-xs text-gray-500">Lawyer Dashboard</p>
    </div>
  </div>

  {/* Sidebar Menu */}
  <div className="p-4">
    {navconten}
  </div>

</aside>
      <Drawer>
        <Button className="lg:hidden" variant="secondary">
          <LayoutSideContentLeft />
          Sidbar
        </Button>

        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading>Navigation</Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body>{navconten}</Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}
