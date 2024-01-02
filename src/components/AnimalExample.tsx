import { useEffect, useState } from "react";
import { fetchCat, fetchDog } from "../api/animalApi";

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
const useFetchCat = () => {
  const [cat, setCat] = useState<string>();
  const initFetchCat = async () => {
    const response = await fetchCat();
    setCat(response.data?.[0].url);
  };
  return {
    cat,
    initFetchCat,
  };
};

const useFetchAnimal = () => {
  const { dog, initFetchDog } = useFetchDog();
  const { cat, initFetchCat } = useFetchCat();

  const fetchAnimals = () => {
    initFetchCat();
    initFetchDog();
  };
  useEffect(() => {
    fetchAnimals();
  }, []);

  return {
    dog,
    cat,
    fetchAnimals,
  };
};
const AnimalExample = () => {
  const { cat, dog, fetchAnimals } = useFetchAnimal();
  return (
    <div className="my-8 mx-auto max-w-2xl">
      <div className="flex gap-8">
        <div className="w-1/2">
          {cat ? (
            <img className="h-64 w-full object-cover" src={cat} alt="Cat" />
          ) : null}
        </div>
        <div className="w-1/2">
          {dog ? (
            <img className="h-64 w-full object-cover" src={dog} alt="Dog" />
          ) : null}
        </div>
      </div>
      <button
        onClick={fetchAnimals}
        className="mt-4 bg-blue-800 text-blue-100 p-4"
      >
        Fetch animals
      </button>
    </div>
  );
};

export default AnimalExample;
