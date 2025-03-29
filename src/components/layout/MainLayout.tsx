
import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopNav />
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {children}
        </main>
        <footer className="py-4 px-6 text-center text-sm text-muted-foreground border-t">
          © {new Date().getFullYear()} Asuransi Kontak Helper. Hak Cipta Dilindungi.
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;
