import { ChartPie, FileText, GraduationCap, Settings } from "lucide-react";

export const portalNavItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: ChartPie,
    hasDropdown: false,
    route: "/dashboard",
  },
  {
    id: "test-details",
    label: "Test Details",
    icon: FileText,
    hasDropdown: false,
    route: "/test-details",
  },
  {
    id: "student-performance",
    label: "Student Performance",
    icon: GraduationCap,
    hasDropdown: false,
    route: "/student-performance",
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    hasDropdown: false,
    route: "/settings",
  },
];
