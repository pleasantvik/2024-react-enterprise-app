import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const axiosParams = {
  // BaseURL
  baseURL:
    process.env.NODE_ENV === "development" ? "http://localhost:5173" : "/",
};

// Create axios instance with default Parfams

const axiosInstance = axios.create(axiosParams);

// Create the main Api function

const api = (axios: AxiosInstance) => {
  return {
    get: <T>(url: string, config: AxiosRequestConfig = {}) =>
      axios.get<T>(url, config),
    delete: <T>(url: string, config: AxiosRequestConfig = {}) =>
      axios.delete<T>(url, config),
    post: <U>(url: string, config: AxiosRequestConfig = {}) =>
      axios.post<U>(url, config),
    patch: <T>(url: string, config: AxiosRequestConfig = {}) =>
      axios.patch<T>(url, config),
    put: <T>(url: string, config: AxiosRequestConfig = {}) =>
      axios.put<T>(url, config),
  };
};

export default api(axiosInstance);
