export type ApiStatus = "IDLE" | "PENDING" | "SUCCESS" | "ERROR";

export const IDLE: ApiStatus = "IDLE";
export const PENDING: ApiStatus = "PENDING";
export const ERROR: ApiStatus = "ERROR";
export const SUCCESS: ApiStatus = "SUCCESS";

export const defaultApiStatus: ApiStatus[] = [
  "ERROR",
  "IDLE",
  "SUCCESS",
  "PENDING",
];

export type ApiStatuses = Record<ApiStatus, ApiStatus>;

export const apiStatus: ApiStatuses = {
  ERROR,
  PENDING,
  SUCCESS,
  IDLE,
};
