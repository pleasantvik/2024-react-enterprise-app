import { useEffect, useState, useCallback } from "react";
import { fetchDog } from "../api/animalApi";
import { withAsync } from "../helpers/withAsync";
import {
  // ApiStatus,
  ERROR,
  IDLE,
  PENDING,
  SUCCESS,
} from "../api/constants/apiStatus";
import { useApiStatus } from "../hooks/useApiStatus";
import Spinner from "./LazyLoader";

const useFetchDog = () => {
  const [dog, setDog] = useState<string>();
  // const [fetchDogStatus, setDogStatus] = useState<ApiStatus>(IDLE);

  const {
    status: fetchDogStatus,
    setStatus: setDogStatus,
    isError: isFetchDogStatusError,
    isIdle: isFetchDogStatusIdle,
    isPending: isFetchDogStatusPending,
    isSuccess: isFetchDogStatusSuccess,
  } = useApiStatus(IDLE);

  const initFetchDog = useCallback(async () => {
    // try {
    //   setDogStatus("PENDING");
    //   const response = await fetchDog();
    //   setDog(response.data.message);
    //   setDogStatus("SUCCESS");
    // } catch (error) {
    //   setDogStatus("ERROR");
    // }
    setDogStatus(PENDING);
    const { error, response } = await withAsync(() => fetchDog());

    if (error) {
      setDogStatus(ERROR);
    } else if (response) {
      setDog(response.data.message);
      setDogStatus(SUCCESS);
    }
  }, []);
  return {
    dog,
    fetchDogStatus,
    initFetchDog,
    isFetchDogStatusError,
    isFetchDogStatusIdle,
    isFetchDogStatusPending,
    isFetchDogStatusSuccess,
  };
};
const AnimalExampleWithApiStates = () => {
  const {
    dog,
    // fetchDogStatus,
    initFetchDog,
    isFetchDogStatusError,
    isFetchDogStatusIdle,
    isFetchDogStatusPending,
    isFetchDogStatusSuccess,
  } = useFetchDog();
  useEffect(() => {
    initFetchDog();
  }, [initFetchDog]);
  return (
    <div className="my-8 mx-auto max-w-2xl">
      <div className="flex justify-center gap-8">
        <div className="w-64 h-64">
          {isFetchDogStatusIdle ? <p>Welcome</p> : null}
          <Spinner show={isFetchDogStatusPending} delay={4000} />
          {isFetchDogStatusPending ? <p>Loading data...</p> : null}
          {isFetchDogStatusError ? <p>There was a problem</p> : null}
          {isFetchDogStatusSuccess ? (
            <img className="h-64 w-full object-cover" src={dog} alt="Dog" />
          ) : null}
        </div>
      </div>
      <button
        onClick={initFetchDog}
        className="mt-4 bg-blue-800 text-blue-100 p-4"
      >
        Fetch animals
      </button>
    </div>
  );
};

export default AnimalExampleWithApiStates;
