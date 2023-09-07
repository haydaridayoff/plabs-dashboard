import { AxiosError } from "axios";
import { getAllPartner } from "../backendApi/api/partner";
import { handleAxiosError } from "../utils/errorHandler";

export const handleGetAllPartner = async () => {
  try {
    const response = await getAllPartner();
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
