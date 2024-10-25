"use client"
//#222831
//#393E46
//#00ADB5
//#EEEEEE

import axios from "axios";
import React, { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pswd, setPswd] = useState("");
  const [age, setAge] = useState();
  var student = false;
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useRouter();

  const enterUsername = (e) => {
    setUsername(e.target.value);
  };

  const enterEmail = (e) => {
    setEmail(e.target.value);
  };

  const enterPswd = (e) => {
    setPswd(e.target.value);
  };

  const enterAge = (e) => {
    setAge(e.target.value);
  };

  const authenticate = (e) => {
    //check which radio is selected to update the boolean value
    if (document.getElementById("studentRole").checked === true) {
      student = true;
    }

    postreq();

    e.preventDefault();
    setUsername("");
    setEmail("");
    setPswd("");
    setAge("");

    document.getElementById("studentRole").checked = false;
    document.getElementById("tutorRole").checked = false;
  };

  const postreq = async () => {
    try {
      const res = await axios.post(
        "../api/signup",
        {
          username: username,
          email: email,
          pswd: pswd,
          student: student,
          age: age,
        }
      );

      // Clear error message on successful signup
      setErrorMessage("");
      navigate.push("/login");
      // Optionally reset the form
      setUsername("");
      setEmail("");
      setPswd("");
      setAge("");
    } catch (error) {
      if (error.response.status === 409) {
        // If email already exists, show a specific error message
        setErrorMessage("Email already exists. Please use a different one.");
        setOpen(true);
      } else {
        // Handle other types of errors
        setErrorMessage("An error occurred. Please try again.");
        setOpen(true);
      }
    }
  };

  return (
    <>
      {/* Outer wrapper to ensure proper layering */}
      <div className="relative w-full h-screen">
        {/* Blurred background */}
        <div className="absolute top-0 left-0 w-full h-full bg-svg blur-sm"></div>

        {/* Content container */}
        <div className="relative z-10 flex justify-center items-center h-full">
          <div className="mx-40 pt-8 pb-2 px-2 h-max flex-1 flex-col justify-center lg:px-8 rounded-xl sm:shadow-[0_25px_60px_15px_rgba(0,0,0,0.2)]">
            <div className="sm:mx-auto w-full">
              <h2 className="text-center md:text-[29px] sm:text-[20px] text-sm font-bold leading-6 tracking-tight text-black">
                SIGN UP YOUR ACCOUNT
              </h2>
            </div>

            <div className="md:mt-7 mt-3 sm:mx-auto sm:w-full sm:max-w-sm">
              <form onSubmit={authenticate} method="POST" className="space-y-4">
                <div>
                  <label
                    htmlFor="text"
                    className="block sm:text-lg text-xs font-medium leading-6 text-black"
                  >
                    Username
                  </label>
                  <div className="mt-2">
                    <input
                      id="username"
                      name="username"
                      type="text"
                      required
                      autoComplete="username"
                      value={username}
                      onChange={enterUsername}
                      className="block w-full font-semibold rounded-md border-0 p-1.5 text-[#393E46] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block sm:text-lg text-xs font-medium leading-4 text-black"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={enterEmail}
                      className="block w-full font-semibold rounded-md border-0 p-1.5 text-[#393E46] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="sm:text-lg text-xs font-medium leading-4 text-black"
                    >
                      Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      autoComplete="current-password"
                      value={pswd}
                      onChange={enterPswd}
                      className="block w-full rounded-md border-0 p-1.5 text-[#393E46] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="age"
                      className="sm:text-lg text-xs font-medium leading-4 text-black"
                    >
                      Age
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="age"
                      name="age"
                      type="number"
                      required
                      autoComplete="current-age"
                      value={age}
                      onChange={enterAge}
                      className="block w-fit rounded-md border-0 p-1.5 text-[#393E46] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="age"
                      className="sm:text-lg text-xs font-medium leading-4 text-black"
                    >
                      Choose your Role:
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="studentRole"
                      name="role"
                      type="radio"
                      required
                      className="text-[#00ADB5] checked:bg-[#00ADB5] checked:border-transparent focus:outline-none focus:ring-2 focus:ring-[#00ADB5] focus:ring-offset-2"
                    />
                    <label
                      className="inline-block pl-[0.15rem] mr-10 font-semibold text-xs sm:text-lg"
                      htmlFor="checkboxDefault"
                    >
                      Student
                    </label>
                    <input
                      id="tutorRole"
                      name="role"
                      type="radio"
                      required
                      className="text-[#00ADB5] checked:bg-[#00ADB5] checked:border-transparent focus:outline-none focus:ring-2 focus:ring-[#00ADB5] focus:ring-offset-2"
                    />
                    <label
                      className="inline-block pl-[0.15rem] font-semibold text-xs sm:text-lg"
                      htmlFor="checkboxDefault"
                    >
                      Tutor
                    </label>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex mt-5 w-full border-2 border-[#00ADB5] justify-center rounded-md bg-[#00ADB5] px-3 py-1.5 sm:text-lg text-xs font-semibold leading-6 text-white hover:bg-white hover:text-[#00ADB5] hover:border-2 hover:border-[#00ADB5]  active:scale-110 transition duration-400"
                  >
                    SIGN UP
                  </button>
                </div>
              </form>

              <p className="mt-5 text-center sm:text-sm text-xs text-xs text-[#393E46]">
                Already a member?{" "}
                <a
                  href="/login"
                  className="font-semibold leading-4 text-[#00ADB5]"
                >
                  Login here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-[#393E46] bg-opacity-85 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationTriangleIcon
                      aria-hidden="true"
                      className="h-6 w-6 text-red-600"
                    />
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold leading-6 text-[#222831]"
                    >
                      Account already exists
                    </DialogTitle>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Another account already exists with the same Email ID.
                        Kindly Login to your account or reset your password.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                >
                  Close
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default SignUp;
