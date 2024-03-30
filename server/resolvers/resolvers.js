import { getCompany } from "../db/companies.js";
import { notFound, unauthorized } from "./graphqlErrors.js";
import {
  createJob,
  deleteJob,
  getJob,
  getJobs,
  getJobsByCompanyId,
  updateJob,
} from "../db/jobs.js";
//I think it is unnecessary to create a service because the logic is simple, I am also not sure that it makes sense to transfer errors there
export const resolvers = {
  Query: {
    job: async (_root, { id }) => {
      const job = await getJob(id);
      if (!job) {
        throw notFound(`Job with id ${id} not found`);
      }
      return job;
    },
    jobs: (_root, { limit, offset }) => getJobs({ limit, offset }),
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
    company: (job, _args, context) => context.companyLoader.load(job.companyId),
  },
  Mutation: {
    createJob: (root, { input: { title, description } }, { user }) => {
      if (!user) {
        throw unauthorized("Missing authentication");
      }
      return createJob({ companyId: user.companyId, title, description });
    },
    deleteJob: async (_root, { id }) => {
      if (!user) {
        throw unauthorized("Missing authentication");
      }
      const job = deleteJob(id, user.companyId);
      if (!job) {
        throw notFound(`Job with id ${id} not found`);
      }
      return job;
    },
    updateJob: (_root, { id, input }) => {
      if (!user) {
        throw unauthorized("Missing authentication");
      }
      const job = updateJob({ id, ...input, companyId: user.companyId });
      if (!job) {
        throw notFound(`Job with id ${id} not found`);
      }
      return job;
    },
  },
};

function toIsoDate(value) {
  return value.slice(0, "yyyy-mm-dd".length);
}
