// apiService.ts
import axios, { AxiosResponse } from "axios";
import { getAccessToken } from "../../utils/tokenManager";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // Your API base URL
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken(); // Replace with your method to get the access token
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

interface Headers {
  [key: string]: string;
}

const apiService = {
  get: async <T>(endpoint: string, headers?: Headers): Promise<T> => {
    const response: AxiosResponse<T> = await instance.get(endpoint, {
      headers: headers || {},
    });
    return response.data;
  },
  post: async <TResponse, TData>(
    endpoint: string,
    data: TData,
    headers?: Headers,
  ): Promise<TResponse> => {
    const response: AxiosResponse<TResponse> = await instance.post(
      endpoint,
      data,
      {
        headers: headers || {},
      },
    );
    return response.data;
  },
  delete: async <T>(endpoint: string, headers?: Headers): Promise<T> => {
    const response: AxiosResponse<T> = await instance.delete(endpoint, {
      headers: headers || {},
    });
    return response.data;
  },
  put: async <TResponse, TData>(
    endpoint: string,
    data: TData,
    headers?: Headers,
  ): Promise<TResponse> => {
    const response: AxiosResponse<TResponse> = await instance.put(
      endpoint,
      data,
      {
        headers: headers || {},
      },
    );
    return response.data;
  },
};

export default apiService;
