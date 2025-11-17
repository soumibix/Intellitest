import React, { useEffect, useState } from "react";
import { Sidebar } from "../../Components/common/Sidebar";
import { TopBar } from "../../Components/common/TopBar";
import { userPortalNavItems } from "../../Data/userSideBarData";
import { useAuth } from "../../AppRouter";

function UserLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const {logout} = useAuth();

  useEffect(() => {
    const checkScreenSize = () => {
      const isLarge = window.innerWidth >= 1024;
      setIsLargeScreen(isLarge);
      setSidebarOpen(isLarge);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleMenuClick = () => {
    if (isLargeScreen) {
      setSidebarCollapsed(!sidebarCollapsed);
    } else {
      setSidebarOpen(!sidebarOpen);
    }
  };

  const handleUserLogout = () => {
    logout();
  };

  const closeSidebar = () => {
    if (!isLargeScreen) setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-[#F5F5F5]">
      <Sidebar
        navItems={userPortalNavItems}
        isOpen={sidebarOpen}
        isCollapsed={sidebarCollapsed}
        onToggle={handleMenuClick}
        onClose={closeSidebar}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <TopBar userName="User" onMenuClick={handleMenuClick} onLogout={handleUserLogout}/>
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}

export default UserLayout;
