import { AxiosError } from "axios";
import apiService from "../services/apiService";

interface ContactData {
  id: number;
  guid: string;
  date: string;
  name: string;
  email: string;
  messages: string;
}

interface GetAllContactResponseData {
  data: ContactData[];
  error: string;
  message: string;
  paginate: {
    current_page: number;
    limit: number;
    total_page: number;
    total_data: number;
  };
}

export interface ContactRequestData {
  date: string;
  name: string;
  email: string;
  messages: string;
}

export const getAllContact = async (
  limit: number,
  page: number,
  signal?: AbortSignal,
): Promise<GetAllContactResponseData> => {
  try {
    const response = await apiService.get<GetAllContactResponseData>(
      "/contact?limit=" + limit + "&page=" + page + "",
    );
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error as AxiosError;
    }
    throw error;
  }
};

export const deleteContact = async (id: string) => {
  try {
    const response = await apiService.delete(`/contact/${id}`);
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error as AxiosError;
    }
    throw error;
  }
};

export const updateContact = async (id: string, data: ContactRequestData) => {
  try {
    console.log("data", data);
    const response = await apiService.put(`/contact/${id}`, data);
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error as AxiosError;
    }
    throw error;
  }
};
