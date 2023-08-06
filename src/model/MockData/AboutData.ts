import { faker } from "@faker-js/faker";
import { getEcosystems } from "../../api/Ecosystem";
import { getPartner } from "../../api/Partner";
import { getPeople } from "../../api/People";
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
  //get 50 random ecosystem
  const ecosystem = getEcosystems();
  const obj: ecosystemTabType[] = [];
  faker.helpers
    .shuffle(ecosystem)
    .slice(0, 50)
    .forEach((item) => {
      obj.push({
        id: item.value.id,
        name: item.value.name,
        image: item.value.file.src,
      });
    });
  return obj;
};

const makeDummyPartner = () => {
  const obj: partnerTabType[] = [];
  faker.helpers
    .shuffle(getPartner())
    .slice(0, 50)
    .forEach((item) => {
      obj.push({
        id: item.value.id,
        name: item.value.name,
        image: item.value.logo.src,
      });
    });
  return obj;
};

const makeDummyPeople = () => {
  const obj: peopleTabType[] = [];
  faker.helpers
    .shuffle(getPeople())
    .slice(0, 50)
    .forEach((item) => {
      obj.push({
        id: item.value.id,
        name: item.value.name,
        occupation: item.value.occupation,
        image: item.value.photo.src,
      });
    });
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
