
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  Users,
  UserPlus,
  Phone,
  Calendar,
  Settings,
  Menu,
  X,
  ClipboardList
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

const navigation = [
  { name: "Dasbor", href: "/", icon: Home },
  { name: "Nasabah", href: "/nasabah", icon: Users },
  { name: "Agen", href: "/agen", icon: UserPlus },
  { name: "Aktivitas", href: "/aktivitas", icon: Phone },
  { name: "Jadwal", href: "/jadwal", icon: Calendar },
  { name: "Laporan", href: "/laporan", icon: ClipboardList },
  { name: "Pengaturan", href: "/pengaturan", icon: Settings },
];

const Sidebar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const NavLinks = () => (
    <>
      <div className="flex items-center justify-center py-6 px-4 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-2">
          <span className="p-1 bg-white rounded-md">
            <Phone className="h-6 w-6 text-insurance-500" />
          </span>
          <h1 className="text-white font-bold text-xl">AsuKontak</h1>
        </Link>
      </div>

      <div className="mt-6 space-y-1 px-3">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
              )}
              onClick={() => setOpen(false)}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button
            variant="outline"
            size="icon"
            className="fixed left-4 top-4 z-50"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="bg-sidebar p-0 text-sidebar-foreground w-64">
          <NavLinks />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:flex-col md:w-64 md:bg-sidebar md:text-sidebar-foreground md:border-r md:border-sidebar-border">
        <NavLinks />
      </div>
    </>
  );
};

export default Sidebar;
