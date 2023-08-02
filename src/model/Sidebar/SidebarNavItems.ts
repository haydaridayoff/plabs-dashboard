import icons from "../../assets/icons/icons";

interface navItem {
  id: string;
  title: string;
  path: string;
  param?: { [key: string]: string };
  icon: any;
  isActive: boolean;
  subNav?: navItem[];
}

const sidebarNavItems: navItem[] = [
  {
    id: "home",
    title: "Home",
    path: "",
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
        id: "project-dashboard",
        title: "Dashboard",
        path: "/project",
        icon: icons.project,
        isActive: false,
      },
      {
        id: "project-create",
        title: "Create",
        path: "/project/create",
        icon: icons.project,
        isActive: false,
      },
      {
        id: "project-edit",
        title: "Edit",
        path: ":id",
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
        id: "about-about",
        title: "About",
        path: "/about?tabStatus=about",
        param: {
          tabStatus: "about",
        },
        icon: icons.about,
        isActive: false,
      },
      {
        id: "about-ecosystem",
        title: "Ecosystem",
        path: "about?tabStatus=ecosystem",
        param: {
          tabStatus: "ecosystem",
        },
        icon: icons.about,
        isActive: false,
      },
      {
        id: "about-partner",
        title: "Partner",
        path: "/about?tabStatus=partner",
        param: {
          tabStatus: "partner",
        },
        icon: icons.about,
        isActive: false,
      },
      {
        id: "about-people",
        title: "People",
        path: "/about?tabStatus=people",
        param: {
          tabStatus: "people",
        },
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
        id: "career-career",
        title: "Career",
        path: "/career/career",
        icon: icons.career,
        isActive: false,
      },
      {
        id: "career-job",
        title: "Job",
        path: "/career/job",
        icon: icons.career,
        isActive: false,
        subNav: [
          {
            id: "career-job-id",
            title: "Edit",
            path: "/career/job/",
            icon: icons.career,
            isActive: false,
          },
          {
            id: "career-job-create",
            title: "Create",
            path: "/career/job/create",
            icon: icons.career,
            isActive: false,
          },
        ],
      },
      {
        id: "career-applicant",
        title: "Applicant",
        path: "/career/applicant",
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
        id: "ecosystem-client",
        title: "Client",
        path: "",
        param: {
          tabStatus: "client",
        },
        icon: icons.ecosystem,
        isActive: false,
      },
      {
        id: "ecosystem-ecosystem",
        title: "Ecosystem",
        path: "",
        param: {
          tabStatus: "ecosystem",
        },
        icon: icons.ecosystem,
        isActive: false,
      },
      {
        id: "ecosystem-partner",
        title: "Partner",
        path: "",
        param: {
          tabStatus: "partner",
        },
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

export default sidebarNavItems;
export type { navItem };
