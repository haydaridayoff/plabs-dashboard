import { AxiosError } from "axios";
import { getAllService } from "../backendApi/api/service";
import { handleAxiosError } from "../utils/errorHandler";

export const handleGetAllService = async () => {
  try {
    const response = await getAllService();
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
