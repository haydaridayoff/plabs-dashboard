import { AxiosError } from "axios";
import apiService from "../services/apiService";

interface JobsData {
  id: string;
  guid: string;
  publish_date: string;
  location: string;
  title: string;
  image: string;
  status: string;
  estimated_salary: string;
  type: string;
  slug: string;
  messages: string;
}

interface GetAllJobResponseData {
  data: JobsData[];
  error: string;
  message: string;
  paginate: {
    current_page: number;
    limit: number;
    total_page: number;
    total_data: number;
  };
}

export const getAllJob = async (): Promise<GetAllJobResponseData> => {
  try {
    const response = await apiService.get<GetAllJobResponseData>("/job");
    return response;
  } catch (error) {
    throw error;
  }
};
