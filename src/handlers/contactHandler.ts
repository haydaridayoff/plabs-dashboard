import { AxiosError } from "axios";
import {
  ContactRequestData,
  deleteContact,
  getAllContact,
  updateContact,
} from "../backendApi/api/contact";
import { handleAxiosError } from "../utils/errorHandler";

export const handleGetAllContact = async (
  limit: number,
  page: number,
  signal?: AbortSignal,
) => {
  try {
    const response = await getAllContact(limit, page, signal);
    return {
      data: response.data,
      paginate: response.paginate,
      message: response.message,
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

export const handleDeleteContact = async (
  id: string,
  limit: number,
  page: number,
) => {
  try {
    await deleteContact(id);
    const response = await getAllContact(limit, page);
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

export const handleUpdateContact = async (
  id: string,
  data: ContactRequestData,
  limit: number,
  page: number,
) => {
  try {
    await updateContact(id, data);
    const response = await getAllContact(limit, page);
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
