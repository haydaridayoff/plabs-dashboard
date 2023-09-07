// loginHandler.ts
import { AxiosError } from "axios";
import { login } from "../backendApi/api/auth";
import { handleAxiosError } from "../utils/errorHandler";
import { setAccessToken } from "../utils/tokenManager";

export const handleLogin = async (
  username: string,
  password: string,
): Promise<void> => {
  try {
    const response = await login(username, password);
    setAccessToken(response.data.access_token);
    // Successful login logic (e.g., redirect to dashboard)
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
