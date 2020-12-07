import React, { useState } from "react";
import "./App.css";
import useFetchJobs from "./useFetchJobs";
import { Container } from "react-bootstrap";
import Job from "./components/Job";
import JobsPagination from "./components/JobsPagination";
import SearchForm from "./components/searchForm";

function App() {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);

  function handleParamsChange(e) {
    const params = e.target.name;
    const value = e.target.value;
    setPage(1);
    setParams((prevParams) => {
      return { ...prevParams, [params]: value };
    });
  }

  const { jobs, loading, error, hasNextPage } = useFetchJobs(params, page);
  return (
    <Container className="my-4 ">
      <h1 className="mb-4">Github Jobs</h1>
      <SearchForm params={params} onParamsChange={handleParamsChange} />
      <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
      {loading && (
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )}
      {error && <h1>Error. Plz refresh!</h1>}
      <h1>total jobs : {jobs.length}</h1>
      {jobs.map((job) => {
        return <Job key={job.id} job={job} />;
      })}
    </Container>
  );
}

export default App;
