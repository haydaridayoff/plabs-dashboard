import { faker } from "@faker-js/faker";
import { getBlankJob, getJobs, jobType } from "./Job";

export type applicantType = {
  id: string;
  name: string;
  birthDate: Date;
  applyDate: Date;
  email: string;
  phone: string;
  address: string;
  cvLink: string;
  linkedinUrl: string;
  portofolioUrl: string;
  job: jobType;
  status: applicantStatus;
};

export enum applicantStatus {
  on,
  off,
}

export const getBlankApplicant = (): applicantType => {
  return {
    id: "",
    name: "",
    birthDate: new Date(),
    applyDate: new Date(),
    email: "",
    phone: "",
    address: "",
    cvLink: "",
    linkedinUrl: "",
    portofolioUrl: "",
    job: getBlankJob(),
    status: applicantStatus.off,
  };
};

export const makeDummyApplicants = (count: number) => {
  const obj: applicantType[] = [];
  for (let i = 0; i < count; i++) {
    obj.push({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      birthDate: faker.date.past(),
      applyDate: faker.date.past(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      address: faker.location.streetAddress(),
      cvLink: faker.internet.url(),
      linkedinUrl: faker.internet.url(),
      portofolioUrl: faker.internet.url(),
      job: getJobs()[faker.number.int({ min: 0, max: 50 })].value,
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

export const getApplicantById = (id: string) => {
  //return format { label: string, value: applicantType }
  const applicant = randomApplicants.find((item) => item.id === id);
  if (applicant) {
    return {
      label: applicant.name,
      value: applicant,
    };
  }
};

export const createApplicant = (item: applicantType) => {
  item.id = faker.string.uuid();
  randomApplicants.unshift(item);
};

export const updateApplicant = (item: applicantType) => {
  const index = randomApplicants.findIndex(
    (applicant) => applicant.id === item.id,
  );
  if (index !== -1) {
    randomApplicants[index] = item;
  }
};

export const deleteApplicant = (id: string) => {
  const index = randomApplicants.findIndex((applicant) => applicant.id === id);
  if (index !== -1) {
    randomApplicants.splice(index, 1);
  }
};
