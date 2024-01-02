import { useEffect, useState, useCallback } from "react";
import { fetchDog } from "../api/animalApi";

type ApiStatus = "IDLE" | "PENDING" | "SUCCESS" | "ERROR";

const useFetchDog = () => {
  const [dog, setDog] = useState<string>();
  const [fetchDogStatus, setDogStatus] = useState<ApiStatus>("IDLE");

  const initFetchDog = useCallback(async () => {
    try {
      setDogStatus("PENDING");
      const response = await fetchDog();
      setDog(response.data.message);
      setDogStatus("SUCCESS");
    } catch (error) {
      setDogStatus("ERROR");
    }
  }, []);
  return {
    dog,
    fetchDogStatus,
    initFetchDog,
  };
};
const AnimalExampleWithApiStates = () => {
  const { dog, fetchDogStatus, initFetchDog } = useFetchDog();
  useEffect(() => {
    initFetchDog();
  }, [initFetchDog]);
  return (
    <div className="my-8 mx-auto max-w-2xl">
      <div className="flex justify-center gap-8">
        <div className="w-64 h-64">
          {fetchDogStatus === "IDLE" ? <p>Welcome</p> : null}
          {fetchDogStatus === "PENDING" ? <p>Loading data...</p> : null}
          {fetchDogStatus === "ERROR" ? <p>There was a problem</p> : null}
          {fetchDogStatus === "SUCCESS" ? (
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
