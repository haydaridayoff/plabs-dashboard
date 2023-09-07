import { AxiosError } from "axios";
import { getAllJob } from "../backendApi/api/job";
import { handleAxiosError } from "../utils/errorHandler";

export const handleGetAllJob = async () => {
  try {
    const response = await getAllJob();
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
