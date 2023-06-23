import icons from "../../assets/icons/icons";

export interface NavItems {
  title: string;
  path: string;
  icon: any;
  isActive: boolean;
  subNav?: NavItems[];
}

const SidebarNavItems: NavItems[] = [
  {
    title: "Home",
    path: "/",
    icon: icons.home,
    isActive: false,
  },
  {
    title: "Service",
    path: "/service",
    icon: icons.service,
    isActive: false,
  },
  {
    title: "Project",
    path: "/project",
    icon: icons.project,
    isActive: false,
    subNav: [
      {title: "Dashboard", path: "/", icon: icons.project, isActive: false},
    ]
  },
  {
    title: "About",
    path: "/about",
    icon: icons.about,
    isActive: false,
    subNav: [
      {title: "About", path: "/", icon: icons.about, isActive: false},
      {title: "Ecosystem", path: "/ecosystem", icon: icons.about, isActive: false},
      {title: "Partner", path: "/partner", icon: icons.about, isActive: false},
      {title: "People", path: "/people", icon: icons.about, isActive: false}
    ]
  },
  {
    title: "Work",
    path: "/work",
    icon: icons.work,
    isActive: false
  },
  {
    title: "Career",
    path: "/career",
    icon: icons.career,
    isActive: false,
    subNav: [
      {title: "Career", path: "/", icon: icons.career, isActive: false},
      {title: "Job", path: "/job", icon: icons.career, isActive: false},
      {title: "Applicant", path: "/applicant", icon: icons.career, isActive: false}
    ]
  },
  {
    title: "Contact",
    path: "/contact",
    icon: icons.contact,
    isActive: false,
  },
  {
    title: "Ecosystem",
    path: "/ecosystem",
    icon: icons.ecosystem,
    isActive: false,
    subNav: [
      {title: "Client", path: "/", icon: icons.ecosystem, isActive: false},
      {title: "Ecosystem", path: "/ecosystem", icon: icons.ecosystem, isActive: false},
      {title: "Partner", path: "/partner", icon: icons.ecosystem, isActive: false}
    ]
  },
  {
    title: "Journal",
    path: "/journal",
    icon: icons.work,
    isActive: false,
  },
];

export default SidebarNavItems;
