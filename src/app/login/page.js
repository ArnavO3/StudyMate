"use client";
import React, { useState, useEffect } from "react";
import "../globals.css";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

function LogIn() {
  const [email, setEmail] = useState("");
  const [pswd, setPswd] = useState("");
  const [open, setOpen] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const navigate = useRouter();

  const enterEmail = (e) => {
    setEmail(e.target.value);
  };

  const enterPswd = (e) => {
    setPswd(e.target.value);
  };

  const authenticate = (e) => {
    e.preventDefault();
    postreq();
    setEmail("");
    setPswd("");
  };

  const postreq = async () => {
    fetch("../api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, pswd }),
    })
      .then((response) => response.json())
      .then(async (data) => {
        if (data.message === "Login successful") {
          // Store the token in localStorage
          localStorage.setItem("token", data.token);

          // Dynamically import jwt-decode
          const jwt_decode = jwtDecode(data.token);

          // Decode the JWT token to get the user info
          const username = jwt_decode.username;

          // Store the username if available
          if (username) {
            localStorage.setItem("username", username);
          }

          // Redirect to the /dashboard page after successful login
          setSuccessful(true);
        } else {
          setOpen(true);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  // Redirect to dashboard if login is successful
  useEffect(() => {
    if (successful) {
      navigate.push("/dashboard");
    }
  }, [successful, navigate]);

  return (
    <>
      <div className="relative w-full h-screen">
        <div className="absolute top-0 left-0 w-full h-full bg-[#f1faee]"></div>

        <div className="relative z-10 flex justify-center items-center h-full">
          <div className="sm:mx-40 sm:my-20 p-10 sm:p-5 h-[75vh] flex-1 flex-col justify-center lg:px-8 rounded-xl sm:shadow-[0_25px_60px_15px_rgba(0,0,0,0.2)]">
            <div className="mx-auto w-full max-w-sm">
              <h2 className="mt-10 text-[#1d3557] text-center md:text-2xl sm:text-[14px] text-[10px] font-bold leading-9 tracking-tight">
                LOGIN TO YOUR ACCOUNT
              </h2>
            </div>

            <div className="md:mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form onSubmit={authenticate} method="POST" className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block md:text-lg sm:text-[13px] text-[9px] font-medium leading-6 text-[#1d3557]"
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
                      className="block w-full text-[#1d3557] font-semibold rounded-md border-0 p-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="pswd"
                      className="text-[#1d3557] md:text-lg sm:text-[13px] text-[9px] font-medium leading-6"
                    >
                      Password
                    </label>
                    <div className="md:text-sm sm:text-[10px] text-[0px]">
                      <a
                        href="/forgotPassword"
                        className="font-semibold text-[#457b9dc4] hover:text-[#457b9d]"
                      >
                        Forgot password?
                      </a>
                    </div>
                  </div>
                  <div className="sm:mt-2">
                    <input
                      id="pswd"
                      name="pswd"
                      type="password"
                      required
                      autoComplete="current-password"
                      value={pswd}
                      onChange={enterPswd}
                      className="block text-[#1d3557] w-full rounded-md border-0 p-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex mt-8 w-full border-2 border-[#1d3557] justify-center rounded-md bg-[#1d3557] text-[#f1faee] sm:px-3 sm:py-1.5 md:text-lg sm:text-[13px] text-[10px] font-semibold leading-6 hover:text-[#1d3557] hover:bg-[#a8dadc] hover:border-[#a8dadc]  active:scale-110 transition duration-400"
                  >
                    LOGIN
                  </button>
                </div>
              </form>

              <p className="sm:mt-5 md:mt-10 text-center lg:text-sm sm:text-[11px] text-[8px] text-gray-500">
                Not a member?{" "}
                <a
                  href="/signup"
                  className="font-semibold sm:leading-6 text-[#457b9dc4] hover:text-[#457b9d]"
                >
                  Start a 14 day free trial
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Error */}
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-[#1d3557] bg-opacity-85 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
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
                      Invalid Email ID or Password! Please try again.
                    </DialogTitle>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Wrong credentials entered. Kindly Signup if you are a
                        new user or reset your password if you have an existing
                        account.
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

export default LogIn;
