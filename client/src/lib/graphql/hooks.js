import { useQuery, useMutation } from "@apollo/client";
import {
  jobsQuery,
  companyByIdQuery,
  jobByIdQuery,
  createJobMutation,
} from "./queries";

export function useCompany(id) {
  const { data, loading, error } = useQuery(companyByIdQuery, {
    id,
  });
  return { company: data?.company, loading, error };
}
export function useJob(id) {
  const { data, loading, error } = useQuery(jobByIdQuery, {
    id,
  });
  return { job: data?.job, loading, error };
}
export function useJobs() {
  const { data, loading, error } = useQuery(jobsQuery, {
    fetchPolicy: "network-only",
  });
  return { job: data?.jobs, loading, error };
}
export function useCreateJob() {
  const [mutate, { loading }] = useMutation(createJobMutation);
  const createJob = async ({ title, description }) => {
    const {
      data: { job },
    } = await mutate({
      variables: {
        input: { title, description },
      },
      update: (cache, { data }) => {
        cache.writeQuery({
          query: jobByIdQuery,
          variables: { id: data.job.id },
          data,
        });
      },
    });
    return job;
  };
  return {
    createJob,
    loading,
  };
}
