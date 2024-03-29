import { GraphQLClient, gql } from "graphql-request";
import { getAccessToken } from "../auth";

const client = new GraphQLClient("http://localhost:9000/graphql", {
  headers: () => {
    const accesToken = getAccessToken();
    if (accesToken) {
      return {
        Authorization: `Bearer ${accesToken}`,
      };
    }
    return {};
  },
});

export async function createJob(input) {
  const mutation = gql`
    mutation Mutation($input: CreateJobInput) {
      createJob(input: $input) {
        id
      }
    }
  `;
  const { job } = await client.request(mutation, { input });
  return job;
}
export async function getJobs() {
  const query = gql`
    query {
      jobs {
        id
        title
        date
        company {
          id
          name
        }
      }
    }
  `;

  const { jobs } = await client.request(query);
  return jobs;
}
export async function getJob(id) {
  const query = gql`
    query JobById($id: ID!) {
      job(id: $id) {
        id
        title
        date
        description
        company {
          id
          name
        }
      }
    }
  `;

  const { job } = await client.request(query, { id });
  return job;
}
export async function getCompany(id) {
  const query = gql`
    query CompanyById($id: ID!) {
      company(id: $id) {
        description
        name
        jobs {
          id
          title
          description
          date
        }
      }
    }
  `;

  const { company } = await client.request(query, { id });
  return company;
}
