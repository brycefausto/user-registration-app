/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Axios from "../utils/Axios";

export type Specialty = {
  professionId: number;
  specialtyId: number;
  specialtyName: string;
};

export function useSpecialties(professionId: number) {
  const [selectedProfessionId, setSelectedProfessionId] = useState<number | undefined>();
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [specialtiesErrorMessage, setSpecialtiesErrorMessage] = useState("");

  const fetchSpecialties = async () => {
    if (specialties.length > 0 && !specialtiesErrorMessage && selectedProfessionId == professionId) {
      return specialties;
    }

    if (!professionId) {
      return [];
    }

    const { data } = await Axios.get<Specialty[]>(
      "/api/specialties?professionId=" + professionId
    );

    return data;
  };

  useEffect(() => {
    fetchSpecialties()
      .then((data) => {
        setSelectedProfessionId(professionId)
        setSpecialties(data)
      })
      .catch((error) => {
        console.log(error.toJSON());
        setSpecialtiesErrorMessage("Something went wrong.");
      });
  }, [professionId]);

  return [specialties, specialtiesErrorMessage] as const
}
