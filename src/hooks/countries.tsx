/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Axios from "../utils/Axios";

export type Country = {
  isoCode: string;
  isoCountry: string;
};

export function useCountries() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [countriesErrorMessage, setCountriesErrorMessage] = useState("");

  const fetchCountries = async () => {
    if (countries.length > 0 && !countriesErrorMessage) {
      return countries;
    }

    const { data } = await Axios.get<Country[]>(
      "/api/countries"
    );

    return data;
  };

  useEffect(() => {
    fetchCountries()
      .then((data) => setCountries(data))
      .catch((error) => {
        console.log(error.toJSON());
        setCountriesErrorMessage("Something went wrong.");
      });
  }, []);

  return [countries, countriesErrorMessage] as const
}
