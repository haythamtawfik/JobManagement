import React, { useState } from "react";
import JobList from "./components/JobList";
const App: React.FC = () => {
  const [refreshJobs, setRefreshJobs] = useState(false);

  const handleJobAdded = () => {
    setRefreshJobs(!refreshJobs); 
  };

  return (
    <div style={{ padding: "20px" }}>
      <JobList/>
    </div>
  );
};

export default App;
