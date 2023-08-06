import { faker } from "@faker-js/faker";

export type journalType = {
  id: string;
  title: string;
  publishDate: Date;
  subtitle: string;
  image: string;
};

export type journalDataType = {
  hero: string;
};

export const journalData: journalDataType = {
  hero: faker.lorem.sentence(),
};

const createRandomJournals = (count: number) => {
  const obj: journalType[] = [];
  for (let i = 0; i < count; i++) {
    obj.push({
      id: faker.string.uuid(),
      title: faker.lorem.sentence(),
      publishDate: faker.date.past(),
      subtitle: faker.lorem.paragraph(),
      image: faker.image.dataUri({
        width: 100,
        height: 100,
        color: faker.color.human(),
      }),
    });
  }
  return obj;
};

const randomJournals = createRandomJournals(100);

export const getJournals = () => {
  return randomJournals.map((journal) => {
    return {
      label: journal.title,
      value: journal,
    };
  });
};

export const getJournalById = (id: string) => {
  //return format { label: string, value: journalType }
  const journal = randomJournals.find((item) => item.id === id);
  if (journal) {
    return {
      label: journal.title,
      value: journal,
    };
  }
};

export const updateJournal = (data: journalType) => {
  const index = randomJournals.findIndex((item) => item.id === data.id);
  if (index !== -1) {
    randomJournals[index] = data;
  }
};

export const deleteJournal = (id: string) => {
  const index = randomJournals.findIndex((item) => item.id === id);
  if (index !== -1) {
    randomJournals.splice(index, 1);
  }
};

export const createJournal = (data: journalType) => {
  data.id = faker.string.uuid();
  randomJournals.push(data);
};
