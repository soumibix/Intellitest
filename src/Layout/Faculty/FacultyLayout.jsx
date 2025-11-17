import React, { useEffect, useState } from "react";
import { Sidebar } from "../../Components/common/Sidebar";
import { TopBar } from "../../Components/common/TopBar";
import { facultyPortalNavItems } from "../../Data/facultyData";
import { useAuth } from "../../AppRouter";

function FacultyLayout({ children }) {
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

  const handleFacultyLogout = () => {
    logout();
    // navigate("/faculty/signin");
    // localStorage.clear();
    // sessionStorage.clear();
    // window.location.href = "/admin/login";
  };

  const closeSidebar = () => {
    if (!isLargeScreen) setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-[#F5F5F5]">
      <Sidebar
        navItems={facultyPortalNavItems}
        isOpen={sidebarOpen}
        isCollapsed={sidebarCollapsed}
        onToggle={handleMenuClick}
        onClose={closeSidebar}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <TopBar userName="Faculty" onMenuClick={handleMenuClick} onLogout={handleFacultyLogout}/>
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}

export default FacultyLayout;
