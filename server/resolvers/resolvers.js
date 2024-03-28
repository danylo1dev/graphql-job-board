import { getJobs, getJob } from "../db/jobs.js";
import { getCompany } from "../db/companies.js";

export const resolvers = {
  Query: {
    job: async (_root, { id }) => {
      console.log(id);
      const job = await getJob(id);
      console.log(job);
      return job;
    },
    jobs: () => getJobs(),
  },
  Job: {
    date: (job) => toIsoDate(job.createdAt),
    company: (job) => getCompany(job.companyId),
  },
};

function toIsoDate(value) {
  return value.slice(0, "yyyy-mm-dd".length);
}
