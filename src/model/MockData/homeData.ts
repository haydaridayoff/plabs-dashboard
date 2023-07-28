import { faker } from "@faker-js/faker";
import { getProject } from "../../api/Project";
import images from "../../assets/images/images";

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
    title: string;
    image: string;
  }[];
};

const makeDummyProject = () => {
  //get random 50 project
  console.log("getRandomProject");
  const projects = getProject().map((project) => project.value);
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

const dummyProject = makeDummyProject();

export const deleteHomeProject = (id: string) => {
  homeData.projects = homeData.projects.filter((project) => project.id !== id);
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
  clients: makeDummyProject(),
};

console.log("homeData", homeData);

export default homeData;
