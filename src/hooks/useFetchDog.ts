import { useState } from "react";
import { fetchDog } from "../api/animalApi";

const useFetchDog = () => {
  const [dog, setDog] = useState<string>();
  const initFetchDog = async () => {
    const response = await fetchDog();
    setDog(response.data.message);
  };
  return {
    dog,
    initFetchDog,
  };
};

export default useFetchDog;
