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
function notFound(message) {
  return new GraphQLError(message, {
    extensions: { code: "NOT_FOUND" },
  });
}
function unauthorized(message) {
  return new GraphQLError(message, {
    extensions: { code: "UNAUTHARIZED" },
  });
}
