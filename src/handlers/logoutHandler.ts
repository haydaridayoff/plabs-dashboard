import { AxiosError } from "axios";
import { logout } from "../backendApi/apiHandlers/auth";
import { handleAxiosError } from "../utils/errorHandler";
import { clearAccessToken } from "../utils/tokenManager";

const handleLogout = async () => {
  try {
    await logout();
    clearAccessToken();
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

export default handleLogout;
