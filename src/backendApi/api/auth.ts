// authService.ts
import { AxiosError } from "axios";
import { getAccessToken } from "../../utils/tokenManager";
import apiService from "../services/apiService";

export interface LoginResponse {
  data: {
    access_token: string;
    refresh_token: string;
  };
  message: string;
  error: string;
}

export interface LogoutResponse {
  data: null;
  message: string;
  error: string;
}

export const login = async (
  email: string,
  password: string,
): Promise<LoginResponse> => {
  try {
    const response = await apiService.post<LoginResponse>("/auth/login", {
      email,
      password,
    });
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error as AxiosError;
    }
    throw error;
  }
};

export const logout = async (): Promise<LogoutResponse> => {
  try {
    const response = await apiService.post<LogoutResponse>(
      "/auth/logout",
      null,
    );
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error as AxiosError;
    }
    throw error;
  }
};
