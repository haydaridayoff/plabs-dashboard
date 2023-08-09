import { faker } from "@faker-js/faker";
import { ecosystemType, getEcosystems } from "../../api/Ecosystem";
import { getPartner, partnerType } from "../../api/Partner";
import { getPeople, personType } from "../../api/People";

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

const convertToEcosystemTab = (item: ecosystemType) => {
  const tabItem: ecosystemTabType = {
    id: item.id,
    name: item.name,
    image: item.file.src,
  };
  return tabItem;
};

const convertToPartnerTab = (item: partnerType) => {
  const tabItem: partnerTabType = {
    id: item.id,
    name: item.name,
    image: item.logo.src,
  };
  return tabItem;
};

const convertToPeopleTab = (item: personType) => {
  const tabItem: peopleTabType = {
    id: item.id,
    name: item.name,
    occupation: item.occupation,
    image: item.photo.src,
  };
  return tabItem;
};

export const addEcosystemTabData = (item: ecosystemType) => {
  const tabItem: ecosystemTabType = {
    id: item.id,
    name: item.name,
    image: item.file.src,
  };
  ecosystemTabData.unshift(tabItem);
};

export const addPartnerTabData = (item: partnerType) => {
  const tabItem: partnerTabType = {
    id: item.id,
    name: item.name,
    image: item.logo.src,
  };

  partnerTabData.unshift(tabItem);
};

export const addPeopleTabData = (item: personType) => {
  const tabItem: peopleTabType = {
    id: item.id,
    name: item.name,
    occupation: item.occupation,
    image: item.photo.src,
  };

  peopleTabData.unshift(tabItem);
};

export const updateEcosystemTabData = (item: ecosystemType) => {
  const tabItem = convertToEcosystemTab(item);
  const index = ecosystemTabData.findIndex((data) => data.id === tabItem.id);
  ecosystemTabData[index] = tabItem;
};

export const updatePartnerTabData = (item: partnerType) => {
  const tabItem = convertToPartnerTab(item);
  const index = partnerTabData.findIndex((data) => data.id === tabItem.id);
  partnerTabData[index] = tabItem;
};

export const updatePeopleTabData = (item: personType) => {
  const tabItem = convertToPeopleTab(item);
  const index = peopleTabData.findIndex((data) => data.id === tabItem.id);
  peopleTabData[index] = tabItem;
};

export const deleteEcosystemTabData = (id: string) => {
  const index = ecosystemTabData.findIndex((data) => data.id === id);
  ecosystemTabData.splice(index, 1);
};

export const deletePartnerTabData = (id: string) => {
  const index = partnerTabData.findIndex((data) => data.id === id);
  partnerTabData.splice(index, 1);
};

export const deletePeopleTabData = (id: string) => {
  const index = peopleTabData.findIndex((data) => data.id === id);
  peopleTabData.splice(index, 1);
};
