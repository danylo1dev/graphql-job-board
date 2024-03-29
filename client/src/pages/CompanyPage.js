import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getCompany } from "../lib/graphql/queries";
import JobList from "../components/JobList";

function CompanyPage() {
  const { companyId } = useParams();
  const [company, setCompany] = useState();
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const company = await getCompany(companyId);
        setCompany(company);
        isLoading(false);
      } catch (err) {
        isLoading(false);
        setError(err);
      }
    })();
  }, [companyId]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return "Some error";
  }

  return (
    <div>
      <h1 className="title">{company.name}</h1>
      <div className="box">{company.description}</div>
      <h2>Jobs at {company.name}</h2>
      <JobList jobs={company.jobs} />
    </div>
  );
}

export default CompanyPage;
