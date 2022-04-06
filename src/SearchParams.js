import { useState, useEffect } from "react";
import useBreedlist from "./useBreedList";
import Results from "./Results";

const ANIMALS = Object.freeze(["bird", "cat", "dog", "rabbit", "reptile"]); // ensure it never gets modified, so we do not have any duplicates.

const SearchParams = () => {
  const [animal, updateAnimal] = useState("");
  const [location, updateLocaion] = useState("");
  const [breed, updateBreed] = useState("");
  const [pets, setPets] = useState([]); // all the pets that we got back from an API.
  const [breeds] = useBreedlist(animal); // grab it from an API.

  useEffect(() => {
    requestPets().catch(console.error);
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  // Function is created inside render, the reason being is that now we have a closure where we can reference variable's inside the component
  async function requestPets() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );

    const json = await res.json(); //data normalization
    setPets(json.pets);
  }

  return (
    <div className="search-params">
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            onChange={(e) => updateLocaion(e.target.value)}
            onBlur={(e) => updateLocaion(e.target.value)}
            value={location}
            type="text"
            placeholder="Location"
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            name="animal"
            id="animal"
            value={animal}
            onChange={(e) => updateAnimal(e.target.value)}
            onBlur={(e) => updateAnimal(e.target.value)}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option value={animal} key={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            disabled={!breeds.length}
            name="breed"
            id="breed"
            value={breed}
            onChange={(e) => updateBreed(e.target.value)}
            onBlur={(e) => updateBreed(e.target.value)}
          >
            <option />
            {breeds.map((breed) => (
              <option value={breed} key={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
