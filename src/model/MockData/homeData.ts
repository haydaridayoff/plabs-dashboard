import { faker } from "@faker-js/faker";
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
};

const makeDummyProject = () => {
  const obj = [];
  for (let i = 0; i < 100; i++) {
    obj.push({
      title: faker.hacker.phrase(),
      image: faker.image.dataUri({
        width: 640,
        height: 640,
        color: faker.color.human(),
      }),
    });
  }
  return obj;
};

const homeData = {
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
  Project: makeDummyProject(),
};

export default homeData;
