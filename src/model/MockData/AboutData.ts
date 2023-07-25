import { faker } from "@faker-js/faker";
import images from "../../assets/images/images";

export type aboutTabType = {
  about: {
    title: string;
    description: string;
    file: {
      type: string;
      src: string;
    };
  };
  hero: string;
  solution: string;
  ecosystem: string;
  partner: string;
  people: string;
};

export type ecosystemTabType = {
  id: string;
  name: string;
  image: string;
};

export type partnerTabType = {
  id: string;
  name: string;
  image: string;
};

export type peopleTabType = {
  id: string;
  name: string;
  occupation: string;
  image: string;
};

const makeDummyEcosystem = () => {
  const obj: ecosystemTabType[] = [];
  for (let i = 0; i < 100; i++) {
    obj.push({
      id: faker.string.uuid(),
      name: faker.location.country(),
      image: faker.image.dataUri({
        width: 640,
        height: 640,
        color: faker.color.human(),
      }),
    });
  }
  return obj;
};

const makeDummyPartner = () => {
  const obj: partnerTabType[] = [];
  for (let i = 0; i < 100; i++) {
    obj.push({
      id: faker.string.uuid(),
      name: faker.company.name(),
      image: faker.image.dataUri({
        width: 640,
        height: 640,
        color: faker.color.human(),
      }),
    });
  }
  return obj;
};

const makeDummyPeople = () => {
  const obj: peopleTabType[] = [];
  for (let i = 0; i < 100; i++) {
    obj.push({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      occupation: faker.person.jobTitle(),
      image: faker.image.dataUri({
        width: 640,
        height: 640,
        color: faker.color.human(),
      }),
    });
  }
  return obj;
};

export const aboutTabData: aboutTabType = {
  about: {
    title: "One Stop Creative - Tech Solution",
    description:
      "Amazing things never come with ease and we believe in it. PLABS.ID strongly believes that passion is the fuel to create something amazing; think creatively, critically & empathetically; and build the solution with the simplest deliverable with the objective to elevate and transform your business.",
    file: {
      type: "image",
      src: faker.image.dataUri({
        width: 640,
        height: 640,
        color: faker.color.human(),
      }),
    },
  },
  hero: "We bring the value of digital-first approach to every strategic and creative development",
  solution: "Digital Transformation is an absolute necessity",
  ecosystem: "Our Ecosystem",
  partner: "Friends We've Made Along the Process",
  people: "We Build Amazing Things with Amazing People",
};

export const ecosystemTabData: ecosystemTabType[] = makeDummyEcosystem();
export const partnerTabData: partnerTabType[] = makeDummyPartner();
export const peopleTabData: peopleTabType[] = makeDummyPeople();
