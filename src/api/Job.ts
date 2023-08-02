import { faker } from "@faker-js/faker";

export enum status {
  on,
  off,
}

export type jobType = {
  id: string;
  publishDate: Date;
  estimateSalary: string;
  location: string;
  type: string;
  title: string;
  slug: string;
  image: string;
  message: string;
  status: status;
};

// insert comma to indonesian currency format
// input example
// example: Rp1000000 => Rp1,000,000
// example: Rp10000 => Rp10,000
export const formatCurrency = (salary: string) => {
  const number = Number(salary.replace(/[^0-9.-]+/g, ""));
  return "Rp" + number.toLocaleString("id-ID");
};

export const makeDummyJob = (count: number) => {
  const obj: jobType[] = [];
  for (let i = 0; i < count; i++) {
    obj.push({
      id: faker.string.uuid(),
      publishDate: faker.date.past(),
      estimateSalary: formatCurrency(
        faker.finance.amount(1000000, 10000000, 0),
      ),
      location: faker.location.city(),
      type: faker.person.jobType(),
      title: faker.person.jobTitle(),
      slug: faker.lorem.slug(),
      image: faker.image.dataUri({
        width: 100,
        height: 100,
        color: faker.color.human(),
      }),
      message: faker.lorem.paragraph(),
      status: faker.helpers.arrayElement([status.off, status.on]),
    });
  }
  return obj;
};

export const randomJobs = makeDummyJob(100);

export const getJobs = () => {
  return randomJobs.map((job) => {
    return {
      label: job.title,
      value: job,
    };
  });
};

export const getJob = (id: string) => {
  return randomJobs.find((job) => job.id === id);
};

export const editJob = (id: string, job: jobType) => {
  const index = randomJobs.findIndex((job) => job.id === id);
  randomJobs[index] = job;
};

export const deleteJob = (id: string) => {
  const index = randomJobs.findIndex((job) => job.id === id);
  randomJobs.splice(index, 1);
};

export const createJob = (job: jobType) => {
  job.id = faker.string.uuid();
  randomJobs.push(job);
};
