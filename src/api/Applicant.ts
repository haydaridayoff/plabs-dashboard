import { faker } from "@faker-js/faker";

export type applicantType = {
  id: string;
  name: string;
  birthDate: Date;
  email: string;
  phone: string;
  address: string;
  cvLink: string;
  linkedinUrl: string;
  portofolioUrl: string;
  job: string;
  status: applicantStatus;
};

export enum applicantStatus {
  on,
  off,
}

export const makeDummyApplicants = (count: number) => {
  const obj: applicantType[] = [];
  for (let i = 0; i < count; i++) {
    obj.push({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      birthDate: faker.date.past(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      address: faker.location.streetAddress(),
      cvLink: faker.internet.url(),
      linkedinUrl: faker.internet.url(),
      portofolioUrl: faker.internet.url(),
      job: faker.person.jobTitle(),
      status: faker.number.int({ min: 0, max: 1 }),
    });
  }
  return obj;
};

const randomApplicants = makeDummyApplicants(100);

export const getApplicants = () => {
  return randomApplicants.map((applicant) => {
    return {
      label: applicant.name,
      value: applicant,
    };
  });
};
