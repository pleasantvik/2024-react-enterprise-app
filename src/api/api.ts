// import the axios object and the AXIOSINSTANCE , AXIOSREQUESTCONFIG type
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const axiosParams = {
  // BaseURL
  baseURL:
    process.env.NODE_ENV === "development" ? "http://localhost:5173" : "/",
};

// Create axios instance with default Parfams

const axiosInstance = axios.create(axiosParams);

axiosInstance.interceptors.request.use(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (config: any) => {
    // This adds an authorization key to config object if a token exists.
    // if (isAuthenticated()) {
    //   config.headers["Authorization"] = `Bearer ${getToken()}`;
    // }
    return config;
  },
  (error) => Promise.reject(error)
);
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => Promise.reject(error)
);

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
