import api from "./api";

const URLS = {
  login: "v1/login",
  register: "v1/register",
  verify: "v1/verify",
};

export type AuthApiData = {
  message: string;
  status: "success" | "pending" | "error";
  data: {
    name: string;
  };
};

export const login = () => {
  api.post<AuthApiData>(URLS.login, {
    baseURL: "http://localhost:5173",
  });
};
