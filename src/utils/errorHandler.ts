import { AxiosError } from "axios";
import { errorMessages } from "./errorMessages";

export interface ErrorDetails {
  error: ErrorResponse;
  severity: string;
  errorMessage: string;
}

export interface ErrorResponse extends Error {
  statusCode?: number;
}

export const createResponseError = (response: AxiosError): ErrorResponse => {
  return {
    name: response.name,
    message: response.message,
    statusCode: response.response?.status,
  };
};

export const getErrorSeverity = (statusCode: number): string => {
  if (statusCode >= 500) {
    return "high"; // Server error
  } else if (statusCode >= 400) {
    return "medium"; // Client error
  } else {
    return "low"; // Other errors
  }
};

export const getErrorMessage = (statusCode: number): string => {
  const errorMessage = errorMessages.find(
    (error) => error.status === statusCode,
  );
  return errorMessage ? errorMessage.message : "An error occurred.";
};

export const handleApiError = (
  error: ErrorResponse,
): ErrorDetails | undefined => {
  if (error.statusCode && error.message) {
    const statusCode = error.statusCode;
    const severity = getErrorSeverity(statusCode);
    const errorMessage = getErrorMessage(statusCode);
    return { error: error as ErrorResponse, severity, errorMessage };
    // You can also log the error or perform other actions based on the severity
  }

  return undefined;
};

export const handleAxiosError = (
  axiosError: AxiosError,
): ErrorDetails | undefined => {
  const error = createResponseError(axiosError);
  return handleApiError(error);
};
