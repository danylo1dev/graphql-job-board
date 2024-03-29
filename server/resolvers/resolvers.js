import {
  getJobs,
  getJob,
  getJobsByCompanyId,
  createJob,
  deleteJob,
  updateJob,
} from "../db/jobs.js";
import { getCompany } from "../db/companies.js";
import { GraphQLError } from "graphql";

export const resolvers = {
  Query: {
    job: async (_root, { id }) => {
      const job = await getJob(id);
      if (!job) {
        throw notFound(`Job with id ${id} not found`);
      }
      return job;
    },
    jobs: () => getJobs(),
    company: async (_root, { id }) => {
      const company = await getCompany(id);
      if (!company) {
        throw notFound(`Company with id ${id} not found`);
      }
      return company;
    },
  },
  Company: {
    jobs: (company) => getJobsByCompanyId(company.id),
  },
  Job: {
    date: (job) => toIsoDate(job.createdAt),
    company: (job) => getCompany(job.companyId),
  },
  Mutation: {
    createJob: (root, { input: { title, description } }) =>
      createJob({ companyId: "FjcJCHJALA4i", title, description }),
    deleteJob: (_root, { id }) => deleteJob(id),
    updateJob: (_root, { id, input }) => updateJob({ id, ...input }),
  },
};

function toIsoDate(value) {
  return value.slice(0, "yyyy-mm-dd".length);
}
function notFound(message) {
  return new GraphQLError(message, {
    extensions: { code: "NOT_FOUND" },
  });
}
