import axios from "axios";
import { Job } from "./types";

const API_BASE_URL = "https://localhost:7115/api";

export const fetchJobs = async (): Promise<Job[]> => {
  const response = await axios.get(`${API_BASE_URL}/jobs`);
  return response.data;
};

export const addJob = async (job: Job): Promise<Job> => {
  const response = await axios.post(`${API_BASE_URL}/jobs`, job);
  return response.data;
};
