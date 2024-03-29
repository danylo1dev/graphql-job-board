import { getJobs, getJob } from "../db/jobs.js";
import { getCompany } from "../db/companies.js";

export const resolvers = {
  Query: {
    job: async (_root, { id }) => await getJob(id),
    jobs: () => getJobs(),
    company: (_root, { id }) => getCompany(id),
  },
  Job: {
    date: (job) => toIsoDate(job.createdAt),
    company: (job) => getCompany(job.companyId),
  },
};

function toIsoDate(value) {
  return value.slice(0, "yyyy-mm-dd".length);
}
