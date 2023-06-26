import icons from "../../assets/icons/icons";

export interface NavItems {
  id: string;
  title: string;
  path: string;
  icon: any;
  isActive: boolean;
  subNav?: NavItems[];
}

const SidebarNavItems: NavItems[] = [
  {
    id: "home",
    title: "Home",
    path: "/",
    icon: icons.home,
    isActive: false,
  },
  {
    id: "service",
    title: "Service",
    path: "/service",
    icon: icons.service,
    isActive: false,
  },
  {
    id: "project",
    title: "Project",
    path: "/project",
    icon: icons.project,
    isActive: false,
    subNav: [
      {
        id: "project dashboard",
        title: "Dashboard",
        path: "/",
        icon: icons.project,
        isActive: false,
      },
    ],
  },
  {
    id: "about",
    title: "About",
    path: "/about",
    icon: icons.about,
    isActive: false,
    subNav: [
      {
        id: "about about",
        title: "About",
        path: "/",
        icon: icons.about,
        isActive: false,
      },
      {
        id: "about ecosystem",
        title: "Ecosystem",
        path: "/ecosystem",
        icon: icons.about,
        isActive: false,
      },
      {
        id: "about partner",
        title: "Partner",
        path: "/partner",
        icon: icons.about,
        isActive: false,
      },
      {
        id: "about people",
        title: "People",
        path: "/people",
        icon: icons.about,
        isActive: false,
      },
    ],
  },
  {
    id: "work",
    title: "Work",
    path: "/work",
    icon: icons.work,
    isActive: false,
  },
  {
    id: "career",
    title: "Career",
    path: "/career",
    icon: icons.career,
    isActive: false,
    subNav: [
      {
        id: "career career",
        title: "Career",
        path: "/",
        icon: icons.career,
        isActive: false,
      },
      {
        id: "career job",
        title: "Job",
        path: "/job",
        icon: icons.career,
        isActive: false,
      },
      {
        id: "career applicant",
        title: "Applicant",
        path: "/applicant",
        icon: icons.career,
        isActive: false,
      },
    ],
  },
  {
    id: "contact",
    title: "Contact",
    path: "/contact",
    icon: icons.contact,
    isActive: false,
  },
  {
    id: "ecosystem",
    title: "Ecosystem",
    path: "/ecosystem",
    icon: icons.ecosystem,
    isActive: false,
    subNav: [
      {
        id: "ecosystem client",
        title: "Client",
        path: "/",
        icon: icons.ecosystem,
        isActive: false,
      },
      {
        id: "ecosystem ecosystem",
        title: "Ecosystem",
        path: "/ecosystem",
        icon: icons.ecosystem,
        isActive: false,
      },
      {
        id: "ecosystem partner",
        title: "Partner",
        path: "/partner",
        icon: icons.ecosystem,
        isActive: false,
      },
    ],
  },
  {
    id: "journal",
    title: "Journal",
    path: "/journal",
    icon: icons.work,
    isActive: false,
  },
];

export default SidebarNavItems;
