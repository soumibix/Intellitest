import { BarChart3, ChartPie, Clock, FileText, GraduationCap, Settings } from "lucide-react";

export const userPortalNavItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Clock,
      route: "/user/dashboard",
    },
    {
      id: "tests",
      label: "My Tests",
      icon: FileText,
      route: "/user/tests",
    },
    {
      id: "test-reports",
      label: "Test Reports",
      icon: BarChart3,
      route: "/user/test-reports",
    },
    // {
    //   id: "settings",
    //   label: "Settings",
    //   icon: Settings,
    //   route: "/user/settings",
    // },
  ];
