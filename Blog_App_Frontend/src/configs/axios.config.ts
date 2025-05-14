import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const api = {
  get: <T>(
    endpoint: string,
    config: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> => apiClient.get(endpoint, config),

  post: <T, B>(
    endpoint: string,
    body: B,
    config: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> => apiClient.post(endpoint, body, config),

  put: <T, B>(
    endpoint: string,
    body?: B,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> => apiClient.put(endpoint, body, config),

  delete: <T>(
    endpoint: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> => apiClient.delete(endpoint, config),
};
