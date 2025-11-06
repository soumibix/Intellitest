import { ChartPie, FileText, GraduationCap, Settings, UserRoundPlus } from "lucide-react";

export const portalNavItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: ChartPie,
    hasDropdown: false,
    route: "/admin/dashboard",
  },
  {
    id: "addfaculties",
    label: "Add Faculty",
    icon: UserRoundPlus,
    hasDropdown: false,
    route: "/admin/add-faculties",
  },
  {
    id: "test-details",
    label: "Test Details",
    icon: FileText,
    hasDropdown: false,
    route: "/admin/test-details",
  },
  {
    id: "student-performance",
    label: "Student Performance",
    icon: GraduationCap,
    hasDropdown: false,
    route: "/admin/student-performance",
  },
  // {
  //   id: "settings",
  //   label: "Settings",
  //   icon: Settings,
  //   hasDropdown: false,
  //   route: "/admin/settings",
  // },
];
