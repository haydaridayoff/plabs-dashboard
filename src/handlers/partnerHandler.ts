import { AxiosError } from "axios";
import {
  deletePartner,
  getAllPartner,
  postPartner,
  RequestPartnerData,
} from "../backendApi/api/partner";
import { handleAxiosError } from "../utils/errorHandler";

export const handleGetAllPartner = async (
  limit: number,
  page: number,
  signal?: AbortSignal,
) => {
  try {
    const response = await getAllPartner(limit, page, signal);
    return {
      data: response.data,
      paginate: response.paginate,
    };
  } catch (error) {
    let apiErrorDetails;
    if (error instanceof AxiosError) {
      apiErrorDetails = handleAxiosError(error);
    }
    if (apiErrorDetails) {
      throw apiErrorDetails; // Re-throw the API error details
    } else {
      throw { error, severity: "unknown", errorMessage: "An error occurred." }; // Fallback error
    }
  }
};

export const handlePostPartner = async (
  limit: number,
  page: number,
  data: RequestPartnerData,
) => {
  try {
    await postPartner(data);
    const response = await getAllPartner(limit, page);
    return {
      data: response.data,
      paginate: response.paginate,
    };
  } catch (error) {
    let apiErrorDetails;
    if (error instanceof AxiosError) {
      apiErrorDetails = handleAxiosError(error);
    }
    if (apiErrorDetails) {
      throw apiErrorDetails; // Re-throw the API error details
    } else {
      throw { error, severity: "unknown", errorMessage: "An error occurred." }; // Fallback error
    }
  }
};

export const handleDeletePartner = async (
  limit: number,
  page: number,
  id: string,
) => {
  try {
    await deletePartner(id);
    const response = await getAllPartner(limit, page);
    return {
      data: response.data,
      paginate: response.paginate,
    };
  } catch (error) {
    let apiErrorDetails;
    if (error instanceof AxiosError) {
      apiErrorDetails = handleAxiosError(error);
    }
    if (apiErrorDetails) {
      throw apiErrorDetails; // Re-throw the API error details
    } else {
      throw { error, severity: "unknown", errorMessage: "An error occurred." }; // Fallback error
    }
  }
};
