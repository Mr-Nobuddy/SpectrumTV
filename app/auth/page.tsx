"use client";
import Input from "@/components/Input";
import axios from "axios";
import { register } from "module";
import React, { useCallback, useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState("login");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  const register = useCallback(() => {
    try {
      axios.post("/api/register", {
        email,
        username,
        password,
      });
    } catch (error) {
      console.log(error);
    }
  }, [email,username,password]);

  return (
    <div className="relative h-full w-full bg-[url('/images/netflix.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/icons8-spectrum-tv-100.png" className="h-25" />
        </nav>
        <div className="flex justify-center items-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === "register" ? "Sign In" : "Sign Up"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "login" ? (
                <Input
                  id="username"
                  onChange={(e: any) => setUsername(e.target.value)}
                  value={username}
                  label="username"
                  type="text"
                />
              ) : (
                ""
              )}
              <Input
                id="email"
                onChange={(e: any) => setEmail(e.target.value)}
                value={email}
                label={"Email"}
                type="email"
              />
              <Input
                id="password"
                onChange={(e: any) => setPassword(e.target.value)}
                value={password}
                label={"Password"}
                type="password"
              />
            </div>
            <button className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition" onClick={register}>
              {variant === "login" ? "Sign Up" : "Sign In"}
            </button>
            <div className="flex flex-col items-center justify-center">
              <p className="text-neutral-500 mt-12">
                {variant === "register"
                  ? "First time using spectrumTV ?"
                  : "Already have an account ?"}
              </p>
              <p
                className="text-red-500 ml-1 hover:underline cursor-pointer"
                onClick={toggleVariant}
              >
                {variant === "register"
                  ? "Create an account"
                  : "Sign into your account"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
