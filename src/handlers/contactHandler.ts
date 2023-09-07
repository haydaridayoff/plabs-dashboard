import { AxiosError } from "axios";
import { deleteContact, getAllContact } from "../backendApi/api/contact";
import { handleAxiosError } from "../utils/errorHandler";

export const handleGetAllContact = async () => {
  try {
    const response = await getAllContact();
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

export const handleDeleteContact = async (id: string) => {
  try {
    await deleteContact(id);
    const response = await getAllContact();
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
