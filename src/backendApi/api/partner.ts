import { AxiosError } from "axios";
import { toFormData } from "../../utils/formDataConverter";
import apiService from "../services/apiService";

interface PartnerData {
  id: number;
  guid: string;
  name: string;
  image: string;
  status: boolean;
}

interface PartnerDataV2 {
  guid: string;
  name: string;
  image: string;
  status: boolean;
}

interface GetAllPartnerResponseData {
  data: PartnerData[];
  error: string;
  message: string;
  paginate: {
    current_page: number;
    limit: number;
    total_page: number;
    total_data: number;
  };
}

interface ResponsePartnerData {
  data: PartnerDataV2;
  error: string;
  message: string;
}

export interface RequestPartnerData {
  name: string;
  file: File;
  status: boolean;
}

export const getAllPartner = async (
  limit: number,
  page: number,
  signal?: AbortSignal,
): Promise<GetAllPartnerResponseData> => {
  try {
    const response = await apiService.get<GetAllPartnerResponseData>(
      "/partner?limit=" + limit + "&page=" + page + "",
      { signal: signal },
    );
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error as AxiosError;
    }
    throw error;
  }
};

export const postPartner = async (
  data: RequestPartnerData,
): Promise<ResponsePartnerData> => {
  try {
    const response = await apiService.post<ResponsePartnerData, FormData>(
      "/partner",
      toFormData(data),
      {
        "Content-Type": "multipart/form-data",
      },
    );
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error as AxiosError;
    }
    throw error;
  }
};

export const deletePartner = async (
  id: string,
): Promise<ResponsePartnerData> => {
  try {
    const response = await apiService.delete<ResponsePartnerData>(
      "/partner/" + id + "",
    );
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error as AxiosError;
    }
    throw error;
  }
};
