import { useForm } from "react-hook-form";
import { optionalFields } from "../../formconfig.json";
import { useCountries } from "../hooks/countries";
import { useProfessions } from "../hooks/professions";
import { useSpecialties } from "../hooks/specialties";
import { useState } from "react";
import Modal from "./Modal";

type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  country?: string;
  profession?: string;
  specialty?: string;
};

export default function UserRegistration(): JSX.Element {
  const {
    register,
    watch,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit = (data: Inputs) => {
    console.log(data)
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setShowModal(true)
      setJsonData(JSON.stringify(data));
    }, 3000);
  };
  const [countries, countriesErrorMessage] = useCountries();
  const [professions, professionsErrorMessage] = useProfessions();
  const [specialties, specialtiesErrorMessage] = useSpecialties(
    parseInt(getValues("profession") || "")
  );
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [jsonData, setJsonData] = useState("");

  const handleClose = () => {
    setJsonData("");
  }

  watch("profession");

  return (
    <div className="mt-10">
      {loading && <div className="loader"></div>}
      {<Modal open={showModal} setOpenModal={setShowModal} onClose={handleClose} data={jsonData} />}
      <div className="g-6 flex h-full flex-wrap justify-center lg:justify-between">
        <form
          className="w-full max-w-lg mx-auto text-left"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                First Name
              </label>
              <input
                className={
                  "appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" +
                  (errors.firstName ? "border-red-500" : "")
                }
                id="grid-first-name"
                type="text"
                {...register("firstName", {
                  required: "First Name is required.",
                  maxLength: {
                    value: 25,
                    message: "Maximum of 25 characters only.",
                  },
                })}
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs italic">
                  {errors.firstName?.message}
                </p>
              )}
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-last-name"
              >
                Last Name
              </label>
              <input
                className={
                  "appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" +
                  (errors.lastName ? "border-red-500" : "")
                }
                id="grid-last-name"
                type="text"
                {...register("lastName", {
                  required: "Last Name is required.",
                  maxLength: {
                    value: 25,
                    message: "Maximum of 25 characters only.",
                  },
                })}
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs italic">
                  {errors.lastName?.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-email"
              >
                Email
              </label>
              <input
                className={
                  "appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" +
                  (errors.email ? "border-red-500" : "")
                }
                id="grid-email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                    message: "Please input a valid Email",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-xs italic">
                  {errors.email?.message}
                </p>
              )}
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Password
              </label>
              <input
                className={
                  "appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" +
                  (errors.password ? "border-red-500" : "")
                }
                id="grid-password"
                type="password"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g,
                    message: "Please input a valid Password",
                  },
                })}
              />
              <p className="text-gray-600 text-xs italic">
                Minimum eight characters, at least one letter and one number
              </p>
              {errors.password && (
                <p className="text-red-500 text-xs italic">
                  {errors.password?.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            {optionalFields.country && (
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-country"
                >
                  Country
                </label>
                <div className="relative">
                  <select
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-country"
                    {...register("country")}
                  >
                    <option value=""></option>
                    {countries.map((it, i) => (
                      <option key={i} value={it.isoCode}>
                        {it.isoCountry}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
                {countriesErrorMessage && (
                  <p className="text-red-500 text-xs italic">
                    {countriesErrorMessage}
                  </p>
                )}
              </div>
            )}
            {optionalFields.profession && (
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-profession"
                >
                  Profession
                </label>
                <div className="relative">
                  <select
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-profession"
                    {...register("profession")}
                  >
                    <option value=""></option>
                    {professions.map((it, i) => (
                      <option key={i} value={it.professionId}>
                        {it.professionName}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
                {professionsErrorMessage && (
                  <p className="text-red-500 text-xs italic">
                    {professionsErrorMessage}
                  </p>
                )}
              </div>
            )}
            {optionalFields.specialty && (
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-specialty"
                >
                  Specialty
                </label>
                <div className="relative">
                  <select
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-specialty"
                    {...register("specialty")}
                  >
                    <option value=""></option>
                    {specialties.map((it, i) => (
                      <option key={i} value={it.specialtyId}>
                        {it.specialtyName}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
                {specialtiesErrorMessage && (
                  <p className="text-red-500 text-xs italic">
                    {specialtiesErrorMessage}
                  </p>
                )}
              </div>
            )}
          </div>
          <div className="flex flex-wrap -mx-3 mt-5 mb-2">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <button
                className="btn-primary w-full text-center text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
