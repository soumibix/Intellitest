import { ChartPie, FileText, GraduationCap, Settings } from "lucide-react";

export const facultyPortalNavItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: ChartPie,
    hasDropdown: false,
    route: "/faculty/dashboard",
  },
  {
    id: "test-details",
    label: "Test Details",
    icon: FileText,
    hasDropdown: false,
    route: "/faculty/test-details",
  },
  {
    id: "student-performance",
    label: "Student Performance",
    icon: GraduationCap,
    hasDropdown: false,
    route: "/faculty/student-performance",
  },
  // {
  //   id: "settings",
  //   label: "Settings",
  //   icon: Settings,
  //   hasDropdown: false,
  //   route: "/faculty/settings",
  // },
];
