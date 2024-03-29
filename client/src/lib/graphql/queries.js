import { getAccessToken } from "../auth";
import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  createHttpLink,
  gql,
  concat,
} from "@apollo/client";

const httpLink = createHttpLink({ uri: "http://localhost:9000/graphql" });
const authLink = new ApolloLink((operation, forward) => {
  const accesToken = getAccessToken();
  if (accesToken) {
    operation.setContext({
      headers: {
        Authorization: `Bearer ${accesToken}`,
      },
    });
    return;
  }
  return forward(operation);
});
export const apolloClient = new ApolloClient({
  link: concat(authLink, httpLink),
  cache: new InMemoryCache(),
});
const jobDetailFragment = gql`
  fragment JobDetails on Job {
    id
    date
    title
    description
    company {
      id
      name
    }
  }
`;
export const jobByIdQuery = gql`
  query JobById($id: ID!) {
    job(id: $id) {
      ...JobDetails
    }
  }
  ${jobDetailFragment}
`;
export const companyByIdQuery = gql`
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
export const jobsQuery = gql`
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
export const createJobMutation = gql`
  mutation Mutation($input: CreateJobInput) {
    createJob(input: $input) {
      ...JobDetails
    }
  }
  ${jobDetailFragment}
`;
