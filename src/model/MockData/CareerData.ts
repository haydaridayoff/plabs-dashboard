import { faker } from "@faker-js/faker";
import { getApplicants } from "../../api/Applicant";
import { getJobs, status as jobStatus } from "../../api/Job";

export type careerTypeData = {
  id: string;
  title: string;
  file: {
    type: string;
    src: string;
  };
};

export enum applicantStatus {
  on,
  off,
}

type jobTabsData = {
  id: string;
  publishDate: string;
  estimateSalary: string;
  location: string;
  type: string;
  title: string;
  slug: string;
  image: string;
  messageToApplicant: string;
  status: jobStatus;
};

type applicantTabsData = {
  id: string;
  name: string;
  birthDate: string;
  email: string;
  phone: string;
  address: string;
  cvLink: string;
  linkedInUrl: string;
  portofolioUrl: string;
  job: string;
  status: applicantStatus;
};

export const careerData: careerTypeData = {
  id: faker.string.uuid(),
  title: "Career",
  file: {
    type: "image",
    src: faker.image.dataUri({
      width: 100,
      height: 100,
      color: faker.color.human(),
    }),
  },
};

export const getDummyJobs = () => {
  const obj: jobTabsData[] = [];
  faker.helpers
    .shuffle(getJobs())
    .slice(0, 50)
    .forEach((job) => {
      obj.push({
        id: job.value.id,
        publishDate: job.value.publishDate.toLocaleDateString(undefined, {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
        estimateSalary: job.value.estimateSalary,
        location: job.value.location,
        type: job.value.type,
        title: job.value.title,
        slug: job.value.slug,
        image: job.value.image,
        messageToApplicant: job.value.message,
        status: job.value.status,
      });
    });
  return obj;
};

export const getDummyApplicants = () => {
  const obj: applicantTabsData[] = [];
  faker.helpers
    .shuffle(getApplicants())
    .slice(0, 50)
    .forEach((applicant) => {
      obj.push({
        id: applicant.value.id,
        name: applicant.value.name,
        birthDate: applicant.value.birthDate.toLocaleDateString(undefined, {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
        email: applicant.value.email,
        phone: applicant.value.phone,
        address: applicant.value.address,
        cvLink: applicant.value.cvLink,
        linkedInUrl: applicant.value.linkedinUrl,
        portofolioUrl: applicant.value.portofolioUrl,
        job: applicant.value.job,
        status: applicant.value.status,
      });
    });
  return obj;
};

export const jobsData: jobTabsData[] = getDummyJobs();

export const applicantsData: applicantTabsData[] = getDummyApplicants();
