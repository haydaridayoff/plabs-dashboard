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

const homeData = {
  hero: "We are on a mission to evolve your business by simplifying every development process on all touchpoint.",
  section1: {
    title: "About Us",
    description:
      "Specialize in delivering innovative and scalable creative & technology solutions in simplest way. We're the creative, the scientist, the engineer, and the geeks.",
    file: {
      type: "image",
      src: images.logoHitam183,
    },
  },
};

export default homeData;
