import icons from "../../assets/icons/icons";

interface NavItems {
  title: string;
  path: string;
  icon: string;
  subNav?: NavItems[];
}

const SidebarNavItems: NavItems[] = [
  {
    title: "Home",
    path: "/home",
    icon: icons.home,
  },
  {
    title: "Service",
    path: "/service",
    icon: icons.service,
  },
  {
    title: "Project",
    path: "/project",
    icon: icons.project,
  },
  {
    title: "About",
    path: "/about",
    icon: icons.about,
  },
  {
    title: "Work",
    path: "/work",
    icon: icons.work,
  },
  {
    title: "Career",
    path: "/career",
    icon: icons.career,
  },
  {
    title: "Contact",
    path: "/contact",
    icon: icons.contact,
  },
  {
    title: "Ecosystem",
    path: "/ecosystem",
    icon: icons.ecosystem,
  },
  {
    title: "Journal",
    path: "/journal",
    icon: icons.work,
  },
];
export default SidebarNavItems;
