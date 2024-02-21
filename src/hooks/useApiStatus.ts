import { useMemo, useState } from "react";
import { IDLE, defaultApiStatus, ApiStatus } from "../api/constants/apiStatus";

// type Statuses = Record<`is${Capitalize<Lowercase<ApiStatus>>}`, boolean>;
type Statuses = Record<`is${Capitalize<Lowercase<ApiStatus>>}`, boolean>;
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const prepareStatuses = (currentStatus: ApiStatus): Statuses => {
  const statuses = {} as Statuses;

  for (const status of defaultApiStatus) {
    const normalisedStatus = capitalize(status.toLowerCase());
    const normalisedStatusKey = `is${normalisedStatus}` as keyof Statuses;

    statuses[normalisedStatusKey] = status === currentStatus;
  }

  // sttauses will be in the below format
  /**
  * 
  *  {
    isIdle:true,
    isPending:false,
    isSuccess:false,
    isError:false
  }
  */
  return statuses;
};

export const useApiStatus = (currentStatus: ApiStatus = IDLE) => {
  const [status, setStatus] = useState<ApiStatus>(currentStatus);

  const statuses = useMemo(() => prepareStatuses(status), [status]);

  return {
    status,
    setStatus,
    ...statuses,
  };
};
