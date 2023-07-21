/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Axios from "../utils/Axios";

export type Profession = {
  professionId: number;
  professionName: string;
  professionOrder: number;
  groupName: string;
  groupOrder: number;
  displaySpecialty: boolean;
  specialtyTitle: string;
  displayCondition: boolean;
  conditionTitle: string;
};

export function useProfessions() {
  const [professions, setProfessions] = useState<Profession[]>([]);
  const [professionsErrorMessage, setProfessionsErrorMessage] = useState("");

  const fetchProfessions = async () => {
    if (professions.length > 0 && !professionsErrorMessage) {
      return professions;
    }

    const { data } = await Axios.get<Profession[]>(
      "/api/professions"
    );

    return data;
  };

  useEffect(() => {
    fetchProfessions()
      .then((data) => setProfessions(data))
      .catch((error) => {
        console.log(error.toJSON());
        setProfessionsErrorMessage("Something went wrong.");
      });
  }, []);

  return [professions, professionsErrorMessage] as const
}
