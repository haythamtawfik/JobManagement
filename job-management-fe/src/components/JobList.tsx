import React, { useEffect, useState } from "react";
import { fetchJobs, addJob } from "../api";
import { Job } from "../types";
import AddJobForm from "./AddJobForm"; // Import AddJobForm
import "./JobList.css";
import { Button } from "@mui/material";

const JobList: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [showAddJobForm, setShowAddJobForm] = useState<boolean>(false);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const data = await fetchJobs();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    loadJobs();
  }, []);

  const handleAddJob = async (job: Job) => {
    try {
      const newJob = await addJob(job);
      setJobs((prevJobs) => [...prevJobs, newJob]); 
      setShowAddJobForm(false);
    } catch (error) {
      console.error("Error adding job:", error);
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
        case "Pending":
          return "#80D462";
        case "InProgress":
          return "#E6FE6E"; 
        case "Completed":
          return "#FAFFE1"; 
      default:
        return "#FFFFFF"; 
    }
  };

  return (
    <div className="job-list-container">
      <h1 className="header">Alspec Products</h1>
      {!showAddJobForm && (
        <Button
            variant="contained"
            sx={{
                backgroundColor: "#8ED973",
                "&:hover": {
                  backgroundColor: "darkgreen",
                },
                margin: "20px 0",
              }}
            onClick={() => setShowAddJobForm(true)}
        >
            Add Job
        </Button>
      )}
      {showAddJobForm && (
        <AddJobForm
          onJobAdded={handleAddJob}
          onCancel={() => setShowAddJobForm(false)}
        />
      )}
      <table className="job-table">
        <thead>
          <tr>
            <th>JobId</th>
            <th>Title</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <React.Fragment key={job.id}>
              <tr className="job-row">
                <td>{job.id}</td>
                <td>{job.title}</td>
                <td>{job.description}</td>
              </tr>
              {job.subItems.map((subItem) => (
                <tr
                  key={subItem.itemId}
                  style={{
                    backgroundColor: getStatusColor(subItem.status),
                  }}
                >
                  <td colSpan={3}>
                    <div className="sub-item">
                      <p><strong>ItemId:</strong> {subItem.itemId}</p>
                      <p><strong>Title:</strong> {subItem.title}</p>
                      <p><strong>Description:</strong> {subItem.description}</p>
                      <p><strong>Status:</strong> {subItem.status}</p>
                    </div>
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobList;
