import { useState, useEffect } from "react";

const localCache = {}; // to prevent re-requesting already requested data.

export default function useBreedlist(animal) {
  const [breedList, setBreedList] = useState([]);
  const [status, setStatus] = useState("unloaded"); // String representing what the state of hook is.

  useEffect(() => {
    if (!animal) {
      setBreedList([]);
    } else if (localCache[animal]) {
      setBreedList(localCache[animal]);
    } else {
      requestBreedList();
    }
  }, [animal]);

  async function requestBreedList() {
    setBreedList([]); // it requests when only animal is selected.
    setStatus("loading");

    const res = await fetch(
      `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
    );
    const json = await res.json(); // data normalization
    localCache[animal] = json.breeds || []; // if for any reason API is down || [];

    setBreedList(localCache[animal]);
    setStatus("loaded");
  }

  return [breedList, status];
}
