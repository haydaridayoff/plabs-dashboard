import { faker } from "@faker-js/faker";
import { getClients } from "../../api/Clients";
import { getProjects } from "../../api/Project";

export type homeType = {
  hero: string;
  section1: {
    title: string;
    description: string;
    file: {
      type: string;
      src: string;
    };
  };
  section2: {
    title: string;
    description: string;
    file: {
      type: string;
      src: string;
    };
  };
  solutions: {
    title: string;
    description: string;
  };
  brands: {
    title: string;
    file: {
      type: string;
      src: string;
    };
  };
  latestWork: string;
  projects: {
    id: string;
    title: string;
    image: string;
  }[];
  clients: {
    id: string;
    name: string;
    image: string;
  }[];
};

const makeDummyProject = () => {
  //get random 50 project
  const projects = getProjects().map((project) => project.value);
  const randomProjects = faker.helpers.shuffle(projects).slice(0, 50);
  return [
    ...randomProjects.map((project) => {
      return {
        id: project.id,
        title: project.title,
        image: project.file.src,
      };
    }),
  ];
};

const makeDummyClients = () => {
  const clients = getClients().map((client) => client.value);
  const randomClients = faker.helpers.shuffle(clients).slice(0, 50);
  return [
    ...randomClients.map((client) => {
      return {
        id: client.id,
        name: client.name,
        image: client.file.src,
      };
    }),
  ];
};

const dummyProject = makeDummyProject();
const dummyClients = makeDummyClients();

export const addHomeProject = (item: {
  id: string;
  title: string;
  image: string;
}) => {
  homeData.projects.push(item);
};

export const addHomeClient = (item: {
  id: string;
  name: string;
  image: string;
}) => {
  homeData.clients.push(item);
};

export const deleteHomeProject = (id: string) => {
  homeData.projects = homeData.projects.filter((project) => project.id !== id);
};

export const deleteHomeClient = (id: string) => {
  homeData.clients = homeData.clients.filter((client) => client.id !== id);
};

export const editHomeProject = (
  id: string,
  item: {
    title: string;
    image: string;
  },
) => {
  const index = homeData.projects.findIndex((project) => project.id === id);
  homeData.projects[index].title = item.title;
  homeData.projects[index].image = item.image;
};

export const editHomeClient = (
  id: string,
  item: {
    name: string;
    image: string;
  },
) => {
  const index = homeData.clients.findIndex((client) => client.id === id);
  homeData.clients[index].name = item.name;
  homeData.clients[index].image = item.image;
};

const homeData: homeType = {
  hero: "We are on a mission to evolve your business by simplifying every development process on all touchpoint.",
  section1: {
    title: "About Us",
    description:
      "Specialize in delivering innovative and scalable creative & technology solutions in simplest way. We're the creative, the scientist, the engineer, and the geeks.",
    file: {
      type: "video",
      src: "https://www.youtube.com/watch?v=BvPwKtAAJ_M",
    },
  },
  section2: {
    title: "Our Services",
    description:
      "We discover and execute transformations by bringing a diverse skill set with impressive experiences in creative & technology solutions. We deliver the simplest and the fittest solution for even the most complicated business problems.",
    file: {
      type: "image",
      src: faker.image.dataUri({
        width: 640,
        height: 640,
        color: faker.color.human(),
      }),
    },
  },
  solutions: {
    title: "Our Solutions",
    description:
      "We combine your expectations & imaginations with our expertise to help you succeed on creating an immersive and a unique digital experience to enhance your business value.",
  },
  brands: {
    title: "Our Brands",
    file: {
      type: "image",
      src: faker.image.dataUri({
        width: 640,
        height: 640,
        color: faker.color.human(),
      }),
    },
  },
  latestWork: "Recent Works",
  projects: dummyProject,
  clients: dummyClients,
};

export default homeData;
