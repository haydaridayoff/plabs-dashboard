import { toFormData } from "../../utils/formDataConverter";
import apiService from "../services/apiService";

interface ServiceData {
  id: number;
  guid: string;
  title: string;
  description: string;
  file: string;
}

export interface ServiceRequestData {
  title: string;
  description: string;
  file: File;
}

interface ServiceResponseData extends ServiceRequestData {
  id: string;
  guid: string;
}

interface GetAllServiceResponseData extends ResponseData, PaginateData {
  data: ServiceResponseData[];
}

interface UpdateServiceResponseData extends ResponseData {
  data: ServiceResponseData;
}

interface DeleteServiceResponseData extends ResponseData {
  data: {
    guid: string;
    title: string;
  };
}

interface ResponseData {
  error: string;
  message: string;
}

interface PaginateData {
  paginate: {
    current_page: number;
    limit: number;
    total_page: number;
    total_data: number;
  };
}

export const getAllService = async (): Promise<GetAllServiceResponseData> => {
  try {
    const response = await apiService.get<GetAllServiceResponseData>(
      "/service",
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteService = async (id: string) => {
  try {
    const response = await apiService.delete<DeleteServiceResponseData>(
      `/service/${id}`,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateService = async (id: string, data: ServiceRequestData) => {
  try {
    const response = await apiService.put<
      UpdateServiceResponseData,
      ServiceRequestData
    >(`/service/${id}`, data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const postService = async (data: ServiceRequestData) => {
  try {
    const response = await apiService.post<UpdateServiceResponseData, unknown>(
      "/service",
      toFormData(data),
      {
        "Content-Type": "multipart/form-data",
      },
    );
    return response;
  } catch (error) {
    throw error;
  }
};
